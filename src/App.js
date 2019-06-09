import React from "react";
import "./App.css";

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = { data: [], players: {} };
    fetch("http://192.168.1.178:8080/players")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          players: json.reduce((a, c) => {
            a[c.shortName] = c;
            return a;
          }, {})
        });
      });
    const refreshData = () => {
      fetch("http://192.168.1.178:8080/wins")
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({
            data: json
          });
        });
    };
    setInterval(refreshData, 1000);
  }

  togglePlayer(player) {
    this.setState({
      players: {
        ...this.state.players,
        [player.shortName]: {
          ...player,
          isOn: !player.isOn
        }
      }
    });
  }

  render() {
    return (
      <div className="App">
        {Object.values(this.state.players).map(player => (
          <div key={player.shortName} style={{ margin: "10px" }}>
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline"
              }}
              onClick={() => this.togglePlayer(player)}
            >
              {player.name}
            </span>
            <span>{player.isOn ? ": ACTIVE" : ""}</span>
          </div>
        ))}
        {this.state.data.map(u => {
          console.log(this.state.players);
          console.log(u.candidate);
          if (!this.state.players[u.candidate].isOn) {
            return null;
          }
          return (
            <div key={u.candidate}>
              {u.candidate}: {u.wins}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
