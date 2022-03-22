import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from './pages/AdminApp';
import DesignerApp from './pages/DesignerApp';
import GeneratedProduct from './pages/GeneratedProduct';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/products/:id" element={<GeneratedProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<DesignerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
