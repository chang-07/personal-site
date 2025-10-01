import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState(''); // New state for input field value
  const [currentPage, setCurrentPage] = useState('home'); // New state for current page
  const [discordStatus, setDiscordStatus] = useState(null); // New state for Discord status
  const [githubActivity, setGithubActivity] = useState([]); // New state for GitHub activity

  

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

  // Effect to fetch Discord status when on dashboard page
  useEffect(() => {
    if (currentPage === 'dashboard') {
      const fetchDiscordStatus = async () => {
        try {
          const response = await fetch('https://api.lanyard.rest/v1/users/486289706212917260');
          const data = await response.json();
          if (data.success) {
            setDiscordStatus(data.data);
          } else {
            console.error('Failed to fetch Discord status:', data.error);
            setDiscordStatus(null);
          }
        } catch (error) {
          console.error('Error fetching Discord status:', error);
          setDiscordStatus(null);
        }
      };

      fetchDiscordStatus();
      // Optional: Poll for updates every few seconds
      const intervalId = setInterval(fetchDiscordStatus, 10000); // Fetch every 10 seconds
      return () => clearInterval(intervalId);
    }
  }, [currentPage]);

  // Effect to fetch GitHub activity when on dashboard page
  useEffect(() => {
    if (currentPage === 'dashboard') {
      const fetchGithubActivity = async () => {
        try {
          const response = await fetch('https://api.github.com/users/chang-07/events/public');
          const data = await response.json();
          if (response.ok) {
            // Filter for PushEvent (commits) and limit to recent ones
            const pushEvents = data.filter(event => event.type === 'PushEvent').slice(0, 10); // Get last 10 push events
            setGithubActivity(pushEvents);
          } else {
            console.error('Failed to fetch GitHub activity:', data.message);
            setGithubActivity([]);
          }
        } catch (error) {
          console.error('Error fetching GitHub activity:', error);
          setGithubActivity([]);
        }
      };

      fetchGithubActivity();
    }
  }, [currentPage]);

  const cardData = [
    {
      id: 1,
      title: 'FBL Canada (Canada FBLA)',
      imageUrl: 'https://i.imgur.com/IxODdpj.jpeg',
      content: 'In 2023-2024, I was the National Finance Officer for Canada FBLA — where I managed a six-figure budget alongside aggregating a five-figure sponsorship sum. Within the role, I utilized QuickBooks, Excel, and AppScript to automate outreach, handle compliance, and journal expenses. Going into 2024-2025, I was appointed National President — growing membership by 23%, expanding chapter growth by 37%, navigating through a branding / legal restructuring (including filing amendments, bylaws, and disclosures with Governments Canada) — alongside working to increase revenue by 87%. As a completely student run organization, I oversaw all major tasks completed by our 50+ staff team, including but not limited to the acquisition of a five-figure venue contract, dealing with international customs, and corporate restructuring \n www.fblc.ca',
    },
    {
      id: 2,
      title: 'JAMHacks 9',
      imageUrl: 'https://i.imgur.com/MtaZISS.jpeg',
      content: 'I served as the Finance Lead for JAMHacks 9 in 2025, leading sponsorships/budgeting for Canada\'s largest highschool hackathon. Within the role, I worked to secure over $10,000 in sponsorships — including firms like the James Dyson Foundation and the University of Waterloo — along with budgeting for the event given no revenue and expansive costs (full catering, lanyards, venue costs, etc)\nwww.jamhacks.ca',
    },
    {
      id: 3,
      title: 'GeeseHacks',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuwimprint.ca%2Fwp-content%2Fuploads%2F2025%2F01%2Fgeesehacks.jpg&f=1&nofb=1&ipt=48ac043625aea68876f67d7e4ebb035c5fc6ee872eca24bfd141c3b7fd753194',
      content: 'Currently the Sponsorships Lead for GeeseHacks, the second largest Hackathon at the University of Waterloo — backed by Google, Amazon, Sunlife, and the Math Endowment Fund. In progress...\n www.geesehacks.com',
    },
    {
      id: 4,
      title: 'IOGarden',
      imageUrl: 'https://media.discordapp.net/attachments/1394151692723028049/1396478009883496488/image.png?ex=6884d27e&is=688380fe&hm=49f4e42da68ee3960b5915fe05dd9d62a0df0d75d1d8305d2163a08133fe9a91&=&format=webp&quality=lossless&width=2794&height=1725',
      content: 'Won First for Best Use of MongoDB at Hack The 6ix, Canada\'s largest summer hackathon. Built a plant logging app that uses Gemini and key APIs to predict and provide specific help for different plants, these plants identified using the PlantNet computer vision service. In addition, we implemented and integrated a dataase of over 650,000 plants, interactive and cached across a dynamic world map. \nhttps://devpost.com/software/iogarden',
    },
    {
      id: 5, 
      title: 'PopChat (WDS Project Manager Submission)',
      imageUrl: 'https://i.imgur.com/QbDZg79.png',
      content: 'Built a makeshift social media site using the MERN stack for my Western Dev Soc PM application, Stores users and global bubbles within a MongoDB cluster, calls upon login, and uses a really janky physics model to display bubbles along an open plane. \n https://github.com/chang-07/wds-oa'
    },
    {
      id: 6,
      title: 'Black-Scholes Options Pricing',
      imageUrl: 'https://i.imgur.com/8J2opAh.png',
      content: 'Built a dynamic Black-Scholes-Merton Options Pricing Calculator for both calls and puts — set with heatmaps that track P&L given the parameters of spot price and volatility. Export section a work in progress.\nhttps://github.com/chang-07/black-scholes-merton',
    },
    {
      id: 7,
      title: 'Economic Inequality @ UWO',
      imageUrl: 'https://i.imgur.com/HZow7Zn.png',
      content: 'Spent 2 years working on a Research Project with the Statistics Department at the University of Western Ontario. Focused on using chi square statistics and advanced indices like the Atkinson Index to chart economic inequality across a wide expanse of indicators (secondary school graduation percentae, household income, etc) and logged along a dynamic map of Toronto\'s 25 wards to visualize income inequality. Adviced within a TDSB research board as to how to eliminate educational inequality across the district. Pending publishing.',
    },
    {
      id: 8,
      title: 'ChessMaster',
      imageUrl: 'https://i.imgur.com/Qcg0Uq7.png',
      content: 'Built a Java-only Chess Engine utilizing Java Swing.\n https://github.com/chang-07/chessmaster11',
    },
    {
      id: 9, 
      title: 'Monte Carlo Pricer (Unpolished)',
      content: 'Built a Monte Carlo Pricer utilizing cpp, Crow, and React. Rather unpolished but mainly just for educational purposes + learning crow\nhttps://github.com/chang-07/monte-carlo'
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

  const blogPosts = [
    {
      id: 2,
      title: 'HT6 Debrief // IOGarden',
      date: 'July 25, 2025',
      content: "At my first (actual) hackathon, my team and I managed to take home the MLH Best Use of MongoDB amongst 500+ hackers for our project IO Garden. It was a really fun experience and helped me refresh my very rusty React skills a ton, and I also had the chance to connect and meet with a lot of cool people — especially @Syed Shahzad Raza and the rest of the team at Deloitte. Want to see our award winning project? Click the link here: https://devpost.com/software/iogarden",
      imageUrl: "https://media.discordapp.net/attachments/1394151692723028049/1396478009883496488/image.png?ex=6884d27e&is=688380fe&hm=49f4e42da68ee3960b5915fe05dd9d62a0df0d75d1d8305d2163a08133fe9a91&=&format=webp&quality=lossless&width=2794&height=1725",
    },
    {
      id: 1,
      title: 'Hello World',
      date: 'July 23, 2025',
      content: "...does this work?",

    },
  ];

  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home"> [ Home ] </a>
        <a href="#about"> [ About ] </a>
        <a href="#dashboard"> [ Dashboard ] </a>
        <a href="#blog"> [ Blog ] </a>
      </nav>
      {currentPage !== 'about' && currentPage !== 'dashboard' && (
        <>
          <h1 className="name">
            [Sheng Chang Li]
          </h1>
          <h3 className="subtitle">
            CS + Ivey + Scholar's Electives @ Western University
          </h3>
        </>
      )}

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

          {showPopup && selectedCard && (() => {
            const parseContent = (content) => {
              const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
              const urls = content.match(urlRegex);
              if (urls) {
                  const lastUrl = urls[urls.length - 1];
                  const text = content.replace(lastUrl, '').trim();
                  return { text, url: lastUrl };
              }
              return { text: content, url: null };
            };
            const { text, url } = parseContent(selectedCard.content);
            return (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedCard.title}</h2>
                        <p>{text}</p>
                        {url && <a href={url.startsWith('www') ? `http://${url}` : url} target="_blank" rel="noopener noreferrer" className="popup-link">{url}</a>}
                        <span className="popup-close-button" onClick={closePopup}>[x]</span>
                    </div>
                </div>
            );
          })()}
        </>
      )}

      {currentPage === 'about' && (
        <div className="about-box">
          <h2>About Me</h2>
          <ul>
            <li>Born in Dalian, China and moved to Canada at 2 </li>
            <li>Attended the TOPS Program at Marc Garneau Collegiate Institute, the <span style={{ color: 'yellow' }}>#1 STEM school</span> in Canada with an 8% acceptance rate</li>
            <li>Spent most of high school focusing on business/finance, appointed National President at Canada FBLA overseeing <span style={{ color: 'yellow' }}>2500 members </span> and 150 chapters</li>
            <li>Globally ranked for Insurance and Risk Management, alongside Biomedical Debate</li>
            <li>Dual focus in Math / CS, having placed in the <span style={{ color: 'yellow' }}>top 5% in math competitions </span> (CEMC, AMC, CMS Camp) — also led finances for JAMHacks 9, the largest highschool hackathon in Canada</li>
            <li>Applied to 15 schools in the US and Canada in 2025, and was left to choose between Western CS + Ivey, Waterloo CS/BBA, and Duke CS + Econ</li>
            <li>For financial reasons and research opportunities with the SE program, I ended up choosing Western CS + Ivey</li>
            <li><span style={{ color: 'yellow' }}>Tech Stack: </span> C++, Python, Flask, React, MongoDB, Express.js, Node.js, Java, Pytorch, HTML, CSS, JavaScript, emsdk</li>
            <li>Currently seeking opportunities in <span style={{ color: 'yellow' }}>buy-side/sell-side finance, proprietary trading, and software engineering</span></li>
          </ul>
        </div>
      )}
      {currentPage === 'dashboard' && (
        <div className="dashboard-container">
          {discordStatus ? (
            <div className="discord-status-grid">
              <div className="discord-box vscode-box">
                <h3>Coding</h3>
                {discordStatus.activities.some(activity => activity.name === 'Visual Studio Code' || activity.name === 'Cursor' || activity.name === 'Neovim') ? (
                  <>
                    {discordStatus.activities.map(activity => {
                      if (activity.name === 'Visual Studio Code' || activity.name === 'Cursor' || activity.name === 'Neovim') {
                        return (
                          <div key={activity.id}>
                            <p><strong>{activity.name}</strong></p>
                            {activity.details && <p>{activity.details}</p>}
                            {activity.state && <p>{activity.state}</p>}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : (
                  <p>Not coding</p>
                )}
              </div>

              {/* Games Box */}
              <div className="discord-box games-box">
                <h3>Gaming</h3>
                {discordStatus.activities.some(activity => ['League of Legends', 'Factorio', 'Minecraft'].includes(activity.name)) ? (
                  <>
                    {discordStatus.activities.map(activity => {
                      if (['League of Legends', 'Factorio', 'Minecraft'].includes(activity.name)) {
                        return (
                          <div key={activity.id}>
                            <p><strong>{activity.name}</strong></p>
                            {activity.details && <p>{activity.details}</p>}
                            {activity.state && <p>{activity.state}</p>}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : (
                  <p>Not gaming</p>
                )}
              </div>

              {/* Obsidian Box */}
              <div className="discord-box obsidian-box">
                <h3>Obsidian</h3>
                {discordStatus.activities.some(activity => activity.name === 'Obsidian') ? (
                  <>
                    {discordStatus.activities.map(activity => {
                      if (activity.name === 'Obsidian') {
                        return (
                          <div key={activity.id}>
                            <p><strong>{activity.name}</strong></p>
                            {activity.details && <p>{activity.details}</p>}
                            {activity.state && <p>{activity.state}</p>}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : (
                  <p>Not using Obsidian</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading Discord status...</p>
          )}

          <div className="github-section">
            <h3>GitHub Contributions</h3>
            <img
              src="https://ghchart.rshah.org/chang-07"
              alt="GitHub Contributions Graph"
              className="github-contributions-graph"
            />

            <h3>Recent Commits</h3>
            {githubActivity.length > 0 ? (
              <ul className="github-commit-list">
                {githubActivity.map((event) => (
                  <li key={event.id} className="github-commit-item">
                    <p><strong>Repo:</strong> <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer">{event.repo.name}</a></p>
                    {event.payload.commits && event.payload.commits.map((commit) => (
                      <p key={commit.sha}>
                        <strong>Commit:</strong> <a href={`https://github.com/${event.repo.name}/commit/${commit.sha}`} target="_blank" rel="noopener noreferrer">{commit.message}</a>
                      </p>
                    ))}
                    <p className="commit-date">({new Date(event.created_at).toLocaleString()})</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading GitHub activity or no recent public commits found.</p>
            )}
          </div>
        </div>
      )}
      {currentPage === 'blog' && (
        <div className="blog-container">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-post">
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="blog-post-image" />}
              <h3>{post.title}</h3>
              <p className="blog-post-date">{post.date}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}

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
              const options = ['home', 'about', 'dashboard', 'blog'];
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
                const options = ['home', 'about', 'dashboard', 'blog'];
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
        {['Home', 'About', 'Dashboard', 'Blog']
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
