
const fs = require( "fs" );

const moment = require( "moment-timezone" );

console.log( "Generating release..." );

//console.log( process.env.REACT_APP_REACT_SCRIPT );

fs.readFile( "src/info.json", function( error, content ) {

  if ( !error ) {;

    const info = JSON.parse( content );

    info.reactScript = process.env.REACT_APP_REACT_SCRIPT;
    info.release = moment().format();

    fs.writeFile( "src/info.json", JSON.stringify( info, null, 2 ), function( error ) {

      if ( !error ) {

        console.log( "Current release: " + info.release );

      }
      else {

        throw error;

      }

    });

  }
  else {

    throw error;

  }

});
