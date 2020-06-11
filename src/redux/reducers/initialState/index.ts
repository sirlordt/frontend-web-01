
const initialState: any = {

  backend: {

    active: "local01",

    servers: {

      local01: {

        icon: "server",
        name: "Local 01",
        protocol: "http://",
        host: "127.0.0.1",
        port: 9090,
        rootPath: "/backend-server-01"

      },

      test01: {

        icon: "server",
        name: "Test 01",
        protocol: "https://",
        host: "test01.odindt.com",
        port: 443,
        rootPath: "/kk/api"

      },

      production01: {

        icon: "server",
        name: "Production 01",
        protocol: "https://",
        host: "odindt.com",
        port: 443,
        rootPath: "/kk/api"

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

    id: "ccc1",
    language: "en_US",
    timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,

    themeDark: false,
    isLeftSidebarOpen: "responsive",
    isLeftSidebarMinimized: true,
    sidebarMobile: false,
    sidebarDisplay: "sm",
    isRightSidebarOpen: false,

    results: {},

    modalStack: new Map(),

    userActions: {}

  }

};

export default initialState;
