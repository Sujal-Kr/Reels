import './App.css';
import Reset from './Components/Reset';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { AuthProvider } from './Context/Authcontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route  exact path='/signup' element={<SignUp/>}>
        </Route>
        <Route exact path='/login' element={<>
          <Login/>
        </>}>
        </Route>
        <Route path="/" element={<PrivateRoute/>}/>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
