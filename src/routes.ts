import React from "react";


const UpdateTips = React.lazy( () => import( "./pages/views/updateTipsUber" ) );

const Test01 = React.lazy( () => import( "./pages/views/test01" ) );
const Test02 = React.lazy( () => import( "./pages/views/test02" ) );

const routes = [

  {
    path: "/home", exact: true, name: "Home"
  },
  {
    path: "/home/update/tips/uber", name: "Update Tips Uber", component: UpdateTips
  },
  {
    path: "/home/test01", name: "Test01", component: Test01
  },
  {
    path: "/home/test02", name: "Test02", component: Test02
  }

];

const _DEFAULT_ROUTE = "/home/update/tips/uber";

/*
  {
    path: "/home/test01", name: "Test01", component: Test01
  },
  {
    path: "/home/test02", name: "Test02", component: Test02
  }

*/

export { routes, _DEFAULT_ROUTE };
