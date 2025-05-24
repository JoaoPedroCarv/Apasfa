import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import "./adocao.css";

function Adocao() {
  const [animais, setAnimais] = useState([]);

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
                <img src={animal.fotoUrl || "/img/padrao.jpg"} alt={animal.nome} />
              </div>
              <div className="pet-info">
                <h3 className="pet-name">{animal.nome || "Sem nome"}</h3>
                <p className="pet-details">
                  <strong>Raça:</strong> {animal.raca || "Não informada"} <br />
                  <strong>Idade:</strong> {animal.idade || "Desconhecida"}
                </p>
                {animal.descricao && <p className="pet-details">{animal.descricao}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Adocao;
