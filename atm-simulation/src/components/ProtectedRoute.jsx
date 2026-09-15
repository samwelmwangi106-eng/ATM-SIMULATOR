import { Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
// ProtectedRoute prevents unauthenticated users
// from accessing protected pages.

function ProtectedRoute() {
    const {isAuthenticated} = useAuth();

     // If the user isn't logged in, redirect them to login.
     if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
     }
    //  If authenticated, render the requested child route
    return <Outlet/>
  return (
    <div>
      
    </div>
  )
}

export default ProtectedRoute
