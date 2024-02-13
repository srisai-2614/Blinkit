import { Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import Upload from './components/Upload/Upload'
import './App.css'
function App() {
  return (
    <>
      <div className='BlinkitImg'>
          <img src="https://blinkit.com/blog/sites/default/files/blog%20logo_0.png" alt='Home'/>
      </div>
      <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/home' element={<Upload/>}/>
      </Routes>
      </>
  );
}

export default App;


