import { useState } from 'react';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('A enviar...');

    const res = await fetch('/api/Users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    setMessage(data.message || 'Erro ao registrar');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Telefone:</label><br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p>{message}</p>
    </div>
  );
                           }
