import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import http from "http"
import pkg from "../package.json";
import "./database"
import { Server } from "socket.io"
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import {socket} from "./socket";

import { createRoles, createAdmin} from "./libs/initialSetup";


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})


socket(io)

createRoles();
createAdmin(); 

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
   origin: "*",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Kuepa Chat Api",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);


server.listen(app.get("port"));



console.log("Server on port", app.get('port'));

