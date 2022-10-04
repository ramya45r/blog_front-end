
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/HomePage/Users/Register/Register";

function App() {
  return (
    <div>

      <Router>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />

         
        </Routes>

      </Router>

    </div>
  );
}

export default App;
