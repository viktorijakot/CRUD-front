import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/student/ListPage";
import CreateStudent from "./pages/student/CreateStudent";
import EditStudent from "./pages/student/EditStudent";
import RegisterPage from "./pages/student/RegisterPage";
import HomePage from "./pages/student/HomePage";
import LoginPage from "./pages/student/LoginPage";
import UserCreate from "./pages/user/userCreate";
import UserList from "./pages/user/userList";
import UserEdit from "./pages/user/userEdit";

function App() {
  return (
    <>
      <div className="">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/edit/:studentId" element={<EditStudent />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-create" element={<UserCreate />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user-edit/:id" element={<UserEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
