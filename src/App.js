import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState(''); // New state for input field value
  const [currentPage, setCurrentPage] = useState('home'); // New state for current page

  // Effect to update currentPage based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove #
      setCurrentPage(hash || 'home'); // Default to 'home' if hash is empty
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Call once on mount to set initial page

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const cardData = [
    {
      id: 1,
      title: 'FBL Canada (Canada FBLA)',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Beta. This was a mobile app development project focusing on user experience.',
    },
    {
      id: 2,
      title: 'JAMHacks 9',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Alpha. This project involved developing a new web application using React and Node.js.',
    },
    {
      id: 3,
      title: 'GeeseHacks',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Gamma. An AI/ML project exploring new algorithms for data analysis.',
    },
    {
      id: 4,
      title: 'IOGarden',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Gamma. An AI/ML project exploring new algorithms for data analysis.',
    },
    {
      id: 5,
      title: 'Black-Scholes Options Pricing',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Gamma. An AI/ML project exploring new algorithms for data analysis.',
    },
    {
      id: 6,
      title: 'Economic Inequality @ UWO',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'Details about Project Gamma. An AI/ML project exploring new algorithms for data analysis.',
    },
  ];

  const filteredCards = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const aMatches = a.title.toLowerCase().startsWith(searchTerm.toLowerCase());
    const bMatches = b.title.toLowerCase().startsWith(searchTerm.toLowerCase());

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const openPopup = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home"> [ Home ] </a>
        <a href="#about"> [ About ] </a>
        <a href="#contact"> [ Contact ] </a>
        <a href="#blog"> [ Blog ] </a>
      </nav>
      <h1 className="name">
        [Sheng Chang Li]
      </h1>
      <h3 className="subtitle">
        CS + Ivey + Scholar's Electives @ Western University
      </h3>

      <div className={`card-container ${filteredCards.length === 1 ? 'single-card-align-left' : ''}`}>
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{ backgroundImage: `url(${card.imageUrl})` }}
            onClick={() => openPopup(card)}
          >
            <h2 className="card-title">{card.title}</h2>
          </div>
        ))}
      </div>

      {showPopup && selectedCard && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.title}</h2>
            <p>{selectedCard.content}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <div className="bottom-search-bar-container">
        <span className="mode-indicator">NORMAL:{currentPage}</span>
        <input
          type="text"
          className="bottom-search-bar"
          value={inputValue} // Use inputValue state
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value); // Update input field value

            if (value.startsWith(':')) {
              // Handle commands
              const command = value.substring(1).toLowerCase();
              switch (command) {
                case 'home':
                case 'about':
                case 'contact':
                case 'blog':
                  window.location.hash = command;
                  setInputValue(''); // Clear input after command
                  setSearchTerm(''); // Clear any active search
                  break;
                default:
                  // Invalid command, do nothing or provide feedback
                  break;
              }
            } else if (value.startsWith('/')) {
              // Handle search
              setSearchTerm(value.substring(1)); // Set search term if starts with /
            } else {
              setSearchTerm(''); // Clear search term otherwise
            }
          }}
          autoFocus // Add autoFocus here
        />
      </div>
    </div>
  );
}

export default App;
