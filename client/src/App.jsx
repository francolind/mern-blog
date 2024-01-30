import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Dashboard from './Dashboard'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Project from './Project'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/signup' element={<SignUp/>}/> 
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Project' element={<Project/>}/>
        
      </Routes>
      
    </BrowserRouter>
     
  )
}

export default App
