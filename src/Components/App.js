/* global localStorage */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Grid from './Presentation/Grid';
import Header from './Presentation/Header';
import Region from './Presentation/Region';

import { regions } from '../Data/regions.json';
// import warriors from '../Data/warriors.json';
// import pokemon from '../Data/pokemon.json';

const MainContainer = Grid.extend`
  padding: 0 30px;
  min-width: 1024px;
`;

const RegionContainer = Grid.extend`
  padding: 15px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ransei: props.ransei,
    };

    this.setAllState = this.setAllState.bind(this);
    this.updateRegion = this.updateRegion.bind(this);
  }

  setAllState(newState) {
    localStorage.setItem('ransei', newState.ransei);
    this.setState(newState);
  }

  updateRegion(region, warriors) {
    const newState = Object.assign({}, this.state.ransei);
    newState[region].warriors = warriors;

    this.setAllState(newState);
  }

  render() {
    return (
      <MainContainer column>
        <Header justify="space-around">
          Pokemon Conquest Tracker
        </Header>
        <Grid wrap>
          {regions.map(region => (
            <RegionContainer sm="12" md="6" key={region}>
              <Region
                name={region}
                warriors={this.state.ransei[region].warriors}
                updateRegion={this.updateRegion}
              />
            </RegionContainer>
          ))}
        </Grid>
      </MainContainer>
    );
  }
}

App.propTypes = {
  ransei: PropTypes.shape().isRequired,
};

export default App;
