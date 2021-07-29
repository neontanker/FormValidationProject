import { useState } from "react";

import InputField from "./UI/InputField";

const SimpleInput = (props) => {
  //Feels like it needs useReducer or something...
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const re = /^[^\s@]+@[^\s@]+$/;
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && re.test(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  let emailErrorText = "You must provide an email address.";

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  if (enteredEmail.trim() !== "" && !re.test(enteredEmail)) {
    emailErrorText = "Please enter a valid email address.";
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredEmailTouched(true);
    setEnteredNameTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      console.log(enteredNameIsValid, emailInputIsInvalid, enteredEmailIsValid);
      return;
    }
    console.log(enteredName, enteredEmail);

    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <InputField
        className={nameInputClasses}
        label="Your Name"
        type="text"
        id="name"
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler}
        value={enteredName}
        inputIsInvalid={nameInputIsInvalid}
        errorText="Name must not be empty."
      />
      <InputField
        className={emailInputClasses}
        label="Your Email Address"
        type="text"
        id="email"
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
        inputIsInvalid={emailInputIsInvalid}
        errorText={emailErrorText}
      />
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
