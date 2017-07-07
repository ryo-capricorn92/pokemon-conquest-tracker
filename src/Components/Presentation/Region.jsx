import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';
import Warrior from './Warrior';

const Wrapper = Grid.extend`
  padding: 20px;
  background: pink;
  border: 2px solid lightpink;
  border-radius: 15px;
  color: lightpink;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 18px;
  color: indianred;
`;

const WarriorContainer = Grid.extend`
  padding: 15px;
`;

const Region = ({ name, warriors }) => (
  <Wrapper column>
    <Title>{name}</Title>
    <Grid column>
      {warriors.map(warrior => (
        <WarriorContainer key={warrior.name}>
          <Warrior warrior={warrior} />
        </WarriorContainer>
      ))}
    </Grid>
  </Wrapper>
);

Region.propTypes = {
  name: PropTypes.string.isRequired,
  warriors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      pokemon: PropTypes.string,
    }),
  ),
};

Region.defaultProps = {
  warriors: [],
};

export default Region;
