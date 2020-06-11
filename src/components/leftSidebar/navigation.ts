//import React from "react";

import {
  //CSidebarNavDivider,
  //CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle
} from "@coreui/react";

/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

import i18n from "../../config/i18n.config";

export default [
  {
    _tag: CSidebarNavTitle,
    _children: [ i18n.t( "Business" ) ]
  },
  {
    _tag: CSidebarNavItem,
    name: "Update Tips",
    to: "/home/update/tips",
    icon: "cil-pencil"
  }
];

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
