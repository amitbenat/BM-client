import { useContext } from "react"
import AuthContext from "../../store/auth-context"
import { Navigate } from 'react-router-dom'

const PrortectedRoute = ({ children, isProtected }) => {
    const authCtx =useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    if((!isLoggedIn && isProtected) || (isLoggedIn && !isProtected)){
        return <Navigate to='/' />
    }

    return children
}

export default PrortectedRoute