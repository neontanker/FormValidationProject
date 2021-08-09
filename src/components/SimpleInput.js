import InputField from "./UI/InputField";
import useInput from "../Hooks/use-input";

const SimpleInput = (props) => {
  const re = /^[^\s@]+@[^\s@]+$/;
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => re.test(value));

  let formIsValid = false;
  let emailErrorText = "You must provide an email address.";

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  if (enteredEmail.trim() !== "" && !re.test(enteredEmail)) {
    emailErrorText = "Please enter a valid email address.";
  }


  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // not needed?: setEnteredEmailTouched(true);
    

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <InputField
        className={nameInputClasses}
        label="Your Name"
        type="text"
        id="name"
        onChange={nameChangedHandler}
        onBlur={nameBlurHandler}
        value={enteredName}
        inputIsInvalid={nameInputHasError}
        errorText="Name must not be empty."
      />
      <InputField
        className={emailInputClasses}
        label="Your Email Address"
        type="text"
        id="email"
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
        inputIsInvalid={emailInputHasError}
        errorText={emailErrorText}
      />
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
