import React from 'react'
import { useSelector } from 'react-redux'
import sessionService from '../service/sessionService'
import { Navigate, useLocation } from 'react-router-dom'
import { useAccessStore } from "../store";

const AuthRouter = ({children}:{children:any}) => {
    const access = useAccessStore();
    const location = useLocation()

    return children

    if (access.isAuthorized()) {
        return children
    } else {
        return <Navigate to='/auth' replace state={{from: location}}/>
    }
}
export default AuthRouter;
