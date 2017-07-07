/* global localStorage */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

import './main.css';
import { regions } from './Data/regions.json';

const ransei = JSON.parse(localStorage.getItem('ransei')) || {};

regions.forEach((region) => {
  ransei[region] = ransei[region] || {
    warriors: [],
  };
});

ReactDOM.render(<App ransei={ransei} />, document.getElementById('root'));
registerServiceWorker();


const obj = {
  Aurora: {
    warriors: [
      {
        name: 'tsunehisa',
        icon: 'https://www.serebii.net/conquest/bushou/n1.png',
        perfectLinks: [
          'meowth',
          'persian',
        ],
        types: [
          'normal',
        ],
      },
      {
        name: 'naoie',
        icon: 'https://www.serebii.net/conquest/bushou/n2.png',
        perfectLinks: [
          'deino',
          'zweilous',
          'hydreigon',
        ],
        types: [
          'dark',
        ],
      },
    ],
  },
};

localStorage.setItem('ransei', JSON.stringify(obj));
