export interface UserInfo {
  isLogin: boolean; // 是否登录
  isAuthorized: boolean; // 是否授权
}

export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    updateUserInfo (state: any, payload: any) {
      state.userInfo = payload;
    }
  },
  actions: {
    getUserInfo({ commit }: any, payload: any) {
      commit('USERINFO', payload);
    }
  }
};