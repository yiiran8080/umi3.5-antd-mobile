import { stringify } from 'qs';
import request from '@/utils/request';
import { getToken } from '../utils/authority';

export default async function commonAPI(url, method, params) {
  if (method.toLowerCase() === 'get') {
    return request(`${url}?${stringify(params)}`, {
      headers: {
        token: getToken(),
      },
    });
  }
  return request(`${url}`, {
    method: 'POST',
    data: params,
    headers: {
      token: getToken(),
    },
  });
}

