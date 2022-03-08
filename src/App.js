import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminApp from './pages/AdminApp';
import DesignerApp from './pages/DesignerApp';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="*" element={<DesignerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
