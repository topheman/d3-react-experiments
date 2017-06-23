/* eslint-disable react/no-multi-comp */

import React from 'react';

import { Select as OriginalSelect } from './Select.js';

import ColorHash from 'color-hash';

const colorHash = new ColorHash();

const valueRenderer = (option) => (<span style={{
  backgroundColor: colorHash.hex(option.value),
  color: 'white',
  fontSize: '14px',
  padding: '5px'
}}
>&times; {option.label}</span>);

/**
 * Works just like react-select
 * You can pass as props colorLabel = true to have deterministic colored labels (using color-hash)
 */
export const ColoredMultiSelect = (props) => <OriginalSelect {...props} className="color-label" valueRenderer={valueRenderer} multi />;
