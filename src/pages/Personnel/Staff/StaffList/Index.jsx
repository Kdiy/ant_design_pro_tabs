import React from 'react'
import {Card, Input, Tabs} from "antd";
import {connect} from 'dva'

const { TabPane } = Tabs
class Index extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      active: 'a0'
    }
  }
  componentDidMount() {

  }

  render() {
    return(
      <Card>
        <span>员工管理</span>
        <Input type="number" placeholder="asdsa"/>
        <Tabs activeKey={this.state.active} onTabClick={e=>this.setState({active:e})}>
          <TabPane key="a0" tab="test0"><Input placeholder="12312" /></TabPane>
          <TabPane key="a1" tab="test1"><Input placeholder="213123213"/></TabPane>
        </Tabs>
      </Card>
    )
  }
}
export default connect(({global})=>({global}))(Index)
