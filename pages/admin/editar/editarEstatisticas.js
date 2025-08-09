// --- ARQUIVO FINAL E BLINDADO: src/pages/admin/editarEstatisticas.js ---

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../../services/firebaseConnection';
import '../admin.css';

export default function EditarEstatisticas() {
  const [stats, setStats] = useState({
    animaisEncontrados: 0,
    animaisCastrados: 0,
    animaisRecuperados: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      const docRef = doc(db, 'estatisticas', 'geral');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStats(docSnap.data());
        } else {
          console.warn("Documento de estatísticas não encontrado! Ele será criado no primeiro salvamento.");
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas no useEffect:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // FUNÇÃO DE INPUT MAIS SEGURA
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Converte o valor para um inteiro. Se o campo ficar vazio ou inválido, ele se torna 0.
    const numericValue = parseInt(value, 10);
    setStats(prev => ({ ...prev, [name]: isNaN(numericValue) ? 0 : numericValue }));
  };

  // FUNÇÃO DE SALVAMENTO MAIS ROBUSTA
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // 1. Cria um objeto limpo apenas com os dados que queremos salvar.
    const dataToSave = {
      animaisEncontrados: stats.animaisEncontrados,
      animaisCastrados: stats.animaisCastrados,
      animaisRecuperados: stats.animaisRecuperados,
    };

    // 2. LOG DE DIAGNÓSTICO: Verifique no console se este objeto está correto.
    console.log("Objeto a ser salvo no Firestore:", dataToSave);

    try {
      const docRef = doc(db, 'estatisticas', 'geral');
      await setDoc(docRef, dataToSave, { merge: true });

      alert('Estatísticas salvas com sucesso!');

      // 3. LOG DE CONFIRMAÇÃO: Vamos verificar o que realmente está no banco de dados.
      const updatedDoc = await getDoc(docRef);
      console.log("Dados no Firestore após salvar:", updatedDoc.data());

    } catch (error) {
      console.error("Erro CRÍTICO ao salvar estatísticas: ", error);
      alert('Erro ao salvar. Verifique o console para mais detalhes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Carregando estatísticas...</p>;
  }

  return (
    <form className="stats-form" onSubmit={handleSave}>
      <div className="input-group">
        <label htmlFor="animaisEncontrados">Animais Encontrados</label>
        <input
          type="number"
          id="animaisEncontrados"
          name="animaisEncontrados"
          value={stats.animaisEncontrados}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="animaisCastrados">Animais Castrados</label>
        <input
          type="number"
          id="animaisCastrados"
          name="animaisCastrados"
          value={stats.animaisCastrados}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="animaisRecuperados">Animais Recuperados</label>
        <input
          type="number"
          id="animaisRecuperados"
          name="animaisRecuperados"
          value={stats.animaisRecuperados}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn-edit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar Estatísticas'}
      </button>
    </form>
  );
}