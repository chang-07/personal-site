import React, { useState } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      </nav>
      <h1 className="name">
        [Sheng Chang Li]
      </h1>
      <h3 className="subtitle">
        CS + Ivey + Scholar's Electives @ Western University
      </h3>

      <input
        type="text"
        placeholder="Search Experiences"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
    </div>
  );
}

export default App;
