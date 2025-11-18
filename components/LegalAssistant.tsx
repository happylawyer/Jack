import React, { useState, useRef, useEffect } from 'react';
import { createChatSession, sendMessageToGemini, ai } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, LiveServerMessage, Modality, Blob } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

const LegalAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat State
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Live API State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const liveSessionRef = useRef<any>(null); // Using any to bypass strict type checking for the session object if needed
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Reset welcome message when language changes or on first load
  useEffect(() => {
    const welcomeText = t(
      "Hello! I'm Veritas, the firm's virtual assistant powered by Gemini 3.0. How can I help you with your legal inquiries today?",
      "您好！我是由 Gemini 3.0 驱动的律所虚拟助手 Veritas。今天有什么法律问题可以帮您？"
    );
    
    // Only set if empty (first load) or reset if the only message is the welcome message
    setMessages(prev => {
       if (prev.length === 0) {
         return [{ role: 'model', text: welcomeText, timestamp: new Date() }];
       }
       if (prev.length === 1 && prev[0].role === 'model') {
          return [{ ...prev[0], text: welcomeText }];
       }
       return prev;
    });
  }, [language, t]);

  // Initialize text chat session
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLiveMode]);

  // Cleanup Live Session on unmount
  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        const responseText = await sendMessageToGemini(chatSessionRef.current, userMsg.text);
        const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
        setMessages(prev => [...prev, modelMsg]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { 
        role: 'model', 
        text: t("I'm having trouble connecting right now. Please try again later.", "我现在连接有问题，请稍后再试。"), 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Live API Helpers ---

  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    // Simple encoding to binary string for btoa
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return {
      data: base64,
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  const startLiveSession = async () => {
    try {
      setIsLiveMode(true);
      setIsLoading(true);

      // 1. Setup Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      // 2. Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      // 3. Connect to Gemini Live
      // Note: We use the flash-native-audio model for low-latency voice, but we inject the strict instructions.
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Live Session Opened');
            setIsLiveConnected(true);
            setIsLoading(false);

            // Stream Audio Input
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime,
              );
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputCtx,
                24000,
                1,
              );
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
               for (const source of sourcesRef.current.values()) {
                 source.stop();
                 sourcesRef.current.delete(source);
               }
               nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log('Live Session Closed');
            setIsLiveConnected(false);
          },
          onerror: (e) => {
            console.error('Live Session Error', e);
            setIsLiveConnected(false);
            setIsLiveMode(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `
            You are Veritas, a strict legal AI assistant. 
            Language: ${language === 'zh' ? 'Chinese' : 'English'}. 
            Rules:
            1. ONLY answer questions about legal matters, law, or the firm.
            2. REFUSE general questions (weather, sports, chat) by saying you are a legal assistant only.
            3. DO NOT provide specific legal advice, only general information.
            4. Be professional and concise.
          `,
        },
      });

      liveSessionRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start live session:", error);
      setIsLiveMode(false);
      setIsLoading(false);
    }
  };

  const stopLiveSession = () => {
    // Close Audio Contexts
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    
    // Stop Stream
    audioStream?.getTracks().forEach(track => track.stop());
    setAudioStream(null);

    // Close Session
    setIsLiveConnected(false);
    setIsLiveMode(false);
    nextStartTimeRef.current = 0;
    sourcesRef.current.clear();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat/Live Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-lg shadow-2xl flex flex-col mb-4 border border-gray-200 overflow-hidden animate-fade-in-up transition-all duration-300">
          {/* Header */}
          <div className={`${isLiveMode ? 'bg-gold-600' : 'bg-navy-900'} text-white p-4 flex justify-between items-center transition-colors duration-300`}>
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-red-500 animate-pulse' : 'bg-green-400'}`}></div>
              <div>
                <h3 className="font-bold text-sm">
                  {isLiveMode ? t('Live Consultation', '实时语音咨询') : t('Veritas Assistant', 'Veritas 助手')}
                </h3>
                <p className="text-xs text-white/80">
                  {isLiveMode ? t('Voice Connected', '语音已连接') : t('AI Intake Support', 'AI 咨询支持')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
               {/* Mode Toggle */}
               {!isLiveMode ? (
                 <button 
                    onClick={startLiveSession}
                    title={t("Start Voice Call", "开始语音通话")}
                    className="text-white hover:text-gold-400 transition-colors p-1"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                 </button>
               ) : (
                 <button 
                    onClick={stopLiveSession}
                    title={t("End Voice Call", "结束通话")}
                    className="text-white hover:text-red-200 transition-colors p-1"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
               )}
               <button onClick={() => { setIsOpen(false); if(isLiveMode) stopLiveSession(); }} className="text-white/70 hover:text-white ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto bg-gray-50 relative">
            {isLiveMode ? (
               // Live Mode UI
               <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-8">
                  <div className="relative">
                     {/* Pulse Effect */}
                     <div className={`absolute inset-0 bg-gold-500 rounded-full opacity-20 ${isLiveConnected ? 'animate-ping' : ''}`}></div>
                     <div className="relative w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gold-500">
                        <svg className={`w-10 h-10 text-gold-600 ${isLiveConnected ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                     </div>
                  </div>
                  
                  <div>
                     {isLoading ? (
                        <p className="text-gray-500 font-medium animate-pulse">{t('Connecting...', '连接中...')}</p>
                     ) : (
                        <>
                           <h4 className="text-xl font-serif font-bold text-navy-900 mb-2">{t('Veritas is listening', 'Veritas 正在聆听')}</h4>
                           <p className="text-gray-500 text-sm">{t('Speak naturally to ask about our services.', '请自然地询问我们的服务。')}</p>
                        </>
                     )}
                  </div>

                  <button 
                     onClick={stopLiveSession}
                     className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-bold hover:bg-gray-300 transition-colors"
                  >
                     {t('Switch to Text Chat', '切换回文字聊天')}
                  </button>
               </div>
            ) : (
               // Text Chat UI
               <div className="p-4 space-y-4 min-h-full">
                  {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div 
                        className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                           ? 'bg-navy-800 text-white rounded-tr-none' 
                           : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                        }`}
                     >
                        {msg.text}
                     </div>
                  </div>
                  ))}
                  {isLoading && (
                  <div className="flex justify-start">
                     <div className="bg-gray-200 text-gray-500 p-3 rounded-lg rounded-tl-none text-xs flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                     </div>
                  </div>
                  )}
                  <div ref={messagesEndRef} />
               </div>
            )}
          </div>

          {/* Input Area (Only for Text Mode) */}
          {!isLiveMode && (
            <div className="p-4 bg-white border-t border-gray-100">
               <div className="bg-yellow-50 text-yellow-800 text-xs p-2 mb-2 rounded border border-yellow-100">
                 {t('Disclaimer: AI Assistant (Gemini 3.0). Not legal advice.', '免责声明：AI 助手 (Gemini 3.0)。非法律建议。')}
               </div>
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('Type your message...', '输入您的消息...')}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-navy-900 text-sm"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-navy-900 text-white p-2 rounded-md hover:bg-navy-800 disabled:opacity-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy-900 hover:bg-navy-800 text-white rounded-full p-4 shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center border-2 border-gold-500"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default LegalAssistant;