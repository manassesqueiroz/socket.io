import express from "express";
import { Server as typeServe ,createServer } from "http";
import { Server } from "socket.io";

class App {
    public app: express.Application
    public httpServer: typeServe
    private io: Server;

    constructor() {
        this.app = express()
        this.httpServer = createServer(this.app)
        this.io = new Server(this.httpServer,{cors:{
            origin: '*' // or client url exemplo 'http://localhost:3000' 
        }})

        this.io.on("connection", (socket) => {
            console.log(`user:  ${socket.id}`)
            socket.on('message' , (message) => {
                
                console.log( 'passando aqui',message)
                socket.broadcast.emit('message', message)
            })

            socket.on("disconnect", (reason) => {
                console.log(`socket ${socket.id} disconnected due to ${reason}`);
              });
        })
    }
    
}

export default App