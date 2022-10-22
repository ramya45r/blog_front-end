import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";

import Navbar from "./pages/navigation/publicNavbar/Navbar";
import Login from "./components/Users/Login/Login";
import Profile from "./components/Users/Profile/Profile";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import CreatePost from "./components/Posts/CreatePost/CreatePost";
import UpdatePassword from "./components/Users/password/UpdatePassword";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import PostsList from "./components/Posts/CreatePost/PostsList";
import PostDetails from "./components/Posts/CreatePost/PostDetails";
import Home from "./components/home/Home";
import UpdatePost from "./components/Posts/CreatePost/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import UsersList from "./components/Users/usersList/UsersList";



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/users" element={<UsersList/>} />
        <Route path="/update-profile/:id" element={<UpdateProfileForm/>} />
        <Route path="/update-comment/:id" element={<UpdateComment  />} />
        <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails/>} />
          <Route path="/add-category" element={<AddNewCategory />} />
          <Route path="/category-List" element={<CategoryList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route
            path="/upload-profile-photo"
            element={<UploadProfilePhoto />}
          />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/update-post/:id" element={<UpdatePost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
