
import './App.css';
import { Chat } from './Components/Chat';
import { Siderbar } from './Components/Siderbar';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <div className='Appcontent'>
      <Siderbar/>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/Groups/:id' element={<Chat/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
