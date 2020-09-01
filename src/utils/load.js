import React from 'react'
import Loadable from "react-loadable";
import Authorized from "@/components/Authorized/Authorized";
import config from "../../config/config";
const Loading = () => (<span>Loading...</span>);


function eachComponents(routes){
  let Object = {}
  const each = (data)=>{
    data.forEach(item=>{
      if(item.path && item.component){
        const path = item.component.replace('./','')
        Object[item.path] = Loadable({loader: () => import(`../pages/${path}.jsx`), loading: Loading,delay: 200});
      }
      if(item.routes){
        each(item.routes)
      }
    })
  }
  each(routes)
  return Object;
}
const Components = eachComponents(config.routes)


export const _getTabsComponent = (key)=> {
  const UseComponent = Components[key];
  return <UseComponent />;
}

export const getTabsComponent = (key,authority,noMatch)=> {
  return (
    <Authorized authority={authority} noMatch={noMatch}>
      { _getTabsComponent(key)}
     </Authorized>
  )
}
