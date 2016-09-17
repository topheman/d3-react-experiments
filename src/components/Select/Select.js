/* eslint-disable react/no-multi-comp */

import React from 'react';
import ReactSelect from 'react-select';
import ColorHash from 'color-hash';

const colorHash = new ColorHash();

const valueRenderer = (option) => <span style={{
  backgroundColor: colorHash.hex(option.value),
  color: 'white',
  fontSize: '14px',
  padding: '5px'
}}>{option.label}</span>;

/**
 * Works just like react-select
 * You can pass as props colorLabel = true to have deterministic colored labels (using color-hash)
 */
export const Select = ({ colorLabel = true, ...props }) => {
  let nextProps;
  if (colorLabel) {
    nextProps = {
      ...props,
      className: 'color-label',
      valueRenderer
    };
  }
  else {
    nextProps = {...props};
  }
  return (
    <ReactSelect {...nextProps}/>
  );
};
