// Define PlayerStats model
export class PlayerStats {
    constructor(
        season,
        pts,        // pointsPerGame
        trb,        // reboundsPerGame
        ast,        // assistsPerGame
        fg3_pct,    // fg3Pct
        fg3a,       // fg3a
        fg_pct,     // fgPct
        fga,        // fga
        tov,        // tov
        team        // team
    ) {
        this.season = season;
        this.pts = pts;
        this.trb = trb;
        this.ast = ast;
        this.fg3_pct = fg3_pct;
        this.fg3a = fg3a;
        this.fg_pct = fg_pct;
        this.fga = fga;
        this.tov = tov;
        this.team = team;
    }
}

// Define Player model
export class Player {
    constructor(id, name = null, firstSeason, stats = null) {
        this.id = id;                    // player_id
        this.name = name;                // player name
        this.firstSeason = firstSeason;  // first_year
    }

    // Method to update the stats property
    fetchStats(stats) {
        this.stats = stats;
    }
}