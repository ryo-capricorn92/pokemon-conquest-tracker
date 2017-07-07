import React from 'react';

import Grid from './Presentation/Grid';
import Header from './Presentation/Header';

const MainContainer = Grid.extend`
  padding: 0 30px;
`;

const App = () => (
  <MainContainer>
    <Header justify="space-around">
      Pokemon Conquest Tracker
    </Header>
  </MainContainer>
);

export default App;
