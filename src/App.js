import './App.css';
import Reset from './Components/Reset';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { AuthProvider } from './Context/Authcontext';
import Feed from './Components/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './Components/Profile';
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
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Feed/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Route>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
      </AuthProvider>
    </Router>
    // <Ioa/>
  );
}

export default App;
