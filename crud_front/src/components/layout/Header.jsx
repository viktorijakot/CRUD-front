import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-stone-300">
      <header className=" flex justify-end items-center">
        <NavLink
          className="px-4 py-3 hover:bg-stone-500 hover:text-white"
          to={"/home"}
        >
          Home
        </NavLink>
        <NavLink
          className="px-4 py-3 hover:bg-stone-500 hover:text-white"
          to={"/create"}
        >
          Create new student
        </NavLink>
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
        <NavLink
          className="px-4 py-3  hover:bg-stone-500 hover:text-white"
          to={"/register"}
        >
          Register
        </NavLink>
      </header>
    </div>
  );
}

export default Header;
