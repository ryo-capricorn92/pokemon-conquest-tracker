import PropTypes from 'prop-types';
import React from 'react';

import Grid from './Grid';

import pokemon from '../../Data/pokemon.json';
import { prettyPrint } from '../../utils';

const Wrapper = Grid.extend`
  padding: 10px;
  background: #93B1A7;
  border: 2px solid #7A918D;
  border-radius: 15px;
  color: #7A918D;
`;

const Avatar = Grid.extend`
  padding: 5px;
  border: 1px solid #7A918D;
  border-radius: 3px;
`;

const Name = Grid.extend`
  font-size: 16px;
  padding: 5px;
`;

const CurrentPokemon = Grid.extend`
  padding: 5px;
  border: 1px solid #7A918D;
  border-radius: 3px;
`;

const PerfectLink = Grid.extend`
  margin: 5px;
  padding: 5px;
  border: 1px solid #7A918D;
  border-radius: 3px;
`;

const Warrior = ({ warrior }) => (
  <Wrapper row>
    <Avatar width="145px" justify="center">
      <img src={warrior.icon} alt="name" />
    </Avatar>
    <Name align="center">
      {prettyPrint(warrior.name)}
    </Name>
    <Grid align="flex-end" shrink>
      {warrior.perfectLinks.map(poke => (
        <PerfectLink>
          <img src={pokemon[poke].icon} alt={poke} width="45px" height="45px" />
        </PerfectLink>
      ))}
    </Grid>
    <CurrentPokemon width="120px" justify="center">
      POKE GOES HERE
    </CurrentPokemon>
  </Wrapper>
);

Warrior.propTypes = {
  warrior: PropTypes.shape().isRequired,
};

export default Warrior;
