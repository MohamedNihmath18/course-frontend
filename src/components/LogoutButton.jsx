import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <button className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
