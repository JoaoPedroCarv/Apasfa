import { Routes, Route, } from 'react-router-dom'


import Login from '../pages/login';
import Inicio from '../pages/inicio';
import DetalhesPais from '../pages/detalhesPais';
import CriarConta from '../pages/criarConta';
import Comentarios from '../pages/comentarios';
import CriarComentario from '../pages/novoComentario';
import EditarComentario from '../pages/editarComentario';


import Private from './private'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/logar" element={<Login />} />
      <Route path="/registrar" element={<CriarConta />} />
      <Route path="/" element={<Inicio />} />
      <Route path="/detalhes/:id" element={<DetalhesPais />} />
      <Route path="/comentarios" element={<Comentarios />} />
      <Route path='/novoComentario' element={<Private><CriarComentario /></Private>} />
      <Route path='/editarComentario/:id' element={<Private><EditarComentario /></Private>} />
    </Routes>
  )
}

export default RoutesApp;