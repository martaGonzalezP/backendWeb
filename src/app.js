//Para poner en marcha el backend ejecuto el comando npm run dev. Puedo cambiar el comando dev por otro
//desde package.json en la parte de scripts
import express from 'express'
import morgan from 'morgan'     //Morgan nos permite ver en el terminal las peticiones hechas al backend 
import routerEntidad from './routes/routesEntidad.js'
import routesParada from './routes/routesParada.js'
import cors from 'cors';

const app = express()

app.use(morgan('dev2'))  //Si hacemos un get esto nos lo mostrara por el terminal
app.use(express.json()) //Esto es para convertir los req.body en formato json
app.use(cors())
//app.options('/productos/subirFoto', cors());
app.use('/entidades', routerEntidad)
app.use('/paradas', routesParada)

export default app;