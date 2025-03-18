import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Cabecera } from './app/components/contenedor/Cabecera';
import { Ruteo } from './app/routes/Ruteo';
import { ToastContainer } from 'react-toastify';
import { Footer } from './app/components/contenedor/Footer';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Cabecera />
      <div className="mt-3">
        <Ruteo />
      </div>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;
