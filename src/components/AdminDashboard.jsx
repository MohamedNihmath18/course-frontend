import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://course-backend-vf2z.onrender.com/api/admin/students", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const assignGrade = async (studentId, grade) => {
    await fetch("https://course-backend-vf2z.onrender.com/api/grades/assign-grade", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ studentId, grade }),
    });

    alert(`Grade ${grade} assigned!`);
    window.location.reload();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <LogoutButton />
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.course}</td>
                <td className="p-2">{student.grade || "Not Graded"}</td>
                <td className="p-2">
                  <button onClick={() => assignGrade(student._id, "A")} className="bg-blue-500 text-white px-3 py-1 rounded">A</button>
                  <button onClick={() => assignGrade(student._id, "B")} className="bg-green-500 text-white px-3 py-1 rounded ml-2">B</button>
                  <button onClick={() => assignGrade(student._id, "C")} className="bg-yellow-500 text-white px-3 py-1 rounded ml-2">C</button>
                  <button onClick={() => assignGrade(student._id, "F")} className="bg-red-500 text-white px-3 py-1 rounded ml-2">F</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
