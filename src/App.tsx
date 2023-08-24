import React, { useState } from 'react';
import Form from './components/Form';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div className="App">
      <h1>Gerenciador de senhas</h1>
      {showForm ? (
        <Form onCancel={ handleHideForm } />
      ) : (
        <button onClick={ handleShowForm }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
