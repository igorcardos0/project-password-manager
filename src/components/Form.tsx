import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface PasswordEntry {
  serviceName: string;
  loginField: string;
  passwordField: string;
  linkField: string;
}

interface FormProps {
  addPasswordEntry: (entry: PasswordEntry) => void;
  setFormVisible: (visible: boolean) => void;
}

function Form({ addPasswordEntry, setFormVisible }: FormProps) {
  const [formState, setFormState] = useState<PasswordEntry>({
    serviceName: '',
    loginField: '',
    passwordField: '',
    linkField: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      addPasswordEntry(formState);
      setFormVisible(false);
    }
  };

  const validateForm = () => {
    const serviceNameValid = formState.serviceName.length > 0;
    const loginValid = formState.loginField.length > 0;
    const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z\d@#$%^&+=!_]{8,16}$/.test(
      formState.passwordField,
    );
    return serviceNameValid && loginValid && passwordValid;
  };

  const renderPasswordAlerts = () => (
    <ol>
      <li>
        {passwordAlert(
          'Possuir 8 ou mais caracteres',
          formState.passwordField.length >= 8,
        )}

      </li>
      <li>
        {passwordAlert(
          'Possuir até 16 caracteres',
          formState.passwordField.length <= 16,
        )}
      </li>
      <li>{passwordAlert('Possuir letras e números', /^(?=.*[a-z])(?=.*\d)/.test(formState.passwordField))}</li>
      <li>{passwordAlert('Possuir algum caractere especial', /^(?=.*[@#$%^&+=!])/.test(formState.passwordField))}</li>
    </ol>
  );

  const passwordAlert = (message: string, condition: boolean) => (
    <span
      className={ condition ? 'valid-password-check' : 'invalid-password-check' }
    >
      {message}
    </span>
  );

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="serviceName">Nome do Serviço</label>
        <input
          type="text"
          name="serviceName"
          id="serviceName"
          onChange={ handleChange }
          value={ formState.serviceName }
        />
        <label htmlFor="loginField">Login</label>
        <input
          type="text"
          name="loginField"
          id="loginField"
          onChange={ handleChange }
          value={ formState.loginField }
        />
        <label htmlFor="passwordField">Senha</label>
        <input
          type="password"
          name="passwordField"
          id="passwordField"
          onChange={ handleChange }
          value={ formState.passwordField }
        />
        <label htmlFor="linkField">URL</label>
        <input
          type="text"
          name="linkField"
          id="linkField"
          onChange={ handleChange }
          value={ formState.linkField }
        />
        <button disabled={ !validateForm() }>Cadastrar</button>
        <button onClick={ () => setFormVisible(false) }>Cancelar</button>
        <div>{renderPasswordAlerts()}</div>
      </form>
    </div>
  );
}

export default Form;
