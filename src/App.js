import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/PublicNavbar/Navbar";
import Login from "./components/Users/Login/Login";
import Profile from "./components/Users/Profile/Profile";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePassword from "./components/Users/password/PasswordManagement";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/add-category" element={<AddNewCategory />} />
          <Route path="/category-List" element={<CategoryList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/upload-profile-photo" element={<UploadProfilePhoto/>} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
