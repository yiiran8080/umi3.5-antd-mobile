/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter, PageContainer } from "@ant-design/pro-layout";
import React, { useEffect, useState } from "react";
import { Link, connect, history } from "umi";
import { Result, Tabs, Button, Badge, TabBar, NavBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
  MoreOutline
} from 'antd-mobile-icons'
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'
import { MenuUnfoldOutlined } from "@ant-design/icons";

import { pathToRegexp } from 'path-to-regexp';
import Authorized from "@/utils/Authorized";

import logo from "../assets/logo.png";
import styles from "./BasicLayout.less";
// import Avatar from "@/components/GlobalHeader/AvatarDropdown";
import { removeToken, setAuthority, getAuthority, setToken, getAuthorityFromRouter } from '@/utils/authority';
import Exception404 from '../pages/404';
import MyWorkflowQuery from "../pages/WorkMgr/Page3";
import TaskDoneQuery from "../pages/WorkMgr/Page2";
import TaskTodoQuery from "../pages/WorkMgr/Page1";
import WorkflowCopyQuery from "../pages/WorkMgr/Page4";
// const { SubMenu } = Menu;
// const auth = getAuthority();

const { Tab } = Tabs;

const tabs = [
  {
    key: '/page1',
    title: '流程待办',
    icon: <AppOutline />,
    // badge: '5',
    component: TaskTodoQuery,
    authority: "流程待办_菜单",
  },
  {
    key: '/page2',
    title: '流程已办',
    icon: <UnorderedListOutline />,
    component: TaskDoneQuery,
    authority: "流程已办_菜单",
  },
  {
    key: '/page4',
    title: '流程抄送',
    icon: <UserOutline />,
    component: WorkflowCopyQuery,
    authority: "流程抄送_菜单",
  },
]
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

const Bottom = (props) => {
  // const history = useHistory()
  const { location, handleMenuCollapse, todoCount } = props;
  const { pathname } = location
  const [activeKey, setActiveKey] = useState('');

  const setRouteActive = (value) => {
    console.log('target path', value)
    setActiveKey(value);
      history.push(value);
  }

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.key === '/page1' ? todoCount : null} />
      ))}
    </TabBar>
  )
}

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: "/",
    },
    route: { routes },
    // history,
  } = props;
  console.log('pathname', location)
  /**
   * constructor
   */
  const [pageKey, setPageKey] = useState(location.pathname);
  const [pages, setPages] = useState([]);
  const [localItemAll, setLocalItemAll] = useState([]);
  const [activeKey, setActiveKey] = useState('todo')
  const [infoData, setInfoData] = useState([]);
  const [spinLoad, setSpinLoad] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('user-authority-list')) {
      //本项目没有登录入口，初始化的时候可以在这里请求权限
      dispatch({
        type: 'user/fetchAuthority',
        callback: (res) => {
          if (res.status == 0) {
            let authority = res.data;
            setAuthority(authority)
            window.location.reload()
          }
        }
      });
    }

  }, []);

  const menuDataRender = (menuList) => {
    let ll = [];
    menuList.map((item) => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : [],
        title: item.name,
      };
      if (!(localItemAll.some(item => item.name == localItem.name && item.path == localItem.path))) {
        let aa = localItemAll;
        aa.push(localItem)
        setLocalItemAll(aa)
      };
      let tmp = Authorized.check(item.authority, localItem, null);
      if (tmp) ll.push(tmp)
    })
    return ll;
  }


  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: "global/changeLayoutCollapsed",
        payload,
      });
    }
  }; // get children authority

  const getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };
  const routerConfig = getRouterAuthority(location.pathname || "/", routes);

  const onHandlePage = e => {
    console.log('e', e)
    history.push(e.pathname || e.path)
  }

  props.location.onHandlePage = onHandlePage;
  const onClickMenuItem = (menuItemProps) => {
    handleMenuCollapse();
    onHandlePage(menuItemProps);
  }

  return (
    <div className={styles.bly}>
      <div className={styles.infoLogo}>
        <img src={logo} style={{ width: "13px", marginRight: "4px" }} />
        项目title
      </div>
      <div className={styles.avt}>
        <MenuUnfoldOutlined onClick={handleMenuCollapse} />
      </div>
      <ProLayout
        route={routes}
        headerRender={false}
        // breakpoint={false}
        // collapsedButtonRender={(flag) => { flag ? "open" : "close" }}
        logo={logo}
        location={location}
        menuDataRender={menuDataRender}
        // formatMessage={formatMessage}
        // collapsed={false}
        onCollapse={handleMenuCollapse}
        // onMenuHeaderClick={() => history.push("/")}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <a onClick={() => onClickMenuItem(menuItemProps)}>{defaultDom}</a>;
        }}
        {...props}
        {...settings}
      >
        <PageContainer
          ghost
          fixedHeader
          // onBack={() => goBack}
          header={{
            style: { background: 'rgba(30, 152, 193, 0.2)', padding: "8px 24px" },
            breadcrumb: {},
          }}
        >
          <div className={styles.app}>
            {/* <div className={styles.top}>
              <NavBar onLeftClick={onLeftClick}>配合路由使用</NavBar>
            </div> */}
            <div className={styles.body}>
              {/* <Switch> */}
              <Authorized authority={routerConfig} noMatch='无权限访问'>
                {localItemAll.map(item => (
                  <Route exact path={item.path} component={item.component} />
                ))}
                {/* </Switch> */}
              </Authorized>
            </div>
            <div className={styles.bottom}>
              <Bottom {...props} handleMenuCollapse={handleMenuCollapse} />
            </div>
          </div>
        </PageContainer>

      </ProLayout>
    </div>
  );
};

export default connect(({ global, settings, WorkflowModel }) => ({
  collapsed: global.collapsed,
  settings,
  todoCount: WorkflowModel.todoCount
}))(BasicLayout);
