import React from 'react';

function Form() {
  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="service-name">Nome do serviço</label>
        <input type="text" id="service-name" />
      </div>
      <div className="form-group">
        <label htmlFor="login">Login</label>
        <input type="text" id="login" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input type="text" id="url" />
      </div>
      <button>Cadastrar</button>
      <button>Cancelar</button>
    </div>
  );
}

export default Form;
