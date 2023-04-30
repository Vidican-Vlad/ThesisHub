import { config } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import devRoutes from "./routes/devRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js"

import cors from "cors";

const app = express();

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

const port = process.env.PORT || 3055;
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});