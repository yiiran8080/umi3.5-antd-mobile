import request from '@/utils/request';
import { getToken } from '@/utils/authority';

export async function queryAuthority() {
  return request('/user/queryAuthority', {
    headers: {
      token: getToken(),
    },
  });
}
