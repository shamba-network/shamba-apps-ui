import { Outlet } from "react-router-dom"

export const AuthRoot: React.FC = () => {
    return (
        <div className="root-container">
            <Outlet />
        </div>
    )
}
