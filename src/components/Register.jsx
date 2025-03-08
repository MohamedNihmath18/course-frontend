import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [role, setRole] = useState("student"); // Default role: student
  const navigate = useNavigate();

  const handleRegister = async () => {
    // const endpoint = role === "admin" ? "register-admin" : "register-student";
    const endpoint = "register-student"; // Now it only registers students

    const response = await fetch(`https://course-backend-vf2z.onrender.com/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, ...(role === "student" && { course }) }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please login.");
      navigate("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <select
          className="w-full mb-3 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Register as Student</option>
          {/* <option value="admin">Register as Admin</option> */}
        </select>

        <input className="w-full mb-3 p-2 border rounded" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {role === "student" && (
          <input className="w-full mb-3 p-2 border rounded" type="text" placeholder="Course Name" value={course} onChange={(e) => setCourse(e.target.value)} />
        )}

        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-3 text-center text-sm">
          Already have an account? <a href="/" className="text-blue-500">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
