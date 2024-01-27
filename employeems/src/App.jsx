import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
