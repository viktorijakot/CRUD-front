import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/authCtxProvider";
import toast from "react-hot-toast";

function Header() {
  const { isUserLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("login");
    toast.success("Logout");
  }

  return (
    <div className="bg-stone-300">
      <header className=" flex justify-end items-center">
        <NavLink
          className="px-4 py-3 hover:bg-stone-500 hover:text-white"
          to={"/home"}
        >
          Home
        </NavLink>
        {isUserLoggedIn && (
          <NavLink
            className="px-4 py-3 hover:bg-stone-500 hover:text-white"
            to={"/create"}
          >
            Create new student
          </NavLink>
        )}
        <NavLink
          className="px-4 py-3  hover:bg-stone-500 hover:text-white"
          to={"/list"}
        >
          Student list
        </NavLink>
        <NavLink
          className="px-4 py-3  hover:bg-stone-500 hover:text-white"
          to={"/edit/:studentId"}
        >
          Edit student
        </NavLink>
        {!isUserLoggedIn && (
          <>
            <NavLink
              className="px-4 py-3  hover:bg-stone-500 hover:text-white"
              to={"/register"}
            >
              Register
            </NavLink>
            <NavLink
              className="px-4 py-3  hover:bg-stone-500 hover:text-white"
              to={"/login"}
            >
              Login
            </NavLink>
          </>
        )}
        {isUserLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-4 py-3  hover:bg-stone-500 hover:text-white"
          >
            Logout
          </button>
        )}
      </header>
    </div>
  );
}

export default Header;
