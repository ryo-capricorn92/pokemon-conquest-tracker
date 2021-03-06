import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from './Grid';

import pokemon from '../../Data/pokemon.json';
import { prettyPrint } from '../../utils';

const Wrapper = Grid.extend.withConfig({
  displayName: 'Wrapper',
})`
  position: relative;
  padding: 10px;
  background: ${({ selected }) => selected ? '#b7cacc' : '#e9e9e9'};
  border: 1px solid ${({ selected }) => selected ? '#438387' : '#999'};
  border-radius: 5px;
  color: #888;
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  z-index: 5;
  padding: 15px;
  left: -32px;
  top: 210px;
  background: #fff;
  box-shadow: 0 1px 5px #666;
  width: 350px;

  ${Wrapper}:hover & {
    display: block;
  }
`;

const InnerTooltip = styled.div`
  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

const Avatar = Grid.extend`
  padding: 5px;
  background: #bbb;
  border: 1px solid darkgray;
  border-radius: 3px;
  cursor: pointer;
`;

const Name = Grid.extend`
  font-size: 16px;
  padding: 5px;
`;

const SubTitle = Grid.withComponent('h3').extend`
  font-size: 14px;
  padding: 3px;
  font-weight: 500;
  justify-content: center;
`;

const PokeBackground = ({ perfect, perfectCanBeFound }) => {
  if (perfect) {
    return '#b7ccb7';
  }

  if (perfectCanBeFound) {
    return 'linear-gradient(to right, #b7ccb7 , #ccb7b7)';
  }

  return '#ccb7b7';
};

const CurrentPokemon = Grid.extend`
  margin-left: 5px;
  padding: 5px;
  background: ${PokeBackground};
  border: 1px solid ${({ perfect }) => perfect ? 'green' : 'darkred'};
  border-radius: 3px;
  cursor: pointer;
`;

const PerfectLink = Grid.extend`
  margin: 5px;
  padding: 5px;
  background: ${({ isHere }) => isHere ? '#b7ccb7' : '#ddd'};
  border: 1px solid ${({ isHere }) => isHere ? 'green' : 'darkgray'};
  border-radius: 3px;
`;

const CloseButton = styled.button`
  margin: 5px;
  background: transparent;
  border: none;
  color: darkred;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  margin: 5px;
  background-color: #fafafa;
  border: 1px solid #dadada;
  border-radius: 5px;
