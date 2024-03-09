import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import * as bodyParser  from 'body-parser';

const server = new Server();

//Levantar Server
server.start();

//COnectar DB
mongoose.connect('mongodb+srv://dbFotosgramUser:JYVZMkSffm70E1Zo@cluster0.9u9oq9h.mongodb.net/?retryWrites=true&w=majority',
{appName: "Fotosgram"});
console.log('Base de datos ONLINE');

//Body parser
server.app.use( bodyParser.urlencoded()  );
server.app.use( bodyParser.json());

//Rutas de mi aplicación
server.app.use('/user', userRoutes);

