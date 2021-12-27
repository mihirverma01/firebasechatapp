import './App.css';
import { BrowserRouter, Routes ,Route } from "react-router-dom"
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
