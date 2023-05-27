import { config } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import devRoutes from "./routes/devRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import fileRoutes from "./routes/FileRoutes.js";
import messagingRoutes from "./routes/MessagingRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { authWS2 } from "./middleware/auth.js";

import cors from "cors";
import { createMessage, getUserSugestions } from "./Controllers/messagingController.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
	  origin: "*"
	}
  });
// socketIoHandler(io);

config();
connectDB();
app.use(cors({
	origin:"*"
}))

app.use(express.json({ extended: false }));
app.use("/auth", userRoutes);
app.use("/tag", tagRoutes);
app.use("/proposal", proposalRoutes);
app.use("/dev", devRoutes);
app.use("/category", categoryRoutes);
app.use("/file/", fileRoutes);
app.use("/messaging/", messagingRoutes);

const port = process.env.PORT || 3055;

io.use(authWS2);
io.on("connection", (socket)=>{
	console.log("new connection");
	socket.join(`${socket.user.id}`);
	socket.on("getSuggestions", async (arg) => {
		const users = await getUserSugestions(arg);
		socket.emit("sendSuggestions", users);
	  });
	socket.on("send_message", async (payload) =>{
		const message = await createMessage(payload, socket.user.id);
		io.to(socket.roomID).emit("new_message", message);
	});

	socket.on("select_conversation", (id) =>{
		socket.join(`${id}`);
		socket.roomID = id;
	})

	socket.on("new_conversation", (tempconv)=>{
		console.log(tempconv);
		socket.to(`${tempconv.user2._id}`).emit("new_conversation", tempconv)
	})


})

httpServer.listen(port, () => {
	console.log(`server started on port ${port}`);
});


