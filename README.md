# umi3.5-antd-mobile
## 主要框架版本
antd-mobile@5.33.0


umi@3.5.0


react@16.8.6

## 目录结构

    |-- config                                # umi 配置，包含路由，构建等配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # favicon
    |-- src                                   # 
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务通用组件
    |   |-- layout                            # 通用布局
    |   |-- models                            # 全局 dva model
    |   |-- services                          # 后台接口服务
    |   |-- pages                             # 业务页面入口和常用模板
    |   |-- e2e                               # 集成测试用例
    |   |-- global.less                       # 全局样式
    |   |-- global.tsx                         # 全局 JS
    |   |-- theme.js                          
    |-- tests                                 # 测试工具
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          
    |-- README.md                              


## 快速开始
项目已调通基础的权限控制、路由匹配、菜单跳转、基础布局等模块。可以在此基础上快速进行功能开发。

```javascript

// 安装项目
$ git clone https://github.com/yiiran8080/umi3.5-antd-mobile.git my-project

$ cd my-project

// 安装依赖
$ yarn or npm install

// 运行
$ yarn start or npm run start # 访问 http://localhost:8080

// 打包
$ yarn build or npm run build

```

## 说明
项目基于umi-dva-antd-mobile开发:  https://github.com/hqwlkj/umi-dva-antd-mobile.git
在该项目基础上进行了umi,antd-mobile的版本升级
