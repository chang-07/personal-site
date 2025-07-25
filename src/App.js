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

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() && highlight !== '' ? (
                    <span key={i} style={{ color: '#0099ff' }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
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

      {currentPage === 'home' && (
        <>
          <div className="contact-icons">
            <a href="https://discordapp.com/users/486289706212917260" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://www.linkedin.com/in/sheng-chang-li-51482a287/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/chang-07" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:schangchang.li@gmail.com">Email</a>
          </div>

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
        </>
      )}

      {currentPage === 'about' && <div className="page-content"></div>}
      {currentPage === 'contact' && <div className="page-content"></div>}
      {currentPage === 'blog' && <div className="page-content"></div>}

      <div className="bottom-search-bar-container">
        <span className="mode-indicator">NORMAL:{currentPage}</span>
        <input
          type="text"
          id="commandInput"
          className="bottom-search-bar"
          value={inputValue} // Use inputValue state
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value); // Update input field value
            const dropdown = document.getElementById('optionsDropdown');

            if (value.includes(':')) {
              dropdown.classList.add('show');
            } else {
              dropdown.classList.remove('show');
            }

            if (value.startsWith(':')) {
              // Handle commands
              const command = value.substring(1).toLowerCase();
              const options = ['home', 'about', 'contact', 'blog', 'status'];
              if (options.includes(command)) {
                  if (command !== 'status') {
                    window.location.hash = command;
                  }
                  setInputValue(''); // Clear input after command
                  setSearchTerm(''); // Clear any active search
                  dropdown.classList.remove('show');
              }
            } else if (value.startsWith('/')) {
              // Handle search
              setSearchTerm(value.substring(1)); // Set search term if starts with /
            } else {
              setSearchTerm(''); // Clear search term otherwise
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
                const value = inputValue.substring(1).toLowerCase();
                const options = ['home', 'about', 'contact', 'blog', 'status'];
                const match = options.find(o => o.includes(value));
                if (match) {
                    if (match !== 'status') {
                        window.location.hash = match;
                    }
                    setInputValue('');
                    setSearchTerm('');
                    const dropdown = document.getElementById('optionsDropdown');
                    dropdown.classList.remove('show');
                }
            }
          }}
          autoFocus // Add autoFocus here
        />
        <span className="command-hint">/ for search, : for commands</span>
        <div id="optionsDropdown" className="dropdown-content">
        {['Home', 'About', 'Contact', 'Blog', 'Status']
            .filter(option => option.toLowerCase().includes(inputValue.substring(1).toLowerCase()))
            .map((option) => (
                <a href={`#${option.toLowerCase()}`} key={option} onClick={(e) => {
                    e.preventDefault();
                    if (option.toLowerCase() !== 'status') {
                        window.location.hash = option.toLowerCase();
                    }
                    setInputValue('');
                    setSearchTerm('');
                    const dropdown = document.getElementById('optionsDropdown');
                    dropdown.classList.remove('show');
                }}>
                    {getHighlightedText(option, inputValue.substring(1))}
                </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
