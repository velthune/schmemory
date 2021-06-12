import React from 'react';
import './App.css';
import Game from "./pages/game";

function App() {
    return (
        <div className="App">
            <Game cardNumber={16}/>
        </div>
    );
}

export default App;
