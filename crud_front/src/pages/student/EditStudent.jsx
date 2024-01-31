import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { URL_BASE } from "../../helper";
import toast from "react-hot-toast";
import useApiData from "../../hooks/useApiData";
import { useAuthContext } from "../../store/authCtxProvider";

function EditStudent() {
  const { studentId } = useParams();
  const { token } = useAuthContext();
  const [student, setStudent] = useApiData(`${URL_BASE}students/${studentId}`);
  console.log("student ===", student);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: student.firstname ?? "",
      lastname: student.lastname ?? "",
      email: student.email ?? "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstname: Yup.string().min(3).max(64).required(),
      lastname: Yup.string().min(3).max(64).required(),
      email: Yup.string().email().min(3).max(128).required(),
    }),
    onSubmit: (values) => {
      sendPutData(values);
    },
  });

  const sendPutData = (data) => {
    axios
      .put(`${URL_BASE}students/${studentId}`, data, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        toast.success("New student was updated");
        console.log("resp.data.msg ===", resp.data);
        navigate("/list");
      })
      .catch((error) => {
        console.log("error put ===", error);
        toast.error(error.response.error);
      });
  };
  return (
    <div className="container mx-auto mt-5 flex-col">
      <h1 className="text-3xl my-5">Edit student {student.firstname}</h1>
      <p className="my-5">Edit student page</p>
      <form className="w-full mx-auto max-w-sm" onSubmit={formik.handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="firstname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched["firstname"] && formik.errors["firstname"] && (
            <p className="text-red-600">{formik.errors["firstname"]}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched["lastname"] && formik.errors["lastname"] && (
            <p className="text-red-600">{formik.errors["lastname"]}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched["email"] && formik.errors["email"] && (
            <p className="text-red-600">{formik.errors["email"]}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
