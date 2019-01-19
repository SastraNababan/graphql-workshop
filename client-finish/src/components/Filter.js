import React, { Fragment } from 'react';

const Filter = ({ onFilterChange, selected }) => (
  <Fragment>
    <p style={styles.show}>Show:</p>
    <select
      value={selected}
      style={styles.select}
      onChange={({ target: { value } }) => {
        onFilterChange(value);
      }}
    >
      <option value="POPULARITY">Popular Movies</option>
      <option value="RELEASE_DATE">New Movies</option>
      <option value="LIKES">Liked Movies</option>
    </select>
  </Fragment>
);

const styles = {
  show: {
    display: 'inline',
  },
  select: {
    marginBottom: 9,
  },
};

export default Filter;
