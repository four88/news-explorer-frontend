import { useContext } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './PopupWithForm.css';

export default function PopupWithForm({
  isPopupOpened,
  onClose,
  handleSubmitSignIn,
  handleChange,
  hasAccount,
  handleHasAccount
}) {

  const [account, setAccount] = useContext(CurrentUserContext);



  return (
    <ModalWithForm
      isOpen={isPopupOpened}
      title={hasAccount ? "Sign in" : "Sign up"}
      onClose={onClose}
      onSubmit={handleSubmitSignIn}
      hasAccount={hasAccount}
      handleHasAccount={handleHasAccount}
      hasButton={true}
    >
      <label className='popup__label'>
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={account.email || ""}
        className="popup__input popup__input_type_email"
        onChange={handleChange}
        placeholder="Enter Email"
        required
      />
      <label className='popup__label'>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={account.password || ""}
        className="popup__input popup__input_type_password"
        onChange={handleChange}
        placeholder="Enter Password"
        required
      />
      {
        hasAccount ?
          ""
          :
          <>
            <label className='popup__label'>
              Username
            </label>
            <input
              type="string"
              name="name"
              id="name"
              value={account.name || ''}
              className="popup__input popup__input_type_password"
              onChange={handleChange}
              placeholder="Enter Username"
              required
            />
          </>
      }

    </ModalWithForm>
  )
}
