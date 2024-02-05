import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
// import Select from "react-select";
import { useAuthContext } from "../../store/authCtxProvider.jsx";
import { URL_BASE } from "../../helper.js";

export default function UserCreatePage() {
  const navigate = useNavigate();

  const { token } = useAuthContext();

  const options = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      scope: "",
      verified: 1,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .min(3)
        .max(128)
        .required("El. paštas privalomas laukas"),
      password: Yup.string()
        .min(3)
        .max(64)
        .required("Slaptažodis privalomas laukas"),
      scope: Yup.string().oneOf(["admin", "manager"]).required(),
      verified: Yup.boolean(),
    }),
    onSubmit: (values) => {
      sendPostData(values);
    },
  });

  function sendPostData(data) {
    axios
      .post(`${URL_BASE}user`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate("/user-list");
        toast.success("Naujas Vartotojas sėkmingai pridėtas");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container flex-col mx-auto mt-5">
      <h1 className="text-3xl my-5">Vartotojo sukūrimas</h1>

      <form className="w-full mx-auto max-w-sm" onSubmit={formik.handleSubmit}>
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
            value={formik.values["email"]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched["email"] && formik.errors["email"] && (
            <p className="text-red-600">{formik.errors["email"]}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Slaptažodis
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values["password"]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched["password"] && formik.errors["password"] && (
            <p className="text-red-600">{formik.errors["password"]}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="scope"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rolė
          </label>
          <select
            name="scope"
            id="scope"
            // options={options}
            value={formik.values["scope"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Pasirinkite role"
            className="rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched["scope"] && formik.errors["scope"] && (
            <p className="text-red-600">{formik.errors["scope"]}</p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="verified"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Vartotojas patvirtintas
          </label>
          <input
            type="checkbox"
            id="verified"
            name="verified"
            value="1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched["verified"] && formik.errors["verified"] && (
            <p className="text-red-600">{formik.errors["verified"]}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sukurti
          </button>
        </div>
      </form>
    </div>
  );
}
