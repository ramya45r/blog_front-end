
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Public/Navbar";
import Login from "./components/Users/Login/Login";
import Profile from "./components/Users/Profile/Profile";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
function App() {
  return (
    <div>

      <Router>
       <Navbar/>
        <Routes>
          <Route path='/add-category'element={<AddNewCategory/>} />
          <Route path='/category-List'element={<CategoryList/>} />
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />} />
         
        </Routes>

      </Router>

    </div>
  );
}

export default App;
