import React from 'react'
import Loadable from "react-loadable";
import Authorized from "@/components/Authorized/Authorized";
const Loading = () => (<span>Loading...</span>);

const Welcome = Loadable({loader: () => import('../pages/Personnel/Staff/StaffList'), loading: Loading});
const Test = Loadable({loader: () => import('../pages/Personnel/Department/DepartmentList'), loading: Loading});
const Init = Loadable({loader: () => import('../pages/Welcome'), loading: Loading, delay: 0});

export const _getTabsComponent = (key)=> {
  switch (key){
    case '/personnel/staffList':
      return <Welcome />
    case '/personnel/departmentList':
      return <Test />
    default:
      return <Init />
  }

}

export const getTabsComponent = (key,authority,noMatch)=> {
  return (
    <Authorized authority={authority} noMatch={noMatch}>
      { _getTabsComponent(key)}
     </Authorized>
  )
}
