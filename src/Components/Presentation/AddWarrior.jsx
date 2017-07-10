import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';
import warriors from '../../Data/warriors.json';

import Grid from './Grid';

const AddWarrior = ({ ransei, updateRegion }) => {
  const addWarrior = (e) => {
    e.preventDefault();
    console.log(e.target.warrior.value);
    const newRegion = 'aurora';
    // updateRegion(newRegion);

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
    <form action="#" onSubmit={addWarrior}>
      <label htmlFor="warrior">Add A Warrior</label>
      <input list="warriors" name="warrior" />
      <datalist id="warriors">
        {unobtainedWarriors().map(warrior => (
          <option value={prettyPrint(warrior)} key={warrior} />
        ))}
      </datalist>
      <input list="regions" name="region" />
      <datalist id="regions">
        {Object.keys(ransei).map(region => (
          <option value={prettyPrint(region)} key={region} />
        ))}
      </datalist>
      <input type="submit" />
    </form>
  );
};

AddWarrior.propTypes = {
  ransei: PropTypes.shape.isRequired,
  updateRegion: PropTypes.func.isRequired,
};

export default AddWarrior;
