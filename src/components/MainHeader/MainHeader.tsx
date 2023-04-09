import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

// type TProps = {
// isAuthenticated: boolean;
// onLogout: () => void;
// };

// const MainHeader = ({ isAuthenticated, onLogout }: TProps) => {
// const MainHeader = ({ onLogout }: TProps) => {
const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      {/* <Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} /> */}
      <Navigation />
    </header>
  );
};

export default MainHeader;
