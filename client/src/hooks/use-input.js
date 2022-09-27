import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { value: action.value, isTouched: state.isTouched };

    case 'BLUR':
      return { isTouched: true, value: state.value };

    case 'SWITCH_MODE':
      return { isTouched: false, value: '' }

    case 'RESET':
      return { isTouched: false, value: '' };

    default:
      return inputStateReducer;
  }
};

const useInput = validateValue => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const switchModeHandler = () => {
    dispatch( { type: 'SWITCH_MODE' } );
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    switchModeHandler,
    reset,
  };
};

export default useInput;