`;

const inThisRegion = (perfects, warrior, region) => {
  const perfArray = Array.isArray(perfects) ? perfects : [perfects];

  return perfArray.reduce((canBeFound, poke) => {
    if (!warrior.perfectLinks.includes(warrior.current) && pokemon[poke].region.includes(region)) {
      return true;
    }

    return canBeFound;
  }, false);
};

const hasPerfectPokemon = (current, perfects) => perfects.includes(current);

const isSelected = (warrior, selected) => warrior === selected;

const listPerfectRegions = perfects => Object.keys(perfects.reduce((regions, poke) => {
  pokemon[poke].region.forEach(region => regions[region] = true);
  return regions;
}, {}));

class Warrior extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPokeChange: false,
    };

    this.triggerPokemonChange = this.triggerPokemonChange.bind(this);
    this.removePokemonChange = this.removePokemonChange.bind(this);
    this.changePokemon = this.changePokemon.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.selectThisWarrior = this.selectThisWarrior.bind(this);
  }

  componentDidMount() {
    if (this.state.showPokeChange) {
      this.pokeInput.focus();
    }
  }

  triggerPokemonChange() {
    this.setState({
      showPokeChange: true,
    });
  }

  removePokemonChange() {
    this.setState({
      showPokeChange: false,
    });
  }

  changePokemon(e) {
    e.preventDefault();
    const newCurrent = e.target.pokemon.value.trim().toLowerCase();
    e.target.pokemon.value = '';
    const i = this.props.warriors.indexOf(this.props.warrior);
    this.props.warriors[i].current = newCurrent;
    this.setState({
      showPokeChange: false,
    });

    this.props.updateRegion(this.props.region, this.props.warriors);
  }

  deletePokemon(e) {
    e.preventDefault();
    const i = this.props.warriors.indexOf(this.props.warrior);
    const newWarriors = this.props.warriors.slice();
    newWarriors.splice(i, 1);
    this.props.updateRegion(this.props.region, newWarriors);
  }

  selectThisWarrior() {
    this.props.selectWarrior(this.props.warrior, this.props.region);
  }

  render() {
    const { selected, warrior, region } = this.props;
    return (
      <Wrapper column selected={isSelected(warrior, selected)}>
        <Grid row>
          <Avatar width="145px" justify="center" onClick={this.selectThisWarrior}>
            <img src={warrior.icon} alt="name" />
          </Avatar>
          {/* <Grid column shrink style={{ minWidth: 0 }}>
            <AddPokemon align="flex-end" justify="flex-end" row active={this.state.showPokeChange}>
              <form action="#" onSubmit={this.changePokemon}>
                <Input
                  list="pokemans"
                  name="pokemon"
                  onBlur={this.removePokemonChange}
                  innerRef={(input) => { this.pokeInput = input; }}
                />
                <datalist id="pokemans">
                  {Object.keys(pokemon).map(poke => (
                    <option value={prettyPrint(poke)} key={poke} />
                  ))}
                </datalist>
                <input type="submit" style={{ display: 'none' }} />
              </form>
            </AddPokemon>
            <CloseButton onClick={this.deletePokemon} shrink>
              <i className="fa fa-close fa-2x" aria-hidden="true" />
            </CloseButton>
            <Grid align="flex-end" justify="flex-end" row>
              <CloseButton onClick={this.deletePokemon} shrink>
                <i className="fa fa-close fa-2x" aria-hidden="true" />
              </CloseButton>
              {warrior.perfectLinks.map(poke => (
                <PerfectLink key={poke} isHere={inThisRegion(poke, warrior, region)} shrink>
                  <img src={pokemon[poke].icon} alt={poke} width="45px" height="45px" />
                </PerfectLink>
              ))}
            </Grid>
          </Grid>
          */}
          { this.state.showPokeChange ? (
            <Grid align="center" justify="center" row>
              <form action="#" onSubmit={this.changePokemon}>
                <Input
                  list="pokemans"
                  name="pokemon"
                  onBlur={this.removePokemonChange}
                  innerRef={(input) => { this.pokeInput = input; }}
                  autoFocus
                />
                <datalist id="pokemans">
                  {Object.keys(pokemon).map(poke => (
                    <option value={prettyPrint(poke)} key={poke} />
                  ))}
                </datalist>
                <input type="submit" style={{ display: 'none' }} />
              </form>
            </Grid>
          ) : (
            <CurrentPokemon
              width="145px"
              justify="center"
              align="center"
              perfect={hasPerfectPokemon(warrior.current, warrior.perfectLinks)}
              perfectCanBeFound={inThisRegion(warrior.perfectLinks, warrior, region)}
              onClick={this.triggerPokemonChange}
            >
              {warrior.current ? (
                <img src={pokemon[warrior.current].icon} alt={warrior.current} />
              ) : (
                <i className="fa fa-gitlab fa-4x" aria-hidden="true" />
              )}
            </CurrentPokemon>
          ) }
        </Grid>
        <Grid row>
          <Name align="center">{ prettyPrint(warrior.name) }</Name>
          <CloseButton onClick={this.deletePokemon} shrink>
            <i className="fa fa-close fa-2x" aria-hidden="true" />
          </CloseButton>
        </Grid>
        <Tooltip>
          <InnerTooltip>
            <Name justify="center">{ prettyPrint(warrior.name) }</Name>
            <Grid row>
              <Grid column>
                <SubTitle shrink>Perfect Regions</SubTitle>
                { listPerfectRegions(warrior.perfectLinks).map(region => (
                  <div style={{ textAlign: 'center' }} key={region}>{prettyPrint(region)}</div>
                  )) }
              </Grid>
              <Grid column style={{ maxWidth: '50%' }}>
                <SubTitle>Perfect Links</SubTitle>
                <Grid row wrap style={{ justifyContent: 'space-around' }}>
                  {warrior.perfectLinks.map(poke => (
                    <PerfectLink key={poke} isHere={inThisRegion(poke, warrior, region)} shrink>
                      <img src={pokemon[poke].icon} alt={poke} width="45px" height="45px" />
                    </PerfectLink>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </InnerTooltip>
        </Tooltip>
      </Wrapper>
    );
  }
}

Warrior.propTypes = {
  region: PropTypes.string.isRequired,
  selected: PropTypes.shape(),
  selectWarrior: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  warrior: PropTypes.shape().isRequired,
  warriors: PropTypes.arrayOf(PropTypes.shape()),
};

Warrior.defaultProps = {
  selected: null,
  warriors: [],
};

export default Warrior;
