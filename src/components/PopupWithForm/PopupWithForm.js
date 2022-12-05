import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './PopupWithForm.css';

export default function PopupWithForm({
  isPopupOpened,
  onClose,
  handleSubmitSignIn,
  account,
  handleChange,
  hasAccount,
  handleHasAccount
}) {


  return (
    <ModalWithForm
      isOpen={isPopupOpened}
      title={hasAccount ? "Sign in" : "Sign up"}
      onClose={onClose}
      onSubmit={handleSubmitSignIn}
      hasAccount={hasAccount}
      handleHasAccount={handleHasAccount}
    >
      <label className='signin__label'>
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={account.email}
        className="signin__input signin__input_type_email"
        onChange={handleChange}
        placeholder="Enter Email"
      />
      <label className='signin__label'>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={account.password}
        className="signin__input signin__input_type_password"
        onChange={handleChange}
        placeholder="Enter Password"
      />
      {
        hasAccount ?
          ""
          :
          <>
            <label className='signin__label'>
              Username
            </label>
            <input
              type="string"
              name="username"
              id="username"
              value={account.username}
              className="signin__input signin__input_type_password"
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </>
      }

    </ModalWithForm>
  )
}
