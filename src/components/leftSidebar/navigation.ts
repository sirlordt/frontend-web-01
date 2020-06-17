//import React from "react";

/*
import {
  //CSidebarNavDivider,
  //CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle
} from "@coreui/react";
*/

/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

import i18n from "../../config/i18n.config";

/*
export default [
  {
    _tag: CSidebarNavTitle,
    _children: [ i18n.t( "Business" ) ]
  },
  {
    _tag: CSidebarNavItem,
    name: "Update Tips",
    to: "/home/update/tips/uber",
    icon: "cil-pencil"
  }
];
*/

const navigationEntries: any = [

  {

    key: "613F54",
    kind: "title",
    to: "",
    label: i18n.t( "Business" ),
    backendActions: [],
    icon: "",

    entries: [

      {

        key: "D08FB8",
        kind: "action",
        to: "/home/update/tips/uber",
        label: i18n.t( "Update Tips Uber" ),
        backendActions: [
                          "v1.business.dev001.odin.establishment",
                          "v1.business.dev001.odin.order.tip.uber.job",
                          "v1.business.dev001.odin.order.tip.uber.output"
                        ],
        icon: [ "far", "edit" ],

      },

      {

        key: "558FEE",
        kind: "action",
        to: "/home/test01",
        label: i18n.t( "Test 01" ),
        backendActions: [],
        icon: "times"

      },

      {

        key: "A5A588",
        kind: "action",
        to: "/home/test02",
        label: i18n.t( "Test 02" ),
        backendActions: [],
        icon: "times"

      },

    ]

  },
  {

    key: "B78D72",
    kind: "title",
    to: "",
    label: i18n.t( "System" ),
    backendActions: [],
    icon: "",

    entries: [

      {

        key: "924649",
        kind: "action",
        to: "/home/test01",
        label: i18n.t( "Test 01" ),
        backendActions: [],
        icon: "pencil-alt"

      },

      {

        key: "38796C",
        kind: "action",
        to: "/home/test02",
        label: i18n.t( "Test 02" ),
        backendActions: [],
        icon: "pencil-alt"

      },

    ]

  },

]

export default navigationEntries;

/*
{
    _tag: CSidebarNavItem,
    name: "Test02",
    to: "/home/test02",
    icon: "cil-pencil"
  },
  {
    _tag: CSidebarNavTitle,
    _children: [ i18n.t( "System" ) ]
  },
  {
    _tag: CSidebarNavItem,
    name: "Test01",
    to: "/home/test01",
    icon: "cil-drop"
  },
  {
    _tag: CSidebarNavItem,
    name: "Test02",
    to: "/home/test02",
    icon: "cil-pencil"
  }
*/
