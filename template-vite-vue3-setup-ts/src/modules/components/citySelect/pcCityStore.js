export default {
  namespaced: true,
  state: () => {
    return {
      //当前菜单，地域权限标志
      pageIsAreaLimit: "0",
      userSelectChlInfo: {},
      defaultSelectChlInfo: {
        // type1:{chlId:1,chlName:"成都"}
      }
    };
  },
  mutations: {
    setPageIsAreaLimit(state, payload) {
      state.pageIsAreaLimit = payload;
    },
    //用户选中区域，， 缓存数据，已暂停使用
    setSelectChlInfo(state, payload) {
      state.userSelectChlInfo[state.pageIsAreaLimit] = payload;
      state.userSelectChlInfo = Object.assign({}, state.userSelectChlInfo);
    },
    //用户默认选中区域，第一个区域。
    setDefaultSelectChlInfo(state, payload) {
      state.defaultSelectChlInfo[payload.pageIsAreaLimit] = payload.item;
      state.defaultSelectChlInfo = Object.assign(
        {},
        state.defaultSelectChlInfo
      );
      if (!Object.keys(state.userSelectChlInfo).length) {
        state.userSelectChlInfo = Object.assign({}, state.defaultSelectChlInfo);
      }
    }
  },
  getters: {
    getSelectChlInfo(state) {
      const pageIsAreaLimit = state.pageIsAreaLimit;
      const userSelectChlInfo = state.userSelectChlInfo;
      return userSelectChlInfo[pageIsAreaLimit] || {};
    },
    getDefaultSelectChlInfo(state) {
      const defaultSelectChlInfo = state.defaultSelectChlInfo;
      return defaultSelectChlInfo[state.pageIsAreaLimit] || {};
    }
  },
  actions: {}
};
