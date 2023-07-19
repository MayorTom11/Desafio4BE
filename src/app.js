import express from "express"
import {engine} from "express-handlebars";
import {__dirname} from "./utils.js";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";

const port = 8080
const app = express()

// Midlewares
app.use(express.static(path.join(__dirname,"/public")))

// Servers
const httpServer = app.listen(port, ()=>console.log(`Server listening on port ${port}`))
const socketServer = new Server(httpServer)

// Configuracion handlebars con engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Comunicacion con el server de socket
socketServer.on("connection",async(socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`)
})


// Routes
app.use(viewsRouter)