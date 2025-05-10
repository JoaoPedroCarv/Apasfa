import { useState } from 'react';
import './admin.css';
import { db, storage } from '../../services/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CadastrarEvento() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!titulo || !data || !imagem) {
      return setError('Preencha todos os campos obrigatórios!');
    }

    try {
      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, `eventos/${Date.now()}_${imagem.name}`);
      await uploadBytes(storageRef, imagem);
      const imagemUrl = await getDownloadURL(storageRef);

      // Salvar dados no Firestore
      await addDoc(collection(db, "eventos"), {
        titulo,
        data,
        imagemUrl,
        criadoEm: new Date()
      });

      alert('Evento cadastrado com sucesso!');

      // Resetar formulário
      setTitulo('');
      setData('');
      setImagem(null);
    } catch (err) {
      console.error("Erro ao cadastrar evento:", err);
      setError("Erro ao cadastrar. Tente novamente.");
    }
  }

  return (
    <div className="admin-container centralizado">
      <div className="form-box">
        <h1>Cadastrar Evento</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Título do Evento</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Imagem do Evento</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </div>
          <button type="submit">Cadastrar Evento</button>
        </form>
      </div>
    </div>
  );
}
