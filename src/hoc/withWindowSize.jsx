import React from 'react';
import useWindowSize from '../hooks/useWindowSize';

export const withWindowSize = ( Component ) => {

  return ( props ) => {

    const windowSize = useWindowSize();

    return <Component windowSize={ windowSize } { ...props } />;

  };

};
