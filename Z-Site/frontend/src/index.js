import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import Coin from './Coin'
ReactDOM.render(
    <React.StrictMode>
        <div><App />
        <Coin />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
)