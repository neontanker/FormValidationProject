import { useState } from "react";

const UseInput = (valdidateData) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const dataIsValid = valdidateData(enteredValue);
  const hasError = !dataIsValid && isTouched;

  const dataChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    dataChangeHandler,
    inputBlurHandler,
    hasError,
    value: enteredValue,
    isValid: dataIsValid,
    reset
  };
};

export default UseInput;
