new Vue({
  el: '#app',
  data: {
    players: [],
    displayedPlayers: [],
    numPlayers: 10,
  },
  mounted() {
    this.fetchPlayers("PTS"); // 默认按照 Points 排序
  },
  methods: {
    fetchPlayers(statCategory) {
      const url = `https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2023-24&SeasonType=Regular%20Season&StatCategory=${statCategory}`;
      axios.get(url)
        .then(response => {
          const headers = response.data.resultSet.headers;
          const playerStats = response.data.resultSet.rowSet.slice(0, this.numPlayers);
          this.players = playerStats.map(stats => {
            let playerObj = {};
            stats.forEach((stat, index) => {
              playerObj[headers[index]] = stat;
            });
            return playerObj;
          });
          this.displayedPlayers = this.players;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    sortPlayers() {
      const sortBy = document.getElementById('sort-option').value;
      this.fetchPlayers(sortBy);
    },
    updateNumPlayers() {
      this.numPlayers = document.getElementById('num-players').value || 10;
      this.fetchPlayers(document.getElementById('sort-option').value);
    }
  }
});


  // {
  //   "resource": "leagueleaders",
  //   "parameters": {
  //     "LeagueID": "00",
  //     "PerMode": "PerGame",
  //     "StatCategory": "PTS",
  //     "Season": "2023-24",
  //     "SeasonType": "Regular Season",
  //     "Scope": "S",
  //     "ActiveFlag": null
  //   },
  //   "resultSet": {
  //     "name": "LeagueLeaders",
  //     "headers": [
  //       "PLAYER_ID", "RANK", "PLAYER", "TEAM_ID", "TEAM", "GP", "MIN", 
  //       "FGM", "FGA", "FG_PCT", "FG3M", "FG3A", "FG3_PCT", 
  //       "FTM", "FTA", "FT_PCT", "OREB", "DREB", "REB", 
  //       "AST", "STL", "BLK", "TOV", "PTS", "EFF"
  //     ],
  //     "rowSet": [
  //       [
  //         1629029, 1, "Luka Doncic", 1610612742, "DAL", 47, 37.400000, 
  //         11.500000, 23.400000, 0.492000, 3.900000, 10.300000, 0.375000, 
  //         7.300000, 9.300000, 0.777000, 0.700000, 8.100000, 8.800000, 
  //         9.500000, 1.400000, 0.600000, 4.000000, 34.200000, 36.600000
  //       ],
  //       // ...其他球員數據...
  //     ]
  //   }
  // }
  