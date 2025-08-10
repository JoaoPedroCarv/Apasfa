import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './detalhes.css'

function DetalhesPais() {
    const [paises, setPaises] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        const Detalhes = async () => {
            try {
                const resposta = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
                setPaises([resposta.data[0]]);
            } catch (error) {
                console.error('Erro ao buscar detalhes do país:', error);
                setPaises([]);
            }
        };

        Detalhes();
    }, [id]);

    return (
        <div>
            {console.log(`https://restcountries.com/v3.1/alpha/${id}`)}

            {paises.map((pais) => (
                <div className='coluna' key={pais.cca2}>
                    <h1>{pais.name?.common}</h1>
                    <img
                        src={pais.flags?.png}
                        alt=''
                        width="450"
                        height="300"
                    />
                    <h3>Capital: {pais?.capital}</h3>
                    <h3>População: {pais?.population}</h3>
                    <h3>Lado da rua: {pais.car?.side}</h3>
                    <h3>Formato do código postal: {pais.postalCode?.format}</h3>
                    <h3>Região e sub região: {pais?.region} / {pais?.subregion}</h3>
                    <h2>Brasão de armas</h2>
                    <img
                        src={pais.coatOfArms?.png}
                        alt=''
                        width="450"
                        height="350"
                    />
                </div>
            ))}
        </div>
    );
}

export default DetalhesPais;
