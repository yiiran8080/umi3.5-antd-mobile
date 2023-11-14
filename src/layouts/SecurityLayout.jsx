import React from "react";
import { Redirect, connect, history } from "umi";
import { stringify } from "querystring";
import { ErrorBlock } from 'antd-mobile'
import { getToken } from "@/utils/authority";

class SecurityLayout extends React.Component {

  render() {
    const { children } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const token = getToken();
    if (!token || !token.trim()) {
      //没有token提示
      return <ErrorBlock fullPage title="token已失效" description="请从入口重新进入" />
    }

    return children;
  }
}

export default SecurityLayout;
