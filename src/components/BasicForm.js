import UseInput from "../Hooks/use-input";
import InputField from "./UI/InputField";

const BasicForm = (props) => {
  const re = /^[^\s@]+@[^\s@]+$/;
  const {
    dataChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    reset: resetNameInput,
  } = UseInput((value) => value.trim() !== "");

  const {
    dataChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    reset: resetLastNameInput,
  } = UseInput((value) => value.trim() !== "");

  const {
    dataChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmailInput,
  } = UseInput((value) => value.trim() !== "" && re.test(value));

  let formIsValid = false;

  if (nameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log(enteredName, enteredLastName, enteredEmail);
    resetNameInput();
    resetLastNameInput();
    resetEmailInput();
  };
  const nameInputClasses = !nameHasError
    ? "form-control"
    : "form-control invalid";

  const lastNameInputClasses = !lastNameHasError
    ? "form-control"
    : "form-control invalid";

  const emailInputClasses = !emailHasError
    ? "form-control"
    : "form-control invalid";

  const emailErrorMsg =
    enteredEmail.trim() === ""
      ? "Email must not be empty."
      : !re.test(enteredEmail)
      ? "Please enter a valid email."
      : "";

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <InputField
          className={nameInputClasses}
          label="Your Name"
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          inputIsInvalid={nameHasError}
          errorText="Name must not be empty."
        />
        <InputField
          className={lastNameInputClasses}
          label="Your Last Name"
          type="text"
          id="lastname"
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
          inputIsInvalid={lastNameHasError}
          errorText="Last Name must not be empty."
        />
        <InputField
          className={emailInputClasses}
          label="Email Address"
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          inputIsInvalid={emailHasError}
          errorText={emailErrorMsg}
        />
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
