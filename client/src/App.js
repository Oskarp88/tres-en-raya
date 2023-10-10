import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';
import JoinGames from './components/JoinGames';

function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('hashedPassword');
    cookies.remove('channelName');
    cookies.remove('username');
    client.disconnectUser();
    setIsAuth(false)
  }

  if(token){
    client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      firstName: cookies.get('firstName'),
      lastName: cookies.get('lastName'),
      hashedPassword: cookies.get('hashedPassword'),
    }, token).then((user) => {
       setIsAuth(user);
    });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat>
          <JoinGames />
          <button onClick={logOut}>Log Out</button>
        </Chat>
      ): 
      <>
         <SignUp setIsAuth={setIsAuth}/>
         <Login />
      </>}
    </div>
  );
}

export default App;