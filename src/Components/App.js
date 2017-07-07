import React from 'react';

import Grid from './Presentation/Grid';
import Header from './Presentation/Header';

const MainContainer = Grid.extend`
  padding: 0 30px;
`;

const App = () => (
  <MainContainer column>
    <Header justify="space-around">
      Pokemon Conquest Tracker
    </Header>
    <Grid row>
      <Grid />
    </Grid>
  </MainContainer>
);

export default App;
