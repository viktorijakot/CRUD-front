import { URL_BASE } from "../../helper";
import useApiData from "../../hooks/useApiData";

function ListPage() {
  const [studentList, setStudentList] = useApiData(`${URL_BASE}students`);

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
              <tr key={studentas.id} className="bg-gray-200">
                <td className="border px-4 py-2">{studentas.id}</td>
                <td className="border px-4 py-2">{studentas.firstname}</td>
                <td className="border px-4 py-2">{studentas.lastname}</td>
                <td className="border px-4 py-2">{studentas.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
