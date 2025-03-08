import { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";

const StudentPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudentData = async () => {
    setLoading(true);
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("User email not found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://course-backend-vf2z.onrender.com/api/grades/students-with-grades", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await res.json();
      const student = data.find((s) => s.email === userEmail);
      setStudentData(student || null);
    } catch (err) {
      setError("Error fetching student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []); // ✅ Fetches the latest grade when page loads

  const downloadCertificate = () => {
    if (!studentData) return;
    window.open(`https://course-backend-vf2z.onrender.com/api/certificate/generate-certificate/${studentData._id}`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LogoutButton />
      <div className="bg-white p-6 rounded-lg shadow-md w-96 mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Dashboard</h2>

        {loading ? (
          <p className="text-center">Loading student data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : studentData ? (
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

            {/* Refresh Button to update data without re-login */}
            <button 
              className="w-full bg-gray-500 text-white py-2 rounded mt-3"
              onClick={fetchStudentData}
            >
              Refresh Data
            </button>
          </>
        ) : (
          <p className="text-red-500 text-center">No student data found. Please log in again.</p>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
