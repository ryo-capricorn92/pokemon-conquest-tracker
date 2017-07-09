import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { prettyPrint } from '../../utils';
import warriors from '../../Data/warriors.json';

import Grid from './Grid';

const AddWarrior = ({ updateRegion }) => {
  const addWarrior = (e) => {
    e.preventDefault();
    console.log(e.target.warrior.value);
    const newRegion = 'aurora';
    // updateRegion(newRegion);

    return false;
  };

  return (
    <form action="#" onSubmit={addWarrior}>
      <label htmlFor="warrior">Add A Warrior</label>
      <input list="warriors" name="warrior" />
      <datalist id="warriors">
        {Object.keys(warriors).map(warrior => (
          <option value={prettyPrint(warrior)} key={warrior} />
        ))}
      </datalist>
      <input type="submit" />
    </form>
  );
};

AddWarrior.propTypes = {
  updateRegion: PropTypes.func.isRequired,
};

export default AddWarrior;
