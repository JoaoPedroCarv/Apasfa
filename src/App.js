import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/rotas';
import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import AuthProvider from './context/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
