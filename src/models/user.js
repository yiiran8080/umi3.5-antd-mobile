import { queryAuthority } from '@/services/user';
import { setAuthority } from '@/utils/authority';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    authorityData: {
      data: [],
    },
  },
  effects: {
    *fetchAuthority({ payload, callback }, { call, put }) {
      const response = yield call(queryAuthority);
      yield put({
        type: 'saveAuthority',
        payload: response,
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    saveAuthority(state, action) {
      let response = action.payload;
      if (response && response.status === 0) {
      } else {
        response = {};
        response.data = [];
      }
      return {
        ...state,
        authorityData: response,
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
  subscriptions: {
    renderAuthChange({ dispatch, history }) {
      window.addEventListener('authchange', (e) => {
        dispatch({
          type: 'fetchAuthority',
          callback: (res) => {
            if (res.status == 0) {
              let authority = res.data.auths;
              setAuthority(authority);
              window.location.reload();
            }
          },
        });
      });
    },
  },
};
export default UserModel;
