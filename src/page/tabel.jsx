import { FaTrash } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Tabel() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function newData() {
      try {
        const response = await fetch("http://localhost:8888/users");
        if (!response.ok) {
          throw new Error(`response status ${response.status}`);
        }
        const json = await response.json();
        const addName = json.results.map((i) => {
          return {
            id: i.id,
            name: i.name,
            email: i.email,
            password: i.password,
          };
        });
        setData(addName);
      } catch (error) {
        console.error(error.message);
      }
    }
    newData();
  }, []);
  async function btnDelete(id) {
    const response = await fetch("http://localhost:8888/users/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    window.alert("terhapus");
    setData(json.results);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-[10px] w-[375px] p-[10px]">
        <div className="flex bg-blue-400 p-[10px] rounded-md justify-center">
          <Link to="/create">
            <button className="flex gap-[10px]  items-center">
              <FaPlus />
              <h1>Create data</h1>
            </button>
          </Link>
        </div>
        <table border={1}>
          <thead>
            <tr className="border">
              <th className="border border-black p-[10px]">Id</th>
              <th className="border border-black p-[10px]">Nama</th>
              <th className="border border-black p-[10px]">Email</th>
              <th className="border border-black p-[10px]">Delete</th>
              <th className="border border-black p-[10px]">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((items) => {
              return (
                <tr>
                  <td className="border border-black p-[10px]">{items.id}</td>
                  <td className="border border-black p-[10px]">{items.name}</td>
                  <td className="border border-black p-[10px]">
                    {items.email}
                  </td>
                  <td className="border border-black p-[10px]">
                    <button onClick={() => btnDelete(items.id)}>
                      <FaTrash />
                    </button>
                  </td>
                  <td className="border border-black p-[10px]">
                    <Link to={`/edit/${items.id}`}>
                      <button>
                        <FaPenToSquare />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Tabel;
