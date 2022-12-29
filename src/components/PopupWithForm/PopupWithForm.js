import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./PopupWithForm.css";
import useValidationForForm from "../../utils/validation";

export default function PopupWithForm({
  isPopupOpened,
  onClose,
  onSignin,
  onSignup,
  hasAccount,
  handleHasAccount,
  signupError,
  signinError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useValidationForForm();

  useEffect(() => {
    resetForm();
  }, [isPopupOpened, resetForm]);

  const handleSigninSubmit = (evt) => {
    evt.preventDefault();

    onSignin(values);
  };

  const handleSignupSubmit = (evt) => {
    evt.preventDefault();

    onSignup(values);
  };

  return (
    <ModalWithForm
      isOpen={isPopupOpened}
      title={hasAccount ? "Sign in" : "Sign up"}
      onClose={onClose}
      onSubmit={hasAccount ? handleSigninSubmit : handleSignupSubmit}
      hasAccount={hasAccount}
      handleHasAccount={handleHasAccount}
      hasButton={true}
      name={hasAccount ? "sign-in" : "sign-up"}
      isValid={isValid}
      signupError={signupError}
      signinError={signinError}
    >
      <div className="popup__input_container">
        <label className="popup__label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          minLength="5"
          maxLength="30"
          value={values.email || ""}
          className="popup__input popup__input_type_email"
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        <span className="popup__error">{errors.email || ""}</span>
      </div>
      <label className="popup__label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        minLength="8"
        maxLength="30"
        value={values.password || ""}
        className="popup__input popup__input_type_password"
        onChange={handleChange}
        placeholder="Enter Password"
        required
      />
      <span className="popup__error">{errors.password || ""}</span>
      {hasAccount ? (
        ""
      ) : (
        <>
          <label className="popup__label">Username</label>
          <input
            type="string"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            className="popup__input popup__input_type_password"
            onChange={handleChange}
            placeholder="Enter Username"
            required
          />
          <span className="popup__error">{errors.name || ""}</span>
        </>
      )}
    </ModalWithForm>
  );
}
