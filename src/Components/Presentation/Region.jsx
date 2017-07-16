import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';
import pokemon from '../../Data/pokemon.json';

import Grid from './Grid';
import Warrior from './Warrior';

const Wrapper = Grid.extend`
  padding: 20px;
  background: ${({ contains }) => contains ? '#b7ccb7' : '#ddd'};
  border: 2px solid ${({ contains }) => contains ? 'green' : '#999'};
  border-radius: 15px;
  color: #999;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 18px;
  color: indianred;
`;

const WarriorContainer = Grid.extend`
  padding: 15px;
`;

const Region = ({ moveWarrior, name, selected, selectWarrior, updateRegion, warriors }) => {
  const handleClick = () => {
    moveWarrior(name);
  };

  const containsPerfect = () => {
    if (selected) {
      for (let i = 0; i < selected.perfectLinks.length; i += 1) {
        if (pokemon[selected.perfectLinks[i]].region.includes(name)) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <Wrapper column contains={containsPerfect()}>
      <Title onClick={handleClick}>{prettyPrint(name)}</Title>
      <Grid column>
        {warriors.map(warrior => (
          <WarriorContainer key={warrior.name}>
            <Warrior
              warrior={warrior}
              warriors={warriors}
              region={name}
              updateRegion={updateRegion}
              selected={selected}
              selectWarrior={selectWarrior}
            />
          </WarriorContainer>
        ))}
      </Grid>
    </Wrapper>
  );
};

Region.propTypes = {
  moveWarrior: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.shape(),
  selectWarrior: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  warriors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      pokemon: PropTypes.string,
    }),
  ),
};

Region.defaultProps = {
  selected: null,
  warriors: [],
};

export default Region;
