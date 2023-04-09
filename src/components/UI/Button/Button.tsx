import React from 'react';

import classes from './Button.module.css';

type TProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type: string;
  className: string;
  disabled: boolean;
  children: string;
};

const Button = ({ type, className, disabled, children }: TProps) => {
  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
