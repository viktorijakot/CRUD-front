import useApiData from "../../hooks/useApiData";

function ListPage() {
  const [studentList] = useApiData("http://localhost:3000/api/students");

  return (
    <div className="container flex-col p-4">
      <h1 className="text-4xl">Studentu sarasas</h1>

      <div className="mt-3">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
