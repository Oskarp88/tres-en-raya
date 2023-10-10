import express from 'express';
import cors from 'cors';
import {StreamChat} from 'stream-chat';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

const serverClient =  StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET);

app.post('/signup', async (req, res) => {
   try {
    const {firstName, lastName, username, password} = req.body;
    console.log('body', firstName, lastName, username, password);
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    console.log(token, userId, firstName, lastName, username, hashedPassword);
    res.json({token, userId, firstName, lastName, username, hashedPassword});
   } catch (error) {
     res.json(error)
   }
});
app.post('/login', async(req, res) => {
   try {
    const {username, password} = req.body;
    const {users} = serverClient.queryUsers({name: username});
    if(users.length === 0) return res.json({message: 'User not found'});
    const token = serverClient.createToken(users[0].id);

    const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
    if(passwordMatch){
      res.json({
        token,
         firstName: users[0].firstName, 
         lastName: users[0].lastName,
         username,
         userId: users[0].id,
        })
    }
   } catch (error) {
     console.log(error);
   }
  });

app.listen(3001, () => {
    console.log('Servidor funcionando 3001');
});