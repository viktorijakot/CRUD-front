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
import PrivateRoute from "./privateRoute/privateRoute";
import AdminPrivateRoute from "./privateRoute/AdminPrivateRoute";

function App() {
  return (
    <>
      <div className="">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:studentId"
            element={
              <PrivateRoute>
                <EditStudent />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/user-create"
            element={
              <AdminPrivateRoute>
                <UserCreate />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <AdminPrivateRoute>
                <UserList />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/user-edit/:id"
            element={
              <AdminPrivateRoute>
                <UserEdit />
              </AdminPrivateRoute>
            }
          />
          {/* <Route path="/user-create" element={<UserCreate />} /> */}
          {/* <Route path="/user-list" element={<UserList />} />
          <Route path="/user-edit/:id" element={<UserEdit />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
