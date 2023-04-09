import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <div>
        <h1>Welcome back!</h1>
        <button className={classes.button} onClick={authCtx.onLogout}>
          Logout
        </button>
      </div>
    </Card>
  );
};

export default Home;
