export default [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            // authority: ['流程待办_菜单'],
            name: '流程待办',
            path: '/page1',
            component: './WorkMgr/Page1',
          },
          {
            // authority: ['流程已办_菜单'],
            name: '流程已办',
            path: '/page2',
            component: './WorkMgr/Page2',
          },
          {
            // authority: ['我发起的222_菜单'],
            name: '我发起的',
            path: '/page3',
            component: './WorkMgr/Page3',
          },
          {
            // authority: ['流程抄送_菜单'],
            name: '流程抄送',
            path: '/page4',
            component: './WorkMgr/Page4',
          },
          { path: '/404', component: '404' },
          { path: '/403', component: '403' },
        ],
      },
    ],
  },
];
