import React, { useState } from 'react';

type FormProps = {
  onCancel: () => void;
};

function Form({ onCancel }: FormProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean | ''>(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    maxLength: false,
    hasLettersAndNumbers: false,
    hasSpecialCharacter: false,
  });

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const maxLength = password.length <= 16;
    const hasLettersAndNumbers = /\d/.test(password) && /[a-zA-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password);

    return {
      minLength,
      maxLength,
      hasLettersAndNumbers,
      hasSpecialCharacter,
    };
  };

  const handleInputChange = () => {
    const serviceName = document.getElementById('serviceName') as HTMLInputElement;
    const login = document.getElementById('login') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const newPasswordValidation = validatePassword(password.value);
    setPasswordValidation(newPasswordValidation);

    // console.log('Password validation:', newPasswordValidation);

    const isFormValid = serviceName.value
      && login.value
      && newPasswordValidation.minLength
      && newPasswordValidation.maxLength
      && newPasswordValidation.hasLettersAndNumbers
      && newPasswordValidation.hasSpecialCharacter;

    setIsButtonEnabled(isFormValid);
  };

  const renderPasswordMessage = (isValid: boolean, message: string) => {
    return isValid ? (
      <p className="valid-password-check">{message}</p>
    ) : (
      <p className="invalid-password-check">{message}</p>
    );
  };

  return (
    <div>
      <label htmlFor="serviceName">Nome do serviço:</label>
      <input
        type="text"
        id="serviceName"
        name="serviceName"
        onChange={ handleInputChange }
      />
      <label htmlFor="login">Login:</label>
      <input
        type="text"
        id="login"
        name="login"
        onChange={ handleInputChange }
      />
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={ handleInputChange }
      />
      <label htmlFor="url">URL:</label>
      <input type="text" id="url" name="url" />

      {renderPasswordMessage(
        passwordValidation.minLength,
        'Possuir 8 ou mais caracteres',
      )}

      {renderPasswordMessage(
        passwordValidation.maxLength,
        'Possuir até 16 caracteres',
      )}

      {renderPasswordMessage(
        passwordValidation.hasLettersAndNumbers,
        'Possuir letras e números',
      )}

      {renderPasswordMessage(
        passwordValidation.hasSpecialCharacter,
        'Possuir algum caractere especial',
      )}

      <button disabled={ isButtonEnabled === '' || !isButtonEnabled }>
        Cadastrar
      </button>
      <button onClick={ onCancel }>Cancelar</button>
    </div>
  );
}

export default Form;
