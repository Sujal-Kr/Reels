import React,{useContext} from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/Authcontext'
import Feed from  './Feed'

function PrivateRoute() {
    const {user} = useContext(AuthContext)
    if (user) {
      return <Feed/>
    } else {
      return <Navigate to="/login" replace />;
    }
}

export default PrivateRoute
