import React from 'react';

import classes from './Card.module.css';

type TProps = {
  className: string;
  children: JSX.Element;
};

const Card = ({ className, children }: TProps) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
