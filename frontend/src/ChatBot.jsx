import { useState } from 'react';
import { Send, Bot, User} from 'lucide-react';

function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
        const botMessage = {
            id: messages.length + 2,
            text: "Thanks for your message! I'm a bot.",
            sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        
      {/* Header */}
      <div className="bg-white p-4 shadow">
        <h1 className="text-xl font-bold">AI Chat Bot</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 mb-4 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-gray-700" />
              )}
            </div>
            <div className={`px-4 py-2 rounded-lg max-w-xs ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800'
            }`}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-700" />
            </div>
            <div className="bg-white px-4 py-2 rounded-lg">
              <p className="text-gray-500">...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;