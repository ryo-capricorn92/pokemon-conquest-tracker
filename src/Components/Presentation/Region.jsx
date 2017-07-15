import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';

import Grid from './Grid';
import Warrior from './Warrior';

const Wrapper = Grid.extend`
  padding: 20px;
  background: #ddd;
  border: 2px solid #999;
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

const Region = ({ name, selected, selectWarrior, updateRegion, warriors }) => (
  <Wrapper column>
    <Title>{prettyPrint(name)}</Title>
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

Region.propTypes = {
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
