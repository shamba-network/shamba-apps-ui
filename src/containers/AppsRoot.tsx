import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const AppsRoot =() => {
    return (
        <div className="root-container">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default AppsRoot