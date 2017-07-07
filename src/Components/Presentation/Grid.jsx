import styled from 'styled-components';

// not finalized, responsive design still to be decided on
const breakpoints = {
  xs: '960px',
  sm: '1024px',
  md: '1200px',
  lg: '1280px',
  xl: '1920px',
};

function sizeIt(size, width) {
  if (!width && (size >= 1 && size <= 12)) {
    return `flex-basis: ${Math.round((size / 12) * (10 ** 6)) / (10 ** 4)}%;`;
  }

  if (width) {
    return `min-width: ${width};`;
  }

  return '';
}

function mediaQuery(breakpoint, size, width) {
  return `
    @media (min-width:${breakpoints[breakpoint]}) {
      ${sizeIt(size, width)}
    }
  `;
}

const Grid = styled.div.withConfig({
  displayName: 'Grid',
})`
  /* universal styling */
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex: 0 0 auto;

  /* is this a container or an item? */
  flex-direction: ${props => (props.direction === 'row' && props.column ? 'column' : props.direction)};

  /* does this item have an exact width, or should it be flexible? */
  flex-basis: ${props => (props.width ? props.width : 'auto')};
  flex-grow: ${props => (props.width || props.shrink ? 0 : 1)};

  /* should this item shrink to fit its contents? */
  flex-shrink: ${props => (props.shrink ? 1 : 0)};

  /* should the items in this container wrap? (doesn't change items) */
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};

  /* allow for other flex properties */
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};

  /* sizing for responsive grids */
  ${({ xs, width }) => sizeIt(xs, width)}
  ${({ sm, width }) => mediaQuery('xs', sm, width)}
  ${({ md, width }) => mediaQuery('md', md, width)}
  ${({ lg, width }) => mediaQuery('lg', lg, width)}
  ${({ xl, width }) => mediaQuery('xl', xl, width)}
`;

Grid.defaultProps = {
  row: false,
  column: false,
  wrap: false,
  shrink: false,
  align: 'stretch',
  direction: 'row',
  justify: 'flex-start',
};

export default Grid;
