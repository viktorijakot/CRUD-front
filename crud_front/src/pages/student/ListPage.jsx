import useApiData from "../../hooks/useApiData";

function ListPage() {
  const [studentList] = useApiData("http://localhost:3000/api/students");

  return (
    <div className="container p-4">
      <h1 className="text-4xl">Student list</h1>
      <div className="mt-3">
        <table className="table-auto">
          <thead></thead>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
