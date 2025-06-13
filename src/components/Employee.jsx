import React, { useState, useEffect } from "react";
import { addEmployee, getEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function EmployeePage() {
  const [emp, setEmp] = useState({ name: "", position: "" });
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setList(res.data);
    } catch {
      alert("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      await addEmployee(emp);
      alert("Employee added");
      setEmp({ name: "", position: "" }); // clear form
      fetchEmployees(); // refresh list
    } catch {
      alert("Add failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage, depending on your auth
    navigate("/login"); // redirect to login page
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Employee Page</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div>
        <h3>Add Employee</h3>
        <input
          placeholder="Name"
          value={emp.name}
          onChange={(e) => setEmp({ ...emp, name: e.target.value })}
        />
        <input
          placeholder="Position"
          value={emp.position}
          onChange={(e) => setEmp({ ...emp, position: e.target.value })}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <h3>Employee List</h3>
      <ul>
        {list.map((e, idx) => (
          <li key={idx}>{e.name} - {e.position}</li>
        ))}
      </ul>
    </div>
  );
}
