import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';
import pokemon from '../../Data/pokemon.json';

import Grid from './Grid';
import Warrior from './Warrior';

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 15px;
  background: ${({ contains }) => contains ? '#b7ccb7' : '#f6f6f6'};
  box-shadow: 0 1px 5px #666;
  color: #999;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 18px;
  color: indianred;
  grid-column-start: first;
  grid-column-end: end;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-around;

  @media (min-width: 2250px) {
    & {
      grid-template-columns: repeat(6, auto);
    }
  }
`;

const WarriorContainer = Grid.extend`
  padding: 15px;
`;

const Region = ({ moveWarrior, name, selected, selectWarrior, updateRegion, warriors }) => {
  const handleClick = () => {
    moveWarrior(name);
  };

  const containsPerfect = () => {
    if (selected && !selected.perfectLinks.includes(selected.current)) {
      for (let i = 0; i < selected.perfectLinks.length; i += 1) {
        if (pokemon[selected.perfectLinks[i]].region.includes(name)) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <Wrapper contains={containsPerfect()}>
      <Grid justify="center" align="center">
        <img src="empty.png" className={name} alt={name} />
        <Grid width="20px" />
        <Title onClick={handleClick}>{prettyPrint(name)}</Title>
      </Grid>
      <Container>
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
      </Container>
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
