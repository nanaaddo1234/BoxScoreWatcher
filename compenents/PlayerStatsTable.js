import React, { useState, useEffect } from 'react';
import { getPlayerStats } from '../BasketballApiService'; // Ensure this path is correct

const PlayerStatsTable = ({ playerId, firstYear, statsVisibility, onStatClick }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPlayerStats(playerId, firstYear); // Pass firstYear
        setStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    if (playerId && firstYear) { // Ensure both playerId and firstYear are present
      fetchStats();
    }
  }, [playerId, firstYear]); // Add firstYear to the dependency array
  

  console.log('Rendering PlayerStatsTable with statsVisibility:', statsVisibility);

  return (
    <div className="table-container">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Points Per Game</th>
            <th>Rebounds Per Game</th>
            <th>Assists Per Game</th>
            <th>Field Goal Percentage</th>
            <th>Field Goal Attempts</th>
            <th>Three-Point Percentage</th>
            <th>Three-Point Attempts</th>
            <th>Turnovers</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.season}</td>
              <td
                className={`stat ${statsVisibility[index]?.pts ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'pts')}
              >
                {statsVisibility[index]?.pts ? stat.pts : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.trb ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'trb')}
              >
                {statsVisibility[index]?.trb ? stat.trb : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.ast ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'ast')}
              >
                {statsVisibility[index]?.ast ? stat.ast : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.fg_pct ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'fg_pct')}
              >
                {statsVisibility[index]?.fg_pct ? stat.fg_pct : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.fga ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'fga')}
              >
                {statsVisibility[index]?.fga ? stat.fga : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.fg3_pct ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'fg3_pct')}
              >
                {statsVisibility[index]?.fg3_pct ? stat.fg3_pct : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.fg3a ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'fg3a')}
              >
                {statsVisibility[index]?.fg3a ? stat.fg3a : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.tov ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'tov')}
              >
                {statsVisibility[index]?.tov ? stat.tov : '*****'}
              </td>
              <td
                className={`stat ${statsVisibility[index]?.team ? 'uncovered' : 'covered'}`}
                onClick={() => onStatClick(index, 'team')}
              >
                {statsVisibility[index]?.team ? stat.team : '*****'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default PlayerStatsTable;
