import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/student/ListPage";
import CreateStudent from "./pages/student/CreateStudent";

function App() {
  return (
    <>
      <div className="">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/create" element={<CreateStudent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
