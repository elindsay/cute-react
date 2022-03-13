import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from './pages/AdminApp';
import DesignerApp from './pages/DesignerApp';
import GeneratedProduct from './pages/GeneratedProduct';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/products/:id" element={<GeneratedProduct />} />
          <Route path="*" element={<DesignerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
