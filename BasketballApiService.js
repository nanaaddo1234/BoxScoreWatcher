import axiosInstance from './axiosInstance.js';
import { Player, PlayerStats } from './player.js'; // Import Player class

export const getPlayers = async () => {
    try {
        const response = await axiosInstance.get('/api/players');
        // Log the response to ensure the structure is as expected
        console.log('Fetched players data:', response.data);
        return Array.isArray(response.data) ? response.data : []; // Ensure it returns the array
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

// Fetch player stats
export const getPlayerStats = async (playerId, firstYear) => {
    try {
        const response = await axiosInstance.get('/api/player_stats', {
            params: { player_id: playerId, first_year: firstYear } // Include first_year parameter
        });
        console.log('API Response:', response.data); // Log the response data

        // Access nested stats array from the new JSON format
        const statsObject = response.data.stats;

        // Ensure statsObject is an object and contains nested stats
        if (statsObject && statsObject.stats && Array.isArray(statsObject.stats.L)) {
            const statsArray = statsObject.stats.L;

            return statsArray.map(statObj => {
                const stat = statObj.M; // Access the 'M' object for each stat
                return new PlayerStats(
                    stat.season.S,       // maps to season
                    stat.pts.S,          // maps to pointsPerGame
                    stat.trb.S,          // maps to reboundsPerGame
                    stat.ast.S,          // maps to assistsPerGame
                    stat.fg3_pct.S,      // maps to fg3Pct
                    stat.fg3a.S,         // maps to fg3a
                    stat.fg_pct.S,       // maps to fgPct
                    stat.fga.S,          // maps to fga
                    stat.tov.S,          // maps to tov
                    stat.team.S          // maps to team
                );
            });
        } else {
            throw new Error('Unexpected API response format: stats.L is not an array');
        }
    } catch (error) {
        console.error('Error fetching player stats:', error);
        throw error;
    }
};




// Fetch a random player with an optional year range
export const getRandomPlayer = async (yearRange, ppg) => {
    try {
        const response = await axiosInstance.get('/api/random_player', {
            params: {
                startYear: yearRange ? yearRange[0] : undefined,
                endYear: yearRange ? yearRange[1] : undefined,
                ppg: ppg
            }
        });

        const playerData = response.data;

        // Map the API response to Player model
        return new Player(
            playerData.player_id,   // Maps to `id` in Player
            playerData.name,        // Maps to `name` in Player
            playerData.first_year,  // Maps to `firstSeason` in Player
            playerData.ppg          // Maps to `ppg` in Player
        );
    } catch (error) {
        console.error('Error fetching random player:', error);
        throw error;
    }
};



export const updatePlayerScore = async (playerId, firstYear, score) => {
    try {
        const response = await axiosInstance.get('/api/update_player_score', {
            params: {
                player_id: playerId,
                first_year: firstYear,
                score: score
            }
        });

        const updateData = response.data;

        // Log the entire response for debugging
        console.log('Updated Player Stats:', updateData);

        // Assuming updateData contains the average score, return it
        return updateData.average_score;  // Return just the average score
    } catch (error) {
        console.error('Error updating player stats:', error);
        throw error;
    }
};