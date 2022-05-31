import logo from './logo.svg';
import './App.css';
import AddList from './Components/AddList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './Components/Edit';
import List from './Components/List';

function App() {
  return (
    <div className="App">
         <BrowserRouter>
     <Routes>

      <Route path="/" element={ <AddList/>} />
      <Route path="/edit/:index" element={<Edit/>} />
      <Route path="/list" element={<List/>} />
     </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
