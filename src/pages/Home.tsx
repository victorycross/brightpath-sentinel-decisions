import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Exception Management</h1>
      <div className="space-y-4">
        <Link 
          to="/admin/roles" 
          className="text-blue-600 hover:text-blue-800 underline block"
        >
          Manage User Roles (Admin Only)
        </Link>
      </div>
    </div>
  );
};