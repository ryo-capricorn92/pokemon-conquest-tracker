import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from './Grid';

import pokemon from '../../Data/pokemon.json';
import { prettyPrint } from '../../utils';

const Wrapper = Grid.extend`
  padding: 10px;
  background: #ccc;
  border: 2px solid #888;
  border-radius: 15px;
  color: #888;
`;

const Avatar = Grid.extend`
  padding: 5px;
  background: #bbb;
  border: 2px solid darkgray;
  border-radius: 3px;
`;

const Name = Grid.extend`
  font-size: 16px;
  padding: 5px;
`;

const CurrentPokemon = Grid.extend`
  margin-left: 5px;
  padding: 5px;
  background: ${({ perfect }) => perfect ? '#b7ccb7' : '#ccb7b7'};
  border: 2px solid ${({ perfect }) => perfect ? 'green' : 'darkred'};
  border-radius: 3px;
  cursor: pointer;
`;

const PerfectLink = Grid.extend`
  margin: 5px;
  padding: 5px;
  background: ${({ isHere }) => isHere ? '#b7ccb7' : '#bbb'};
  border: 2px solid ${({ isHere }) => isHere ? 'green' : 'darkgray'};
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 5px;
  background-color: #fafafa;
  border: 1px solid #dadada;
  border-radius: 5px;
`;

const AddPokemon = Grid.extend`
  visibility: ${({ active }) => active ? 'inherit' : 'hidden'};
`;

const inThisRegion = (poke, warrior, region) => {
  if (!warrior.perfectLinks.includes(warrior.current) && pokemon[poke].region.includes(region)) {
    return true;
  }

  return false;
};

const hasPerfectPokemon = (current, perfects) => perfects.includes(current);

class Warrior extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPokeChange: false,
    };

    this.triggerPokemonChange = this.triggerPokemonChange.bind(this);
    this.removePokemonChange = this.removePokemonChange.bind(this);
    this.changePokemon = this.changePokemon.bind(this);
  }

  componentDidMount() {
    if (this.state.showPokeChange) {
      this.pokeInput.focus();
    }
  }

  triggerPokemonChange() {
    this.setState({
      showPokeChange: true,
    });
  }

  removePokemonChange() {
    this.setState({
      showPokeChange: false,
    });
  }

  changePokemon(e) {
    e.preventDefault();
    const newCurrent = e.target.pokemon.value.trim().toLowerCase();
    e.target.pokemon.value = '';
    const i = this.props.warriors.indexOf(this.props.warrior);
    this.props.warriors[i].current = newCurrent;
    this.setState({
      showPokeChange: false,
    });

    this.props.updateRegion(this.props.region, this.props.warriors);
  }

  render() {
    const { warrior, warriors, region } = this.props;
    return (
      <Wrapper row>
        <Avatar width="145px" justify="center">
          <img src={warrior.icon} alt="name" />
        </Avatar>
        <Name align="center">
          {prettyPrint(warrior.name)}
        </Name>
        <Grid column shrink>
          <AddPokemon align="center" row active={this.state.showPokeChange}>
            <form action="#" onSubmit={this.changePokemon}>
              <Input
                list="pokemans"
                name="pokemon"
                onBlur={this.removePokemonChange}
                innerRef={(input) => { this.pokeInput = input; }}
              />
              <datalist id="pokemans">
                {Object.keys(pokemon).map(poke => (
                  <option value={prettyPrint(poke)} key={poke} />
                ))}
              </datalist>
              <input type="submit" style={{ display: 'none' }} />
            </form>
          </AddPokemon>
          <Grid align="flex-end" justify="flex-end" row>
            {warrior.perfectLinks.map(poke => (
              <PerfectLink key={poke} isHere={inThisRegion(poke, warrior, region)} shrink>
                <img src={pokemon[poke].icon} alt={poke} width="45px" height="45px" />
              </PerfectLink>
            ))}
          </Grid>
        </Grid>
        <CurrentPokemon
          width="145px"
          justify="center"
          align="center"
          perfect={hasPerfectPokemon(warrior.current, warrior.perfectLinks)}
          onClick={this.triggerPokemonChange}
        >
          {warrior.current ? (
            <img src={pokemon[warrior.current].icon} alt={warrior.current} />
          ) : (
            <i className="fa fa-gitlab fa-4x" aria-hidden="true" />
          )}
        </CurrentPokemon>
      </Wrapper>
    );
  }
}

Warrior.propTypes = {
  region: PropTypes.string.isRequired,
  warrior: PropTypes.shape().isRequired,
};

export default Warrior;
