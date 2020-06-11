import React from "react";

//const Test01 = React.lazy( () => import( "./pages/views/test01" ) );
//const Test02 = React.lazy( () => import( "./pages/views/test02" ) );

const UpdateTips = React.lazy( () => import( "./pages/views/updateTips" ) );

const routes = [

  {
    path: "/home", exact: true, name: "Home"
  },
  {
    path: "/home/update/tips", name: "Update Tips", component: UpdateTips
  }

];

/*
  {
    path: "/home/test01", name: "Test01", component: Test01
  },
  {
    path: "/home/test02", name: "Test02", component: Test02
  }

*/

export default routes;
