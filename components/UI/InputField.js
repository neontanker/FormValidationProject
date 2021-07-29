const InputField = (props) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.inputIsInvalid && <p className="error-text">{props.errorText}</p>}
    </div>
  );
};

export default InputField;
