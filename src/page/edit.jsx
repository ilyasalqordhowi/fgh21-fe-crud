import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
function Edit() {
  let { id } = useParams();
  console.log(id);
  const [pass, setPass] = React.useState("password");
  function password() {
    if (pass === "password") {
      setPass("text");
    } else {
      setPass("password");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        // onSubmit={dataUpdate}
        className="flex flex-col w-[400px] gap-[50px]  items-center justify-center"
      >
        <div className="flex-col flex gap-[10px]">
          <Link to="/">
            <button className="hover:text-blue-700  flex gap-[10px] items-center ">
              <FaChevronLeft />
              <div>Back to List data</div>
            </button>
          </Link>
          <label>full name</label>
          <input
            type="text"
            name="fullname"
            className=" border border-black rounded-md p-[5px]"
          />
          <label>email</label>
          <input
            type="email"
            name="email"
            className="border border-black rounded-md p-[5px]"
          />
          <label>password</label>
          <div className="flex border p-[5px] rounded-md border-black">
            <input type={pass} name="password" className="outline-none" />
            <button onClick={password} type="button">
              <FaEye />
            </button>
          </div>
        </div>
        <button className="bg-black text-white rounded-md w-[200px] p-[10px]">
          SAVE
        </button>
      </form>
    </div>
  );
}
export default Edit;
