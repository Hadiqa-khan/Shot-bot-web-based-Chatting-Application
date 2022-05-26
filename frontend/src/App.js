// Author Name : Hadiqa Khan
// Date of generation :10 May 2022
// Date of last revision : 11 May 2022
// Version number:2
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
//purpose: This the main react App from where routing will be done to other pages
function App() {
  return (
    <div className="App">
     <Route path="/" component={Homepage} exact />
     <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
