import React, { useState } from 'react';

interface FormProps {
  onCancel: () => void;
}

function Form({ onCancel }: FormProps) {
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const isFormValid = serviceName !== ''
    && login !== ''
    && password.length >= 8
    && password.length <= 16
    && /\d/.test(password)
    && /[a-zA-Z]/.test(password)
    && /[^a-zA-Z0-9]/.test(password);

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="service-name">Nome do serviço</label>
        <input
          type="text"
          id="service-name"
          value={ serviceName }
          onChange={ (e) => setServiceName(e.target.value) }
        />
      </div>
      <div className="form-group">
        <label htmlFor="login">Login</label>
        <input
          type="text"
          id="login"
          value={ login }
          onChange={ (e) => setLogin(e.target.value) }
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </div>
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={ url }
          onChange={ (e) => setUrl(e.target.value) }
        />
      </div>
      <button disabled={ !isFormValid }>Cadastrar</button>
      <button onClick={ onCancel }>Cancelar</button>
    </div>
  );
}
export default Form;
