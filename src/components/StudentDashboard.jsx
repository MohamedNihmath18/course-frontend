import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    fetch("https://course-backend-vf2z.onrender.com/api/grades/students-with-grades", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const loggedInUserEmail = localStorage.getItem("userEmail");
        const student = data.find((s) => s.email === loggedInUserEmail);
        setStudentData(student);
      })
      .catch((err) => console.error("Error fetching student data:", err));
  }, []);

  const downloadCertificate = () => {
    if (!studentData) return;
    window.open(`https://course-backend-vf2z.onrender.com/api/certificate/generate-certificate/${studentData._id}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LogoutButton />
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Dashboard</h2>
        {studentData ? (
          <>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Course:</strong> {studentData.course}</p>
            <p><strong>Grade:</strong> {studentData.grade || "Not Graded Yet"}</p>
            {studentData.grade && (
              <button 
                className="w-full bg-blue-500 text-white py-2 rounded mt-3"
                onClick={downloadCertificate}
              >
                Download Certificate
              </button>
            )}
          </>
        ) : (
          <p>Loading student data...</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
