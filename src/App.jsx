import { Route, Routes } from "react-router-dom";
import Tramos from "./containers/Tramos";
import Clientes from "./containers/Clientes";
import TopPeores from "./containers/TopPeores";
import Appbar from "./components/AppBar";
import Index from "./containers/Index";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Index />
      <Routes>
        <Route path="/" element={<Tramos />} />
        <Route path="/tramos" element={<Tramos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/top-peores" element={<TopPeores />} />
      </Routes>
    </div>
  );
}

export default App;
