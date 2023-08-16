import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Machines from './features/inventory/inventory';
import MachineTypesComponent from './features/template/template';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Machines />} />
          <Route path="type/:id" element={<Machines />} />
          <Route path="types" element={<MachineTypesComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
