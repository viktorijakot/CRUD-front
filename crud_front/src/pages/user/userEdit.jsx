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

  const [user, setUser] = useApiData(`${URL_BASE}user/${id}`) ?? {
    email: "",
    scope: "",
    verified: false,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email ?? "",
      password: "",
      scope: user.scope ?? "",
      verified: user.verified ?? false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).max(64).required(),
      password: Yup.string().min(3).max(64).optional(),
      scope: Yup.string().min(3).max(64).required(),
      verified: Yup.bool(),
    }),
    onSubmit: (values) => {
      sendPutData(values);
    },
  });

  function sendPutData(data) {
    axios
      .put(`${URL_BASE}user/${id}`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate("/user-list");
        toast.success("Vartotojo informacija sėkmingai atnaujinta!");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="container flex-col mx-auto mt-5">
      <h1 className="text-3xl my-5">Vartotojo redagavimas</h1>

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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
