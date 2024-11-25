'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, MessagesSquare } from 'lucide-react';

const ChatWidget = () => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! How can I help you today?' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // Add user message to chat
        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, {
                type: 'bot',
                text: data.text,
                confidence: data.confidence,
                source: data.source
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: 'Sorry, I encountered an error. Please try again later.',
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputText);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 h-96">
                    <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
                        <h3 className="font-semibold">Knowledge Assistant</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-blue-700 rounded"
                            aria-label="Minimize chat"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : message.error
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {message.text}

                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={`p-2 bg-blue-600 text-white rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                    }`}
                                disabled={isLoading}
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
                    aria-label="Open chat"
                >
                    <MessagesSquare className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ChatWidget;