import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import PlayerStatsTable from './components/PlayerStatsTable';
import SearchBar from './components/SearchBar';
import HowToPlayModal from './components/HowToPlayModal';
import { getPlayers, getRandomPlayer, updatePlayerScore } from './BasketballApiService';
import './App.css';
import StartYearSlider from './components/StartYearSlider';
import logo from './assets/logobswfinal.png';
import RepeatedSeasonsModal  from './components/RepeatedSeasonsModal';
import PpgSlider from './components/PpgSlider'


function App() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [theSelectedPlayerName, setTheSelectedPlayerName] = useState('');
  const [selectedPlayerYear, setSelectedPlayerYear] = useState('');
  const [score, setScore] = useState(100);
  const [statsVisibility, setStatsVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrectGuessModalOpen, setIsCorrectGuessModalOpen] = useState(false);
  const [isWrongGuessModalOpen, setIsWrongGuessModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [loadingNewPlayer, setLoadingNewPlayer] = useState(false);
  const [lastPlayerName, setLastPlayerName] = useState('');
  const [loadingDots, setLoadingDots] = useState('...');
  const [initialLoad, setInitialLoad] = useState(true);
  const [yearRange, setYearRange] = useState([1990, 2020]);
  const [ppg, setPpg] = useState(15);  
  const [isLastGuessCorrect, setIsLastGuessCorrect] = useState(false);
  const [averageScore, setAverageScore] = useState(null);
  const [newPlayerPressed, setNewPlayerPressed] = useState(false);
  const [playerInSearchBar, setPlayerInSearchBar] = useState(''); // New state
  const [isRepeatedSeasonsModalOpen, setIsRepeatedSeasonsModalOpen] = useState(false);
  
  const fetchPlayersAndSelectRandom = async () => {
    try {
      setLoadingNewPlayer(true);

      if (!initialLoad) {
        setIsPlayerModalOpen(true);
      }

      const playersData = await getPlayers();
      setPlayers(playersData);
      let randomPlayer = await getRandomPlayer(yearRange, ppg);

      setTheSelectedPlayerName(randomPlayer.name);
      setSelectedPlayerYear(randomPlayer.firstSeason);
      setSelectedPlayer(randomPlayer.id);
      setStatsVisibility({});
      setScore(100);
    } catch (error) {
      console.error('Error fetching players or random player:', error);
    } finally {
      setLoadingNewPlayer(false);
      setInitialLoad(false);
    }
  };


  useEffect(() => {
    fetchPlayersAndSelectRandom();
  }, []);

  useEffect(() => {
    if (loadingNewPlayer) {
      const interval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev === '...') return '.';
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '...';
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loadingNewPlayer]);

  const debouncedSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 10);

  const handleSearchChange = (e) => {
    debouncedSearchChange(e.target.value);
  };

  const handlePlayerClick = (playerName) => {
    setSearchQuery(playerName);
    setPlayerInSearchBar(playerName); // Set playerInSearchBar here
  };



  const handleCheckClick = async () => {
    const isCorrect = playerInSearchBar.toLowerCase() === theSelectedPlayerName.toLowerCase(); // Use playerInSearchBar
  
    if (isCorrect) {
      const averageScore = await updatePlayerScore(selectedPlayer, selectedPlayerYear, score);
      setAverageScore(averageScore);
      setIsLastGuessCorrect(true);
      setIsCorrectGuessModalOpen(true);
    } else {
      setIsLastGuessCorrect(false);
      setIsWrongGuessModalOpen(true);
  
      // Subtract 5 points if the guess is wrong, but ensure score doesn't go below 0
      setScore(prevScore => Math.max(prevScore - 4, 0)); // Ensure score is at least 0
    }
  };



  const handleStatClick = (index, statType) => {
    setStatsVisibility(prevState => {
      const updatedVisibility = { ...prevState };
  
      if (!updatedVisibility[selectedPlayer]) {
        updatedVisibility[selectedPlayer] = {};
      }
  
      updatedVisibility[selectedPlayer][index] = {
        ...updatedVisibility[selectedPlayer][index],
        [statType]: true
      };
  
      let scoreChange = 1;
      if (statType === 'team') {
        scoreChange = 4;
      } else if (statType === 'pts') {
        scoreChange = 2;
      }
  
      // Ensure the score doesn't go below 0
      setScore(prevScore => Math.max(prevScore - scoreChange, 0));
  
      return updatedVisibility;
    });
  };



  const handleCorrectGuessModalClose = () => {
    setIsCorrectGuessModalOpen(false);
    setSearchQuery('');
    fetchPlayersAndSelectRandom();
  };

  const handleWrongGuessModalClose = () => {
    setIsWrongGuessModalOpen(false);
    setSearchQuery('');
  };

  const handleNewPlayerClick = () => {
    setLastPlayerName(theSelectedPlayerName);
    setLoadingNewPlayer(true);
    setIsPlayerModalOpen(true);
    setIsLastGuessCorrect(false);
    setNewPlayerPressed(true);
    fetchPlayersAndSelectRandom();   
  };

  const handlePlayerModalClose = () => {
    setIsPlayerModalOpen(false);
    setNewPlayerPressed(false);
    setLastPlayerName(theSelectedPlayerName);
  };


  const filteredPlayers = Array.isArray(players) ? players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
) : [];

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
  }, [debouncedSearchChange]);
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-title-container">
          <img src={logo} alt="Logo" className="App-logo" />
          <h1>Box Score Watcher</h1>
        </div>
        <div className="score-display">
          Score: {score}
        </div>
        <div className="how-to-play" onClick={() => setIsModalOpen(true)}>
          How To Play
        </div>
        <div className="repeated-seasons" onClick={() => setIsRepeatedSeasonsModalOpen(true)}>
          Repeated Seasons and N/As
        </div>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onCheckClick={handleCheckClick}
        />
        {/* Show the player list only if there is a search query */}
        {searchQuery && (
          <ul className="player-list">
            {filteredPlayers.slice(0, 5).map(player => (
              <li 
                key={player.id} 
                onClick={() => handlePlayerClick(player.name)}
                className="player-item"
              >
                {player.name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleNewPlayerClick} className="new-player-button">
          New Player
        </button>


        <div>
          <StartYearSlider onChange={setYearRange} />
        </div>
        
        <div>
          <PpgSlider onChange={setPpg} />
        </div>


        {selectedPlayer && (
          <PlayerStatsTable
            key={selectedPlayer}
            playerId={selectedPlayer}
            firstYear={selectedPlayerYear} // Add this line to pass the firstYear prop
            statsVisibility={statsVisibility[selectedPlayer] || {}}
            onStatClick={handleStatClick}
          />
        )}
        {isModalOpen && !loadingNewPlayer && <HowToPlayModal onClose={() => setIsModalOpen(false)} />}
        {isRepeatedSeasonsModalOpen && <RepeatedSeasonsModal onClose={() => setIsRepeatedSeasonsModalOpen(false)} />}
        {isCorrectGuessModalOpen && isLastGuessCorrect && (
          <div className="correct-player-modal modal-overlay">
            <div className="modal-content">
              <h2>Correct Player!</h2>
              <p>Your Score: {score}</p>
              <p>Average score: {averageScore}</p>
              <button onClick={handleCorrectGuessModalClose}>Continue</button>
            </div>
          </div>
        )}
        {isWrongGuessModalOpen && !loadingNewPlayer && (
          <div className="wrong-player-modal modal-overlay">
            <div className="modal-content">
              <h2>Wrong Player!</h2>
              <button onClick={handleWrongGuessModalClose}>Try Again</button>
            </div>
          </div>
        )}
        {loadingNewPlayer && (
          <div className="loading-player-modal modal-overlay">
            <div className="modal-content">
              <p>Loading new player stats{loadingDots}</p>
            </div>
          </div>
        )}
        {!loadingNewPlayer && newPlayerPressed &&  (
          <div className="the-player-was-modal modal-overlay">
            <div className="modal-content">
              {!initialLoad && (
                <h2>The player was: {lastPlayerName}</h2>
              )}
              <button onClick={handlePlayerModalClose}>Close</button>
            </div>
          </div>
        )}
      </header>
      <footer className="App-footer">
        <small>
          <a href="https://www.vecteezy.com/free-vector/basketball">Basketball Vectors by Vecteezy</a> and 
          Image used under license from Shutterstock.com.| Contact: boxscorewatcher@outlook.com
        </small>
      </footer>
    </div>
    );
  }
