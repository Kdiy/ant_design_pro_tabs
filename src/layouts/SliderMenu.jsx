import React from 'react'
import { Tabs} from "antd";
const { TabPane } = Tabs
import { connect } from 'dva';
import router from "umi/router";
import {getTabsComponent} from "@/utils/load";

class SliderMenu extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    const props = this.props
    const activeKey = props.activeTabs
    const removeTabs = (path) =>{
      props.dispatch({
        type: 'global/removeHistory',
        payload: {
          path
        }
      })
    }
    const changeTabs = (path)=>{
      router.push(path)
      props.dispatch({
        type: 'global/clickTabs',
        payload: {
          path
        }
      })
    }

    return(
      <Tabs
        hideAdd
        activeKey={activeKey}
        type="editable-card"
        onEdit={removeTabs}
        onTabClick={changeTabs}
      >
        {props.historyRoute.map(item=>(
          <TabPane key={item.pathname} tab={item.title} >
            {getTabsComponent(item.pathname,props.authority,props.noMatch)}
          </TabPane>
        ))}

      </Tabs>
    )
  }

}


export default connect(({ global,state })=>(
  {
    ...global,state
  }
))(SliderMenu)
