import { Routes, Route, } from 'react-router-dom'


import Login from '../pages/login/login';
import Inicio from '../pages/inicio/inicio';
import DetalhesPais from '../pages/detalhesPais';
import CriarConta from '../pages/criarConta';
import Comentarios from '../pages/comentarios';
import CriarComentario from '../pages/novoComentario';
import EditarComentario from '../pages/editarComentario';
//import doacao from '../pages/doacao';
import Admin from '../pages/admin/admin';
import CadastroAnical from '../pages/admin/cadastroAnimal';
import Solicitacoes from '../pages/admin/solicitacoes';
import CadastrarEvento from '../pages/admin/cadastrarEvento';




import Private from './private'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/logar" element={<Login />} />
      <Route path="/registrar" element={<CriarConta />} />
      <Route path="/" element={<Inicio />} />
      <Route path="/doar" element={<doacao />} />
      <Route path="/detalhes/:id" element={<DetalhesPais />} />
      <Route path="/comentarios" element={<Comentarios />} />
      <Route path='/novoComentario' element={<Private><CriarComentario /></Private>} />
      <Route path='/editarComentario/:id' element={<Private><EditarComentario /></Private>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cadastroAnimal" element={<CadastroAnical />} />
      <Route path="/solicitacoes" element={<Solicitacoes />} />
      <Route path="/cadastrarEvento" element={<CadastrarEvento />} />

    </Routes>
  )
}

export default RoutesApp;