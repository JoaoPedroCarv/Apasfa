import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import './editar.css';

function EditarComentario() {
  const { id } = useParams();
  const [nomePais, setNomePais] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [valor, setValor] = useState(0);
  const [dias, setDias] = useState(0);
  const [atualizadoComSucesso, setAtualizadoComSucesso] = useState(false);

  useEffect(() => {
    async function buscarComentario() {
      try {
        const docRef = doc(db, "comentarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNomePais(data.nomePais);
          setExperiencia(data.experiencia);
          setValor(data.valor);
          setDias(data.Dias);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    }

    buscarComentario();
  }, [id]);

  async function atualizarComentario(e) {
    e.preventDefault();

    try {
      const docRef = doc(db, "comentarios", id);
      await updateDoc(docRef, {
        nomePais,
        experiencia,
        valor,
        Dias: dias,
      });
      alert('Comentário atualizado com sucesso')
      setAtualizadoComSucesso(true);
    } catch (error) {
      console.error("Erro ao atualizar o comentário:", error);
    }
  }

  return (
    <div className="meio">
      <h1>Editar Comentário</h1>
      <form className="form" onSubmit={atualizarComentario}>
        <label>
          Nome do País:
          <input
            type="text"
            value={nomePais}
            onChange={(e) => setNomePais(e.target.value)}
          />
        </label>
        <label>
          Experiência:
          <input
            type="text"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
          />
        </label>
        <label>
          Valor:
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Dias:
          <input
            type="number"
            value={dias}
            onChange={(e) => setDias(parseInt(e.target.value))}
          />
        </label>
        <button className="btn1" type="button" onClick={() => setDias(dias + 1)}>Adicionar Dia</button>
        <button className="btn2" type="button" onClick={() => setDias(dias - 1)}>Remover Dia</button>
        <button className="btn3" type="submit">Atualizar Comentário</button>
      </form>

      {atualizadoComSucesso ? (
        <div className="link">
          <Link to="/comentarios">Voltar para a Lista de Comentários</Link>
        </div>
      ) : null}
    </div>
  );
}

export default EditarComentario;
