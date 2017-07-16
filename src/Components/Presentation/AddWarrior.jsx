import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';
import warriors from '../../Data/warriors.json';

import Grid from './Grid';

const Form = Grid.withComponent('form').extend`
  margin: 20px;
  text-align: center;

  & > * > * {
    margin: 10px;
  }
`;

const MainLabel = Grid.withComponent('h1').extend`
  font-size: 18px;
  font-family: verdana;
  color: #666;
`;

const Input = styled.input`
  margin: 5px;
  background-color: #fafafa;
  border: 1px solid #dadada;
  border-radius: 5px;
`;

const Submit = styled.input`
  width: 200px;
  background-color: #dadada;
  border: 1px solid #888;
  border-radius: 5px;
`;

const AddWarrior = ({ ransei, updateRegion }) => {
  const addWarrior = (e) => {
    e.preventDefault();
    const warrior = e.target.warrior.value.trim().toLowerCase();
    const region = e.target.region.value.trim().toLowerCase();
    e.target.warrior.value = '';
    e.target.region.value = '';
    const newWarriors = ransei[region].warriors.slice();
    newWarriors.push(Object.assign({
      name: warrior,
    }, warriors[warrior]));
    updateRegion(region, newWarriors);

    return false;
  };

  const unobtainedWarriors = () => {
    const ownedWarriors = Object.keys(ransei).reduce((prev, region) => (
      [...prev, ...ransei[region].warriors.map(warrior => warrior.name)]
    ), []);
    return ownedWarriors.reduce((prev, warrior) => (
      prev.filter(owned => owned !== warrior)
    ), Object.keys(warriors));
  };

  return (
    <Form action="#" onSubmit={addWarrior} justify="center">
      <Grid column>
        <MainLabel htmlFor="warrior" justify="center">Add A Warrior</MainLabel>
        <Grid row justify="center">
          <Grid column>
            <label htmlFor="warrior">Warrior</label>
            <Input list="warriors" name="warrior" />
            <datalist id="warriors">
              {unobtainedWarriors().map(warrior => (
                <option value={prettyPrint(warrior)} key={warrior} />
              ))}
            </datalist>
          </Grid>
          <Grid column>
            <label htmlFor="region">Region</label>
            <Input list="regions" name="region" />
            <datalist id="regions">
              {Object.keys(ransei).map(region => (
                <option value={prettyPrint(region)} key={region} />
              ))}
            </datalist>
          </Grid>
        </Grid>
        <Grid row justify="center">
          <Submit type="submit" />
        </Grid>
      </Grid>
    </Form>
  );
};

AddWarrior.propTypes = {
  ransei: PropTypes.shape().isRequired,
  updateRegion: PropTypes.func.isRequired,
};

export default AddWarrior;
