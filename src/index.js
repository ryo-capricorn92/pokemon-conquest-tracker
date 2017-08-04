/* global localStorage */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

import './main.css';
import { regions } from './Data/regions.json';

const ransei = localStorage.getItem('ransei')[0] === '{' ? JSON.parse(localStorage.getItem('ransei')) : {};
ransei.staging = ransei.staging || {
  warriors: [],
};

regions.forEach((region) => {
  ransei[region] = ransei[region] || {
    warriors: [],
  };
});

ReactDOM.render(<App ransei={ransei} />, document.getElementById('root'));
registerServiceWorker();
