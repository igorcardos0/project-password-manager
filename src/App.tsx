import React, { useState } from 'react';
import './App.css';
import Form, { PasswordEntry } from './components/Form';

function App() {
  const [hidePasswords, setHidePasswords] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [passwordEntries, setPasswordEntries] = useState<PasswordEntry[]>([]);

  const addPasswordEntry = (entry: PasswordEntry) => {
    setPasswordEntries([...passwordEntries, entry]);
    setIsFormVisible(false);
  };

  const removePasswordEntry = (index: number) => {
    const updatedEntries = passwordEntries.filter((_, i) => i !== index);
    setPasswordEntries(updatedEntries);
  };

  const toggleHidePasswords = () => {
    setHidePasswords(!hidePasswords);
  };

  const renderPassword = (password: string) => (hidePasswords ? '******' : password);

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {isFormVisible ? (
        <Form addPasswordEntry={ addPasswordEntry } setFormVisible={ setIsFormVisible } />
      ) : (
        <button onClick={ () => setIsFormVisible(true) }>Cadastrar Nova Senha</button>
      )}
      <div>
        {passwordEntries.length === 0 ? (
          <span>Nenhuma senha Cadastrada</span>
        ) : (
          passwordEntries.map((entry, index) => (
            <div className="password-entry" key={ entry.loginField }>
              <a href={ entry.linkField }>{entry.serviceName}</a>
              <p>{entry.loginField}</p>
              <p>{renderPassword(entry.passwordField)}</p>
              <button
                onClick={ () => removePasswordEntry(index) }
                data-testid="remove-btn"
              >
                Remover
              </button>
              <label htmlFor="hidePasswords">Esconder senhas</label>
              <input
                type="checkbox"
                name=""
                id="hidePasswords"
                checked={ hidePasswords }
                onChange={ toggleHidePasswords }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
