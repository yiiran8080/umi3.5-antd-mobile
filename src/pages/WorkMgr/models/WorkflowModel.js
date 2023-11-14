import { successMessagebox, errorInfo } from '@/utils/messagebox';
import commonAPI from '@/services/api';
const nameSpace = 'WorkflowModel';
export default {
  namespace: nameSpace,
  state: {
    todoCount: 0,
  },
  effects: {
    *taskTodoQuery({ payload, callback }, { call, put }) {
      const response = yield call(commonAPI, '/xxxxxxxxx', 'GET', payload);
      if (response && response.status === 0) {
        yield put({
          type: 'saveTodoCount',
          payload: response,
        });
      } else {
        //errorInfo('查询失败，错误码:' + response.status + '，错误信息:' + response.msg);
      }
      if (callback) callback(response);
    },
   
  },
  reducers: {
   
    saveTodoCount(state, action) {
      let res = action.payload;
      let total = res.data.totalElements;
      return {
        ...state,
        todoCount: total,
      };
    },
  },
};
