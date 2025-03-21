import React, { useEffect, useState, useContext } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import './comentarios.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth";

function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    consultarComentarios();
  }, []);

  async function consultarComentarios() {
    onSnapshot(collection(db, "comentarios"), (snapshot) => {
      let listaComentarios = [];
      snapshot.forEach((doc) => {
        listaComentarios.push({
          id: doc.id,
          nomePais: doc.data().nomePais,
          experiencia: doc.data().experiencia,
          valor: doc.data().valor,
          Dias: doc.data().Dias,
          nomeUsuario: doc.data().nomeUsuario,
          idUsuario: doc.data().idUsuario
        });
      });
      setComentarios(listaComentarios);
    });
  }

  async function excluirComentario(comentario) {
    if (user) {
      if (user.uid === comentario.idUsuario) {
        try {
          await deleteDoc(doc(db, "comentarios", comentario.id));
          consultarComentarios();
          alert("Comentário excluído com sucesso!");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Você pode excluir apenas os seus comentários.");
      }
    } else {
      alert("Você precisa estar logado para excluir seus comentários.");
    }
  }

  return (
    <div className="tudo">
      <h1>Comentários</h1>
      <div className="comentarios">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comentario-box">
            <div className="lixeira">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => excluirComentario(comentario)}
              />
            </div>
            <div>
              {user && user.uid === comentario.idUsuario && (
                <Link to={`/editarComentario/${comentario.id}`}>
                  <FontAwesomeIcon icon={faEdit} className="caneta" />
                </Link>
              )}
            </div>
            <div className="comentario">
              <h2><strong>Usuario:</strong> {comentario.nomeUsuario}</h2>
              <h2><strong>Pais:</strong> {comentario.nomePais}</h2>
              <p><strong>Comentario:</strong> {comentario.experiencia}</p>
              <p><strong>Valor gasto:</strong> R${comentario.valor}</p>
              <p><strong>Quantos dias viajou:</strong> {comentario.Dias}</p>
            </div>
          </div>
        ))}
      </div>
      <Link className="link" to='/novoComentario'>Adicione um comentário</Link>
    </div>
  );
}

export default Comentarios;
