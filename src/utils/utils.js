import { parse } from 'querystring';
import { pathToRegexp } from 'path-to-regexp';
import { Toast } from 'antd-mobile';
import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import defaultSettings from '../../config/defaultSettings';
const { apiPrefix, webPrefix } = defaultSettings;
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
/**
 * 从URL中解析指定的参数
 * Usage: getQueryString("http://localhost:8000/amproduct/zgEligibleMgr/zgEligibleUpdate?prodId=26","prodId")
 * */
export function getPathQueryString(strURL, paramName) {
  let paramValue = undefined;
  if (!paramName) {
    return paramValue;
  }

  if (undefined !== strURL || null !== strURL || '' !== strURL) {
    let paramString = '';
    const firstPos = ('' + strURL).indexOf('?');
    if (firstPos > 0) {
      //去除?以前的url前缀字符
      paramString = ('' + strURL).substr(firstPos);
    }
    if (paramString.startsWith('?')) {
      //去除?
      paramString = paramString.substr(1);
    }

    if (paramString.indexOf('' + paramName) < 0) {
      //没有找到对应的参数，用window.location.search代替
      let newStr = window.location.search.substr(1);
      if (newStr.indexOf('' + paramName) < 0) {
        return undefined;
      }
      paramString = newStr;
    }

    let params = paramString.split('&');

    for (let i = 0; i < params.length; i++) {
      const paramNameValue = params[i].split('=');
      const paramNameTemp = decodeURIComponent(paramNameValue[0]);
      const paramValueTemp = decodeURIComponent(paramNameValue[1]);

      if (('' + paramName).toLocaleLowerCase() == ('' + paramNameTemp).toLocaleLowerCase()) {
        return paramValueTemp;
      }
    }
    return paramValue;
  }
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathToRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const undefindVal = (val) => {
  if (val == null || val == undefind) {
    val = '';
  }
  return val;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};


export const textFormatRight = (text) => {
  if (text !== undefined && text !== null) {
    return <div style={{ textAlign: 'right' }}>{text}</div>;
  }
  return text;
};
export const moneyFormatRight = (money, precision = 2) => {
  if (money !== undefined && money !== null) {
    //let m=money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (precision == 2) {
      return (
        <div style={{ textAlign: 'right', paddingRight: '4px' }}>
          {numeral(money).format('0,0.00')}
        </div>
      );
    } else if (precision == 4) {
      return (
        <div style={{ textAlign: 'right', paddingRight: '4px' }}>
          {numeral(money).format('0,0.0000')}
        </div>
      );
    } else if (precision == 0) {
      return (
        <div style={{ textAlign: 'right', paddingRight: '4px' }}>
          {numeral(money).format('0,0')}
        </div>
      );
    }
  }
  return money;
};

export const moneyFormatsecu = (money, precision = 2) => {
  if (money !== undefined && money !== null && money !== '') {
    //let m=money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (precision == 2) {
      return <span>{numeral(money).format('0,0.00')}</span>;
    }
  }
  return money;
};
export const perFormatRight = (value, precision = 2) => {
  if (value !== undefined && value !== null) {
    let num = Number(value * 100).toFixed(precision) + '%';
    return <div style={{ textAlign: 'right', paddingRight: '4px' }}>{num}</div>;
  }
  return value;
};
export const YFormat = (value, precision = 2) => {
  if (value !== undefined && value !== null) {
    if (precision == 2) {
      let num = numeral(value / 100000000).format('0,0.00');
      return <div style={{ textAlign: 'right', paddingRight: '4px' }}>{num}</div>;
    }
  }
  return value;
};
export const WFormat = (value, precision = 2) => {
  if (value !== undefined && value !== null) {
    if (precision == 2) {
      let num = numeral(value / 10000).format('0,0.00');
      return <div style={{ textAlign: 'right', paddingRight: '4px' }}>{num}</div>;
    }
  }
  return value;
};
export function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}
//判断某字符出现次数
export function strTimes(s, c) {
  return s.split(c).length - 1;
}
//截取某字符后的字符串
export function subStr(s, c) {
  const site = s.lastIndexOf(c); // 获取最后一个 '/' 的位置
  const result = s.substring(site + 1, s.length); //
  return result;
}
export function isInputingNumber(value) {
  return !(Number.isNaN(Number(value)) && value !== '-');
}

