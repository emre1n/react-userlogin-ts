import React from 'react';

import classes from './Input.module.css';

type TProps = {
  isValid: boolean;
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const Input = ({
  isValid,
  label,
  id,
  type,
  value,
  onChange,
  onBlur,
}: TProps) => {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
