import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { Spin } from "antd"

const AuthLoad = () => {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    useEffect(() => {
        const fn = async () => await checkAuth()
        fn()
    })

    const checkAuth = async () => {
        isAuthenticated ? navigate("/apps") : await loginWithRedirect()
    }

    return (
        <div className="auth-load">
            <Spin size="large" />
        </div>
    )
}

export default AuthLoad