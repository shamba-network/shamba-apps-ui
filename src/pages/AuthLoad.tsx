import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { Spin } from "antd"

export const AuthLoad = () => {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    useEffect(() => {
        const fn = async () => isAuthenticated ? navigate("/apps") : await loginWithRedirect()
        fn()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    return (
        <div className="auth-load">
            <Spin size="large" />
        </div>
    )
}
