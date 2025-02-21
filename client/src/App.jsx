
import './App.css';
import Header from './Header';
import Post from './Post';
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Index from './pages/Index'
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import Postpage from './pages/Postpage';
import Editpost from './pages/Editpost';
function App() {


  return (
    <UserContextProvider>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={
            <Index />
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<Postpage/>} />
          <Route path='/edit/:id' element={<Editpost/>} />
        </Route>


      </Routes>
    </UserContextProvider>



  )
}

export default App
