// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (role) => {
//     const endpoint = role === "admin" ? "login-admin" : "login-student";
//     localStorage.setItem("userEmail", email);

//     const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
      
//     });

//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("token", data.token);
//       role === "admin" ? navigate("/admin") : navigate("/student");
//     } else {
//       alert(data.msg);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-96">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
//       <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={() => handleLogin("student")}>Login as Student</button>
//       <button className="w-full bg-green-500 text-white py-2 rounded mt-2" onClick={() => handleLogin("admin")}>Login as Admin</button>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      navigate("/student");
    } else {
      alert(data.msg || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Login</h2>
        <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleLogin}>Login</button>
        <p className="mt-3 text-center text-sm">
          Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
        </p>
        <p className="mt-2 text-center text-sm">
          <a href="/admin-login" className="text-red-500">Admin Login</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
