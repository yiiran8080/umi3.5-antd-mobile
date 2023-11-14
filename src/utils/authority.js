import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.
import { Modal } from 'antd-mobile';
import { pathToRegexp } from 'path-to-regexp';
export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathToRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export function getAuthority(str) {
  if (!navigator.cookieEnabled) {
    Modal.error({
      title: 'error',
      content: '检测到浏览器cookies功能被禁用，需要重启cookies功能，否则将会影响页面使用',
    });
    return false;
  }
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('user-authority-list')
      : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority) {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('user-authority-list', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}
export function setLocalStorage(name, val) {
  localStorage.setItem(name, val);
}

export function removeLocalStorage(name) {
  localStorage.removeItem(name);
}

export function getLocalStorage(name) {
  return localStorage.getItem(name);
}

//设置cookie
export function setCookie(cname, cvalue, exHours) {
  let exHoursV = exHours ? exHours : 1;
  let d = new Date();
  d.setTime(d.getTime() + exHoursV * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
//读取cookie
export function getCookies(cname) {
  let arr,
    reg = new RegExp('(^| )' + cname + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
export function removeCookies(cname) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookies(cname);
  if (cval != null) document.cookie = cname + '=' + cval + ';expires=' + exp.toGMTString();
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}

export function removeToken() {
  return localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
