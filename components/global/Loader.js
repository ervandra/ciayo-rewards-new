/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { getDeepObject } from '../../lib/utils';
import { UserContext } from './UserContext';

const Loader = () => {
  const context = useContext(UserContext);
  const themeColor = {
    color: getDeepObject(['response', 'season', 'font_color'], context.config),
    backgroundColor: getDeepObject(
      ['response', 'season', 'color'],
      context.config
    ),
  };

  return (
    <div className="loader-container">
      <div className="vloader">
        <span
          className="ci ci-loader ci-spin"
          style={{ color: themeColor.backgroundColor }}
        />
      </div>
    </div>
  );
};

export default Loader;
