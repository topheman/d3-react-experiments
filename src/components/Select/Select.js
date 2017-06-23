/* eslint-disable react/no-multi-comp */

import React from 'react';
import ReactSelect from 'react-select';

/**
 * Works just like react-select
 * You can pass as props colorLabel = true to have deterministic colored labels (using color-hash)
 */
export const Select = (props) => <ReactSelect {...props} />;
