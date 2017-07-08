import PropTypes from 'prop-types';
import React from 'react';

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
  background: #bbb;
  border: 2px solid ${({ perfect }) => perfect ? 'darkgray' : 'darkred'};
  border-radius: 3px;
`;

const PerfectLink = Grid.extend`
  margin: 5px;
  padding: 5px;
  background: #bbb;
  border: 2px solid darkgray;
  border-radius: 3px;
`;

const Warrior = ({ warrior }) => {
  const hasPerfectPokemon = (current, perfects) => perfects.includes(current);

  return (
    <Wrapper row>
      <Avatar width="145px" justify="center">
        <img src={warrior.icon} alt="name" />
      </Avatar>
      <Name align="center">
        {prettyPrint(warrior.name)}
      </Name>
      <Grid align="flex-end" shrink>
        {warrior.perfectLinks.map(poke => (
          <PerfectLink key={poke}>
            <img src={pokemon[poke].icon} alt={poke} width="45px" height="45px" />
          </PerfectLink>
        ))}
      </Grid>
      <CurrentPokemon
        width="145px"
        justify="center"
        perfect={hasPerfectPokemon(warrior.current, warrior.perfectLinks)}
      >
        <img src={pokemon[warrior.current].icon} alt={warrior.current} />
      </CurrentPokemon>
    </Wrapper>
  );
};

Warrior.propTypes = {
  warrior: PropTypes.shape().isRequired,
};

export default Warrior;
