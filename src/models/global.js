import { queryNotices } from '@/services/user';
import {getMenuJSON} from "@/locales";
import {array_del, array_search, in_array} from "@/utils/function_inc";

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    historyRoute: [],
    activeTabs: ''
  },
  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clickTabs({ payload }, { put }){
      yield put({
        type: 'saveActiveTabs',
        payload: payload.path
      })
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *effectHistory({payload},{put,select}){
      const homeAlias = '/dashboard'

      const history = yield select(state=>state.global.historyRoute)
      const location = payload.location
      if(location.pathname == '/'){
        location.pathname = homeAlias
      }
      const path = location.pathname
      const replacePath = 'menu' + path.replace(/\//g, '.')
      const localData = getMenuJSON();
      // 初始化把控制台放在第一位
      if(!in_array(history,'pathname',homeAlias)){
        const homeTitle = 'menu' + homeAlias.replace(/\//g, '.')
        yield put({
          type: 'firstTabs',
          payload: {
            path: homeAlias,
            route: {
              hash: "",
              key: "000001",
              pathname: homeAlias,
              query: {},
              search: "",
              state: {},
              title: localData[homeTitle],
            }
          }
        })
      }
      // 如果存在,就切换到当前选项卡
      if(in_array(history,'pathname',path)){
        return yield put({
          type: 'saveActiveTabs',
          payload: path
        })
      }

      // 拉取i18配置的菜单名
      location.title = localData[replacePath]
      yield put({
        type: 'addHistory',
        payload: {
          key: path,
          route: location
        }
      })
    },
    *removeHistory({ payload }, { put, select }){
      let history = yield select(state=>state.global.historyRoute)
      const _history = [...history]
      const t_history = array_del(_history,'pathname',payload.path)
      yield put({
        type: 'saveHistory',
        payload: {
          history: t_history
        }
      })
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    // 添加新选项卡
    addHistory(state,{ payload}){
      const {key, route} = payload
      state.historyRoute.push({ukey:key,...route})
      return {...state,activeTabs:key}
    },
    // 删除选项卡
    saveHistory(state, {payload}){
      const history = payload.history
      const activeTabs = history[history.length-1]['pathname']
      return {...state,historyRoute:payload.history,activeTabs}
    },
    // 初始化时加载控制台在第一位
    firstTabs(state, {payload}){
      const {key, route} = payload
      state.historyRoute.unshift({ukey:key,...route})
      return {...state}
    },
    // 设置活动的tabs key
    saveActiveTabs(state, { payload }){
      state.activeTabs = payload
      return state
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    // 重置所有tabs
    resetTabs( state){
      state.historyRoute = []
      return {...state}
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {

      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        dispatch({
          type: 'effectHistory',
          payload: history
        })
      });
    },
  },
};
export default GlobalModel;
