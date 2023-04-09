import React, {
  useState,
  ChangeEvent,
  useReducer,
  useEffect,
  useContext,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const initialEnteredInputState: IEnteredInputState = {
  value: '',
  isValid: false,
};

interface IEnteredInputState {
  value: string;
  isValid: boolean;
}

interface IEnteredInputAction {
  type: string;
  payload: string;
}

const emailReducer = (
  state: IEnteredInputState,
  action: IEnteredInputAction
) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.payload, isValid: action.payload.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (
  state: IEnteredInputState,
  action: IEnteredInputAction
) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState<boolean>();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEnteredInputState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialEnteredInputState
  );

  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Check form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEAN UP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatchEmail({ type: 'USER_INPUT', payload: event.target.value });

    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    dispatchPassword({ type: 'USER_INPUT', payload: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR', payload: '' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR', payload: '' });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
