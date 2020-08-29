import information from "../../../info.json";
//import LoggerManager from "../../../utils/loggerManager";

//LoggerManager.markLog( "5F68985B9F17", process.env.REACT_APP_SCRIPT );
//console.log( process.env.REACT_APP_SCRIPT );

const initialState: any = {

  backend: {

    active: process.env.REACT_APP_SCRIPT === "production01" ? "production01": "test01",
    //active: "production01",

    servers: {

      local01: {

        icon: "server",
        code: "local01",
        name: "Local 01",
        url: [ "http://127.0.0.1:9090/backend-server-01/domain/api" ]

      },

      test01: {

        icon: "server",
        code: "test01",
        name: "Test 01",
        url: [ "https://www.weknock-tech.com/test01/odin-v1/kk/fl/miami/api" ]

      },

      production01: {

        icon: "server",
        code: "production01",
        name: "Production 01",
        url: [ "https://www.webnock-tech.com/prod01/odin-v1/kk/fl/miami/api" ]

      }

    },

    results: {}

  },

  authentication: {

    active: "",
    lastCheck: "",
    accounts: {},

    results: {}

    /* Example
    results: {

      "cc160855-d192-40ee-80be-9406a181752d": {
        actionType: "LOGIN_SUCCESS",
        responseMark: "7b94c856-0c5d-4f58-b497-3ca4b5218b15"
        data: {
          ... json data from backend
        }
      }
      "bc45ddcc-245b-4ce5-8be3-52cfcd80f0b9": {
        actionType: "LOGIN_FAILED",
        responseMark: "4c4c4435-f881-40c8-8db0-fa2d64b8472d",
        data: {
          ... json data from backend
        }
      }

    }
    */

  },

  frontend: {

    info: information,
    id: "ccc1",
    language: "en_US",
    timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,

    themeDark: false,
    isLeftSidebarOpen: "responsive",
    isLeftSidebarMinimized: false,
    sidebarMobile: false,
    sidebarDisplay: "sm",
    isRightSidebarOpen: false,

    results: {},

    modalStack: new Map(),

    userActions: {}

  }

};

export default initialState;
