import { useState } from 'react';
import './cadastrarEvento.css';
import { db } from '../../services/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';

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
      // Converter imagem para Base64
      const imagemUrl = await convertToBase64(imagem);

      // Salvar dados no Firestore
      await addDoc(collection(db, "eventos"), {
        titulo,
        data,
        imagemUrl, // Agora é uma string Base64
        criadoEm: new Date()
      });

      alert('Evento cadastrado com sucesso!');

      // Resetar formulário
      setTitulo('');
      setData('');
      setImagem(null);
      
      // Resetar o campo de arquivo
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error("Erro ao cadastrar evento:", err);
      setError("Erro ao cadastrar. Tente novamente.");
    }
  }

  // Função para converter arquivo para Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="cadastrar-evento-container">
      <h3>📅 Cadastrar Novo Evento</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="cadastrar-evento-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="titulo">Título do Evento:</label>
          <input
            id="titulo"
            type="text"
            placeholder="Digite o título do evento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="data">Data do Evento:</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="imagem">Imagem do Evento:</label>
          <input
            id="imagem"
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </div>
        
        <button type="submit">
          ✅ Cadastrar Evento
        </button>
      </form>
    </div>
  );
}
