import useApiData from "../../hooks/useApiData";
import { URL_BASE } from "../../helper";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useAuthContext } from "../../store/authCtxProvider";

export default function UserListPage() {
  const [userList, setUserList] = useApiData(`${URL_BASE}user`);

  const [filterValue, setFilterValue] = useState("");

  const { userId, token } = useAuthContext();

  console.log("userId ===", userId);
  const deleteUser = async (id) => {
    axios
      .delete(`${URL_BASE}user/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        toast.success(`Vartotojas ID: ${id} sėkmingai ištrintas!`);

        const list = userList.filter((user) => user.id !== id); //only remove the selected row
        setUserList(list);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) =>
      user.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [userList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container flex-col mx-auto p-4">
      <h1 className="text-4xl">Vartotojų sarasas</h1>

      <div className="mt-5">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleFilterChange}
          value={filterValue}
          placeholder="Pasieška"
        />
      </div>

      <div className="mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">El. paštas</th>
              <th className="px-4 py-2">Rolė</th>
              <th className="px-4 py-2">Patvirtintas</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="bg-gray-200">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.scope}</td>
                <td className="border px-4 py-2">
                  {user.verified ? "Taip" : "Ne"}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/user-edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Redaguoti
                  </Link>
                  {userId !== user.id && (
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Ištrinti
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
