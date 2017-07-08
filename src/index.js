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
  aurora: {
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
        current: 'meowth',
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
        current: 'rhyhorn',
      },
      {
        name: 'chacha',
        icon: 'https://www.serebii.net/conquest/bushou/n7.png',
        perfectLinks: [
          'minccino',
          'cinccino',
        ],
        types: [
          'normal',
        ],
        current: 'meowth',
      },
    ],
  },
};

localStorage.setItem('ransei', JSON.stringify(obj));