export function uniqueArray(array, key) {
  var result = [array[0]];
  for (var i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}
export function isDate8(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) {
    return false;
  }

  var year, month, day;

  year = sDate.substring(0, 4);

  month = sDate.substring(4, 6);

  day = sDate.substring(6, 8);

  var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year < 1700 || year > 2500) return false;

  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) iaMonthDays[1] = 29;

  if (month < 1 || month > 12) return false;

  if (day < 1 || day > iaMonthDays[month - 1]) return false;

  return true;
}
//日期currentDate为准,AddDayCount(可正负)天后的日期
export function getPreDay(currentDate, AddDayCount) {
  var dd = new Date(
    Date.parse(
      currentDate.substring(0, 4) +
        '/' +
        currentDate.substring(4, 6) +
        '/' +
        currentDate.substring(6, 8),
    ),
  );
  // console.log(currentDate.substring(0,4)+'/'+currentDate.substring(4,6)+'/'+currentDate.substring(6,8))
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  return y + '' + m + '' + d;
}
export const handleMoment = (value, formatter) => {
  if (typeof value === 'undefined' || value === '' || value === null) {
    return null;
  } else {
    if (formatter && formatter.length > 2) {
      return moment(value).format(formatter);
    } else {
      return moment(value);
    }
  }
};
export const addDateFix = (date) => {
  if (String(date).length == 1) {
    return '0' + date;
  }
  return date;
};
// 防抖函数
export function debounce(func, time = 500) {
  let timerId;
  // eslint-disable-next-line func-names
  return function () {
    const context = this;
    //this指向调用时组件
    clearTimeout(timerId);
    // eslint-disable-next-line prefer-rest-params
    const lastArguments = arguments;
    lastArguments[1].persist && lastArguments[1].persist(); //此处参数[1]为合成事件对象
    timerId = setTimeout(() => {
      func.apply(context, lastArguments);
    }, time);
    return false;
  };
}

/**
 * 转换Moment对象为字符串格式
 *
 * @value Moment对象
 * @return 返回格式为yyyy-mm-dd的日期，如：2021-01-25
 */
export const handleMomentToStr = (value, formatter) => {
  if (typeof value === 'undefined' || value === '' || value === null) {
    return '';
  } else {
    if (formatter && formatter.length > 2) {
      return moment(value).format(formatter);
    } else {
      return moment(value).format('YYYY-MM-DD');
    }
  }
};
/**
 * 日期或时间字符串转为moment格式
 *
 * @dateStr 格式为yyyy-mm-dd的日期，如：2021-01-25
 * @return 返回 Moment对象
 */
export function handleStrToMoment(dateStr) {
  if (typeof dateStr === 'undefined' || dateStr === '' || dateStr === null) {
    return null;
  } else {
    return moment(dateStr);
  }
}
//将对象内每一个moment转换成字符串格式。参数如：fieldsValue, ['startDate','endDate'], 'YYYY-MM-DD'。返回一个转换后的新对象。
export const handleMomentToStrFromObj = (
  obj,
  keyList = ['startDate', 'endDate'],
  formatter = 'YYYY-MM-DD',
) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (!Array.isArray(keyList) || keyList.length < 1) return obj;
  let dateRange = obj.dateRange;
  if (dateRange && dateRange.length > 0) {
    obj[keyList[0]] = dateRange[0];
    obj[keyList[1]] = dateRange[1];
    delete obj.dateRange;
  }
  keyList.forEach((item) => {
    if (obj[item]) {
      obj[item] = moment(obj[item]).format(formatter);
    }
  });
  return obj;
};
/**
 * 对象中的日期或时间字符串转为moment格式
 *
 * @dateStr<Object> 格式为{startDate: 'yyyy-mm-dd'}
 * @return 返回 Moment对象 {startDate: moment}
 */
export function handleStrToMomentFromObj(obj, keyList = ['startDate', 'endDate']) {
  if (!obj || typeof obj !== 'object') return obj;
  if (!Array.isArray(keyList) || keyList.length < 1) return obj;
  let reg = /\d{4}-\d{2}-\d{2}/;
  keyList.forEach((item) => {
    if (typeof obj[item] === 'string' && reg.test(obj[item])) {
      obj[item] = new Date(obj[item]);
    } else {
      obj[item] = null;
    }
  });
  return obj;
}
/**
 *
 * @param {表单数据对象} obj
 * @param {需要转换格式的字段Key数组} keyList
 */
export function handleFieldsListToString(obj, keyList) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(keyList) && keyList.length > 0) {
    keyList.forEach((item) => {
      if (Array.isArray(obj[item])) {
        obj[item] = obj[item].toString();
      }
    });
  }
  return obj;
}
/**
 *
 * @param {表单数据对象} obj
 * @param {需要转换格式的字段Key数组} keyList
 */
export function handleFieldsStringToList(obj, keyList) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(keyList) && keyList.length > 0) {
    keyList.forEach((item) => {
      if (typeof obj[item] === 'string') {
        obj[item] = obj[item].split(',');
      }
    });
  }
  return obj;
}
