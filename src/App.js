
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Public/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";

function App() {
  return (
    <div>

      <Router>
       <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
         
        </Routes>

      </Router>

    </div>
  );
}

export default App;
