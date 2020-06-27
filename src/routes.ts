import React from "react";

const OrderTipUberUpdate = React.lazy( () => import( "./pages/views/orderTipUberUpdate" ) );
const BulkOrderCreate = React.lazy( () => import( "./pages/views/bulkOrderCreate" ) );

const Test01 = React.lazy( () => import( "./pages/views/test01" ) );
const Test02 = React.lazy( () => import( "./pages/views/test02" ) );

const routes = [

  {
    path: "/home", exact: true, name: "Home"
  },
  {
    path: "/home/odinv1/order/tip/uber/update", name: "Order tip Uber update", component: OrderTipUberUpdate
  },
  {
    path: "/home/odinv1/bulk/order/create", name: "Bulk order create", component: BulkOrderCreate
  },
  {
    path: "/home/test01", name: "Test01", component: Test01
  },
  {
    path: "/home/test02", name: "Test02", component: Test02
  }

];

const _DEFAULT_ROUTE = "/home/order/tip/uber/update";

/*
  {
    path: "/home/test01", name: "Test01", component: Test01
  },
  {
    path: "/home/test02", name: "Test02", component: Test02
  }

*/

export { routes, _DEFAULT_ROUTE };
