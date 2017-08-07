/* global localStorage */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from './Presentation/Grid';
import Header from './Presentation/Header';
import Region from './Presentation/Region';
import StagingRegion from './Presentation/StagingRegion';
import AddWarrior from './Presentation/AddWarrior';

import { regions } from '../Data/regions.json';
// import warriors from '../Data/warriors.json';
// import pokemon from '../Data/pokemon.json';

const MainContainer = Grid.extend`
  padding: 0 30px;
  min-width: 1200px;
`;

const RegionContainer = Grid.extend`
  padding: 15px;
`;

const Reset = styled.button`
  width: 200px;
  margin: 20px;
  background-color: #e5cece;
  border: 1px solid #7f0000;
  color: #7f0000;
  border-radius: 5px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ransei: props.ransei,
      selected: null,
    };

    this.setAllState = this.setAllState.bind(this);
    this.updateRegion = this.updateRegion.bind(this);
    this.selectWarrior = this.selectWarrior.bind(this);
    this.moveWarrior = this.moveWarrior.bind(this);
    this.resetWarriors = this.resetWarriors.bind(this);
  }

  setAllState(newState) {
    localStorage.setItem('ransei', JSON.stringify(newState.ransei));
    this.setState(newState);
  }

  updateRegion(region, warriors) {
    const newRansei = Object.assign({}, this.state.ransei);
    newRansei[region].warriors = warriors;

    this.setAllState({ ransei: newRansei });
  }

  selectWarrior(warrior, oldRegion) {
    if (this.state.selected) {
      if (this.state.selected.warrior === warrior) {
        this.setState({
          selected: null,
        });
      } else {
        const firstWarrior = this.state.selected.warrior;
        const firstRegion = this.state.selected.region;
        const ransei = this.state.ransei;
        let i;
        i = ransei[firstRegion].warriors.indexOf(firstWarrior);
        ransei[firstRegion].warriors[i] = warrior;
        i = ransei[oldRegion].warriors.indexOf(warrior);
        ransei[oldRegion].warriors[i] = firstWarrior;

        this.setAllState({
          ransei,
          selected: null,
        });
      }
    } else {
      this.setAllState({
        selected: {
          warrior,
          region: oldRegion,
        },
      });
    }
  }

  moveWarrior(region) {
    if (this.state.selected && this.state.ransei[region].warriors.length < 6) {
      const warrior = this.state.selected.warrior;
      const firstRegion = this.state.selected.region;
      const ransei = this.state.ransei;
      ransei[region].warriors.push(warrior);
      const i = ransei[firstRegion].warriors.indexOf(warrior);
      ransei[firstRegion].warriors.splice(i, 1);

      this.setAllState({
        ransei,
        selected: null,
      });
    }
  }

  resetWarriors() {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to reset your regions? You will lose all game data.')) {
      const ransei = Object.assign({}, this.state.ransei);
      regions.forEach((region) => {
        ransei[region].warriors = [];
      });
      this.setAllState({
        ransei,
      });
    }
  }

  render() {
    return (
      <MainContainer column>
        <Header justify="space-around">
          Pokemon Conquest Tracker
        </Header>
        <Grid row>
          <AddWarrior updateRegion={this.updateRegion} ransei={this.state.ransei} />
        </Grid>
        <Grid column>
          <RegionContainer>
            <StagingRegion
              name="staging"
              warriors={this.state.ransei.staging.warriors}
              updateRegion={this.updateRegion}
              selectWarrior={this.selectWarrior}
              moveWarrior={this.moveWarrior}
              selected={this.state.selected ? this.state.selected.warrior : null}
            />
          </RegionContainer>
          {regions.map(region => region !== 'staging' && (
            <RegionContainer key={region}>
              <Region
                name={region}
                warriors={this.state.ransei[region].warriors}
                updateRegion={this.updateRegion}
                selectWarrior={this.selectWarrior}
                moveWarrior={this.moveWarrior}
                selected={this.state.selected ? this.state.selected.warrior : null}
              />
            </RegionContainer>
          ))}
        </Grid>
        <Grid row justify="center">
          <Reset onClick={this.resetWarriors}>Reset Game</Reset>
        </Grid>
      </MainContainer>
    );
  }
}

App.propTypes = {
  ransei: PropTypes.shape().isRequired,
};

export default App;
