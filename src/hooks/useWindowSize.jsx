import { useState, useEffect } from "react";

//👇
//a Util function that will conver the absolute width into breakpoints
function getBreakPoint( windowWidth ) {

  if ( windowWidth ) {

    if ( windowWidth < 480) {

      return "sm";

    }
    else if ( windowWidth < 1024 ) {

      return "md";

    }
    else if ( windowWidth < 1200 ) {

      return "lg";

    }
    else {

      return "xl";

    }

  }
  else {

    return undefined;

  }

}
//☝️

function useWindowSize() {

  const isWindowClient = typeof window === "object";

  const [ windowSize, setWindowSize ] = useState( isWindowClient ? getBreakPoint( window.innerWidth ): undefined );

  useEffect(() => {

    //a handler which will be called on change of the screen resize
    function setSize() {

      setWindowSize( getBreakPoint( window.innerWidth ) );

    }

    if ( isWindowClient ) {

      //register the window resize listener
      window.addEventListener( "resize", setSize );

      //unregister the listerner on destroy of the hook
      return () => window.removeEventListener( "resize", setSize );

    }

  }, [ isWindowClient, setWindowSize ] );

  return windowSize;

}

export default useWindowSize;
