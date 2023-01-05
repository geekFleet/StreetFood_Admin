import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './screens/auth/loginScreen'
import Dashboard from './screens/app/dashboard'
import {Routes,Route} from 'react-router-dom'
import AuthUser from './components/authUser';
import Users from './components/users/users'
import Vendors from './components/vendors/vendors'
import NavBar from './components/navbar/NavBar'

function App() {
  const {getToken} = AuthUser();
  if(!getToken()){
    return <Login/>
  }
  return (
    <div>
       <NavBar/>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='user' element={<Users/>}/>
        <Route path='vendor' element={<Vendors/>}/>
        </Routes>
    </div>
  );
}

export default App;
