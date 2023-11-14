import React from 'react';
import { NavBar } from 'antd-mobile';
import { history } from 'umi';
// import { formatMessage } from 'umi-plugin-locale';
import styles from '@/pages/index.less';

export default function () {
  return (
    <div className={styles.normal}>
      <NavBar onBack={() => history.push('/')}>me</NavBar>
      <h1 className={styles.title}>me</h1>
    </div>
  );
}
