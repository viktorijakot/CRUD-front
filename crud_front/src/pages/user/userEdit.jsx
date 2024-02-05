import { useFormik } from "formik";
import * as Yup from "yup";
import useApiData from "../../hooks/useApiData.jsx";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../../helper.js";
import { useAuthContext } from "../../store/authCtxProvider.jsx";

export default function UserEdit() {
  const { id } = useParams();

  const { token } = useAuthContext();

  const navigate = useNavigate();

  const [student, setStudent] = useApiData(`${URL_BASE}user/${id}`) ?? {
    firstname: "",
    lastname: "",
    email: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: student.firstname ?? "",
      lastname: student.lastname ?? "",
      email: student.email ?? "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3).max(64).required(),
      lastname: Yup.string().min(3).max(64).required(),
      email: Yup.string().email().min(3).max(128).required(),
    }),
    onSubmit: (values) => {
      sendPutData(values);
    },
  });

  function sendPutData(data) {
    axios
      .put(`${URL_BASE}students/${id}`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate("/user-list");
        toast.success("Studento informacija sėkmingai atnaujinta!");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container flex-col mx-auto mt-5">
      <h1 className="text-3xl my-5">
        Redaguoti vartotoja {student.firstname} {student.lastname}
      </h1>
      <p className="my-5">Esamo studento redagavimo puslapis</p>
      <form className="w-full mx-auto max-w-sm" onSubmit={formik.handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="firstname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Vardas
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
            Pavardė
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
            EL. paštas
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
            Atnaujinti
          </button>
        </div>
      </form>
    </div>
  );
}
