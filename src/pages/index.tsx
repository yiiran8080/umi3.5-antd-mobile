import React from 'react';
import { Button, NavBar } from 'antd-mobile';
import { Link } from 'umi';
import styles from './index.less';

export default function () {
  // const { formatMessage } = useIntl();
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        // icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[123, 456]}
      >
        home
      </NavBar>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">start</a>
        </li>
        <li>
          <Link to="/me">me</Link>
        </li>
      </ul>
      <Button color="warning">test</Button>
    </div>
  );
}
