import React from "react";
import "./App.css";

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = { data: [] };

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

  render() {
    return (
      <div className="App">
        {this.state.data.map(u => (
          <div key={u.candidate}>
            {u.candidate}: {u.wins}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
