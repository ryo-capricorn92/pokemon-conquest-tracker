// import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';

const Wrapper = Grid.extend`
  padding: 20px;
  background: pink;
  border: 2px solid lightpink;
  color: lightpink;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 18px;
  color: indianred;
`;

const Region = () => (
  <Wrapper column>
    <Title>name</Title>
    <Grid row>
      <Grid />
    </Grid>
  </Wrapper>
);

export default Region;
