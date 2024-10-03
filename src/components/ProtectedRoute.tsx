import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?: ReactElement;
    isAuthenticated: boolean;
    isAdmin?: boolean;
    adminRoute?: boolean;
    redirect?: string;
}

const ProtectedRoute = ({children, isAuthenticated,  isAdmin, adminRoute, redirect = "/"}: Props) => {

    if(!isAuthenticated) return <Navigate to={redirect}/>
    if(adminRoute && !isAdmin) <Navigate to={redirect}/>
    return children ? children : <Outlet />
}

export default ProtectedRoute;