import { Outlet } from "react-router-dom"

const AuthRoot = () => {
    return (
        <div className="root-container">
            <Outlet />
        </div>
    )
}

export default AuthRoot