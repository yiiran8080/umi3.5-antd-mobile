// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import pageRoutes from './router.config';
import defineData from './define';
const { apiPrefix, proxyServer, webPrefix } = defaultSettings;
const apiPrefixStr = apiPrefix ? '/' + apiPrefix : '/';
// import aliyunTheme from '@ant-design/aliyun-theme';
export default defineConfig({
  hash: true,
  // layout: {},
  antd: { mobile: false },
  dva: {},
  fastRefresh: {},
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  // dynamicImport: {
  //   loading: "@/components/PageLoading/index",
  // },
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  //   define: defineData,  //这里可以根据需要引入的配置引入
  // umi routes: https://umijs.org/docs/routing
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    '@primary-color': defineData.primaryColor,
    '@meau-dark-submeau-bg': '#f86c36',
    '@font-size-base': '13px',
  },
  // @ts-ignore
  title: '项目title',
  ignoreMomentLocale: true,
  proxy: {
    [apiPrefixStr]: {
      target: proxyServer,
      changeOrigin: true,
      //pathRewrite: { '^/server': '' },
    },
  },
  // manifest: {
  //   basePath: webPrefix ? '/' + webPrefix + '/' : '/',
  // },
  base: webPrefix ? '/' + webPrefix + '/' : '',
  publicPath: webPrefix ? '/' + webPrefix + '/' : '',
});
