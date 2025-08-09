import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import InputMask from "react-input-mask";
import "./adocao.css";

function Adocao() {
  const [animais, setAnimais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [formData, setFormData] = useState({
    telefone: "",
    motivo: "",
    outrosAnimais: "",
  });

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "animais"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimais(data);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    };

    fetchAnimais();
  }, []);

  const handleAdotarClick = (animal) => {
    setAnimalSelecionado(animal);
    setModalAberto(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "solicitacoes"), {
        ...formData,
        animalId: animalSelecionado.id,
        dataSolicitacao: new Date(),
        usuarioId: auth.currentUser.uid,
      });

      alert("Solicitação enviada com sucesso!");
      setModalAberto(false);
      setFormData({
        telefone: "",
        motivo: "",
        outrosAnimais: "",
      });
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      alert("Erro ao enviar solicitação.");
    }
  };

  return (
    <div className="animais-container">
      <h1>Animais para Adoção</h1>

      {animais.length === 0 ? (
        <p>Nenhum animal disponível no momento.</p>
      ) : (
        <div className="pets-grid">
          {animais.map((animal) => (
            <div key={animal.id} className="pet-card">
              <div className="pet-image">
                <img
                  src={animal.fotoUrl || "/img/padrao.jpg"}
                  alt={animal.nome}
                />
              </div>
              <div className="pet-info">
                <h3 className="pet-name">{animal.nome || "Sem nome"}</h3>
                <p className="pet-details">
                  <strong>Raça:</strong> {animal.raca || "Não informada"} <br />
                  <strong>Idade:</strong> {animal.idade || "Desconhecida"}
                </p>
                {animal.descricao && (
                  <p className="pet-details">{animal.descricao}</p>
                )}

                <button
                  onClick={() => handleAdotarClick(animal)}
                  className="btn btn-brown"
                >
                  Quero Adotar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Quero Adotar: {animalSelecionado?.nome}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Telefone:
                <InputMask
                  mask="(99) 99999-9999"
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                >
                  {(inputProps) => <input {...inputProps} />}
                </InputMask>
              </label>

              <label>
                Por que deseja adotar?
                <textarea
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Já tem outros animais?
                <select
                  name="outrosAnimais"
                  value={formData.outrosAnimais}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </label>

              <div className="modal-buttons">
                <button type="submit" className="btn btn-brown">
                  Enviar Solicitação
                </button>
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="btn btn-light"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adocao;
