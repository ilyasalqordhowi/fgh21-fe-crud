import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";

function Edit() {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const [edit, setEdit] = React.useState([
    {
      name: "",
      email: "",
    },
  ]);
  const [pass, setPass] = React.useState("password");
  function eyePassword() {
    if (pass === "password") {
      setPass("text");
    } else {
      setPass("password");
    }
  }
  useEffect(() => {
    async function update() {
      const response = await fetch("http://localhost:8888/users" + "/" + id);
      console.log(response);
      const json = await response.json();
      setEdit(json.results);
      console.log(edit);
    }
    update();
  }, []);

  const formik = useFormik({
    onSubmit: dataUpdate(),
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    onSubmit: dataUpdate,
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(50, "Must be 15 characters or less")
        .required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
  });

  async function dataUpdate() {
    const fullname = formik.values.fullname;
    const email = formik.values.email;
    const password = formik.values.password;

    const formData = new URLSearchParams();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("password", password);

    const dataNew = await fetch("http://localhost:8888/users/" + id, {
      method: "PATCH",
      body: formData,
    });
    const response = await dataNew.json();
    if (response.success) {
      window.alert("berhasil");
      navigate("/");
    } else {
      window.alert("gagal");
      console.log("gagal");
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[400px] gap-[50px]  items-center justify-center"
      >
        <div className="flex-col flex gap-[10px]">
          <Link to="/">
            <button className="hover:text-blue-700 flex gap-[10px] items-center ">
              <FaChevronLeft />
              <div>Back to List data</div>
            </button>
          </Link>
          <label>full name</label>
          <input
            type="text"
            name="fullname"
            onChange={formik.handleChange}
            defaultValue={edit[0].name}
            className={
              formik.errors.fullname && formik.touched.fullname
                ? "border border-red-500 rounded-md p-[5px] block w-full rounded-md focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full rounded-md  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <p className="text-red-500">{formik.errors.fullname}</p>
          )}
          <label>email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            defaultValue={edit[0].email}
            className={
              formik.errors.email && formik.touched.email
                ? "border border-red-500 rounded-md p-[5px] block w-full rounded-md focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-black rounded-md p-[5px] block w-full rounded-md  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
          <label>password</label>
          <div
            className={
              formik.errors.password && formik.touched.password
                ? "border border-red-500 p-[5px] block w-full rounded-md focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : " border border-blue-500 p-[5px] block w-full rounded-md  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }
          >
            <input
              type={pass}
              name="password"
              onChange={formik.handleChange}
              className="outline-none "
            />
            <button onClick={eyePassword} type="button">
              <FaEye />
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white rounded-md w-[200px] p-[10px]"
        >
          SAVE
        </button>
      </form>
    </div>
  );
}
export default Edit;
