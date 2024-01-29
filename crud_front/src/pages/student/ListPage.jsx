import axios from "axios";
import { URL_BASE } from "../../helper";
import useApiData from "../../hooks/useApiData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const [studentList, setStudentList] = useApiData(`${URL_BASE}students`);
  const navigate = useNavigate();

  const handleDelete = (studentId) => {
    axios
      .delete(`${URL_BASE}students/${studentId}`)
      .then((resp) => {
        toast.success("Student was deleted");
        console.log("resp.data.msg ===", resp.data);
        setStudentList(
          studentList.filter((student) => student.id !== studentId)
        );
      })
      .catch((error) => {
        console.log("error ===", error);
        toast.error(error.response.data.error);
      });
  };

  const handleUpdate = (studentId) => {
    navigate(`/edit/${studentId}`);
  };
  return (
    <div className="container flex-col p-4">
      <h1 className="text-4xl">Studentu sarasas</h1>

      <div className="mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Surname</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((studentas) => (
              <>
                <tr key={studentas.id} className="bg-gray-200">
                  <td className="border px-4 py-2">{studentas.id}</td>
                  <td className="border px-4 py-2">{studentas.firstname}</td>
                  <td className="border px-4 py-2">{studentas.lastname}</td>
                  <td className="border px-4 py-2">{studentas.email}</td>
                </tr>
                <div className="container">
                  <button
                    onClick={() => handleUpdate(studentas.id)}
                    className="me-5 my-2 mx-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(studentas.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
