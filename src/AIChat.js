import React, { useState, useRef, useEffect } from 'react';
import { useStore, FURNITURE_DATA } from './store';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Interior Assistant. I can help you find furniture, suggest matching sets, and even adjust the room lighting. How can I assist you today?' }
  ]);
  const messagesEndRef = useRef(null);
  const { room, selected, setSelected, setRoom, addToCart } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg = message.trim();
    const newHistory = [...chatHistory, { role: 'user', content: userMsg }];
    setChatHistory(newHistory);
    setMessage('');

    // AI Logic Simulation
    setTimeout(() => {
      let aiResponse = "";
      const lowerMsg = userMsg.toLowerCase();

      // 1. Contextual Awareness & Product Expertise
      if (lowerMsg.includes('this item') || lowerMsg.includes('selected item') || lowerMsg.includes('what is this')) {
        if (selected && FURNITURE_DATA[selected]) {
          const item = FURNITURE_DATA[selected];
          aiResponse = `This is the ${item.name}. It's a ${item.description} measuring ${item.dimensions}. It costs $${item.price}. We currently have ${item.stock} in stock.`;
        } else {
          aiResponse = "You haven't selected an item yet. Try clicking on any furniture in the room!";
        }
      }
      // 2. Guided Navigation (e.g., "Show me the sofa")
      else if (lowerMsg.includes('show me') || lowerMsg.includes('find') || lowerMsg.includes('look at')) {
        const foundItem = Object.values(FURNITURE_DATA).find(item => lowerMsg.includes(item.name.toLowerCase()) || lowerMsg.includes(item.id.toLowerCase()));
        if (foundItem) {
          setSelected(foundItem.id);
          aiResponse = `Sure! I've highlighted the ${foundItem.name} for you. It's a popular choice for the ${room}.`;
        } else {
          aiResponse = "I couldn't find that specific item. Would you like me to show you our best-sellers?";
        }
      }
      // 3. Smart Staging & Bundles
      else if (lowerMsg.includes('bundle') || lowerMsg.includes('match') || lowerMsg.includes('set')) {
        if (selected === 'VOXLÖV') {
          aiResponse = "The VOXLÖV table pairs beautifully with the FANBYN chairs and the BRÖNDEN rug. Would you like me to add the matching set to your cart?";
        } else if (room === 'living-room') {
          aiResponse = "For the living room, I recommend matching the Premium White Sofa with the Modern Coffee Table and the SKAFTET lamp for a cohesive look.";
        } else {
          aiResponse = "I can suggest matching pieces based on what you have selected. Try selecting a primary piece like a table or sofa!";
        }
      }
      // 4. Semantic Search (e.g., "Find me a cozy chair for under $300")
      else if (lowerMsg.includes('under') && (lowerMsg.includes('$') || lowerMsg.match(/\d+/))) {
        const priceLimit = parseInt(lowerMsg.match(/\d+/)[0]);
        const affordableItems = Object.values(FURNITURE_DATA).filter(item => item.price <= priceLimit);

        if (affordableItems.length > 0) {
          const bestMatch = affordableItems[0];
          setSelected(bestMatch.id);
          aiResponse = `I found ${affordableItems.length} items under $${priceLimit}. I've highlighted the ${bestMatch.name} ($${bestMatch.price}) as a great starting point.`;
        } else {
          aiResponse = `I'm sorry, I couldn't find anything under $${priceLimit}. Our most affordable item is the ${Object.values(FURNITURE_DATA).sort((a,b) => a.price - b.price)[0].name}.`;
        }
      }
      // 5. Lighting Control (Mockup)
      else if (lowerMsg.includes('light') || lowerMsg.includes('bright') || lowerMsg.includes('dark') || lowerMsg.includes('mood')) {
        aiResponse = "I've adjusted the lighting to match your request. How does the atmosphere look now?";
        // This will be handled by Scene.js observing a state change if we added one,
        // for now we'll just simulate the confirmation.
      }
      // Default
      else {
        aiResponse = "I'm here to help you design your dream home. You can ask me about product details, ask for recommendations, or even tell me to 'Show me the dining table'.";
      }

      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 800);
  };

  return (
    <>
      <div className={`ai-chat-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="ai-icon-pulse"></div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 2a10 10 0 0 1 10 10h-10V2z" opacity="0.3"></path>
          <path d="M12 12l8.5 8.5"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>

      <div className={`ai-chat-window glass-panel ${isOpen ? 'active' : ''}`}>
        <div className="ai-chat-header">
          <div className="ai-header-info">
            <div className="ai-status-indicator">
              <span className="ai-status-dot"></span>
              <span className="ai-status-text">Online</span>
            </div>
            <h3>Interior AI Assistant</h3>
          </div>
          <button className="close-chat" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="ai-chat-messages">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`ai-message-wrapper ${msg.role}`}>
              <div className="ai-message">
                {msg.content}
                {msg.role === 'assistant' && i === chatHistory.length - 1 && (
                  <div className="ai-suggested-actions">
                    <button onClick={() => setMessage("What are the dimensions?")}>Dimensions?</button>
                    <button onClick={() => setMessage("Show me matching items")}>Matching items?</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-input-area">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Ask about products, style or lighting..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="ai-send-btn" onClick={handleSend} disabled={!message.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
