import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import './novoComentario.css'
import { AuthContext } from "../../context/auth";
import { connect } from 'react-redux'

function CriarComentario(props) {
    const [nomePais, setNomePais] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [valor, setValor] = useState(0);
    const [comentarioCriado, setComentarioCriado] = useState(false);

    const { user } = useContext(AuthContext);

    const criarNovoComentario = async (e) => {
        e.preventDefault();

        try {
            const novoComentario = {
                nomePais,
                experiencia,
                valor,
                Dias: props.dias,
                nomeUsuario: user.nome,
                idUsuario: user.uid
            };

            const comentarioRef = doc(collection(db, "comentarios"));
            await setDoc(comentarioRef, novoComentario);
            setComentarioCriado(true);
            setNomePais("");
            setExperiencia("");
            setValor(0);
            props.zerar();
        } catch (error) {
            console.error("Erro ao criar o comentário:", error);
        }
    };

    const adicionarDia = () => {
        props.incremento();
    };

    const removerDia = () => {
        props.decremento();
    };

    return (
        <div className="tudo">
            <h1>Criar um novo comentário</h1>
            <form onSubmit={criarNovoComentario}>
                <label>
                    Nome do País:
                    <input
                        type="text"
                        value={nomePais}
                        onChange={(e) => setNomePais(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Como foi sua experiência:
                    <input
                        type="text"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Quanto você gastou nesse país:
                    <input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <label>
                    Por quantos dias você viajou:
                    <input
                        type="text"
                        value={props.dias}
                        onChange={(e) => props.incremento(parseInt(e.target.value))}
                    />
                </label>
                <button className="btn1" type="button" onClick={adicionarDia}>Adicionar Dia</button>
                <button type="button" onClick={removerDia}>Remover Dia</button>
                <br />
                <button type="submit">Criar novo Comentário</button>
            </form>

            {comentarioCriado && (
                <div>
                    <p>Novo comentário criado com sucesso!</p>
                    <Link to="/comentarios">Voltar para a Lista de Comentários</Link>
                </div>
            )}
        </div>
    );
}

const mapState = (state) => {
    return {
        dias: state.count
    };
};

const mapAssociate = (dispatch) => {
    return {
        incremento: () => dispatch({ type: 'INCREMENTO' }),
        decremento: () => dispatch({ type: 'DECREMENTO' }),
        zerar: () => dispatch({ type: 'ZERAR' })
    };
};

export default connect(mapState, mapAssociate)(CriarComentario);
