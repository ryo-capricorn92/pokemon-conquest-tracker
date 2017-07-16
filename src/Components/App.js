/* global localStorage */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Grid from './Presentation/Grid';
import Header from './Presentation/Header';
import Region from './Presentation/Region';
import AddWarrior from './Presentation/AddWarrior';

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
      selected: null,
    };

    this.setAllState = this.setAllState.bind(this);
    this.updateRegion = this.updateRegion.bind(this);
    this.selectWarrior = this.selectWarrior.bind(this);
    this.moveWarrior = this.moveWarrior.bind(this);
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
    if (this.state.selected && this.state.ransei[region].warriors < 5) {
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
          {regions.map(region => (
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
      </MainContainer>
    );
  }
}

App.propTypes = {
  ransei: PropTypes.shape().isRequired,
};

export default App;
