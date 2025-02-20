import express from "express";
const app = express();
import router from "./routes/tasks.routes.mjs";
import { connection as connectDB } from "./db/connect.db.mjs";
import { config } from "dotenv";
import notFound from "./middlewares/not-found.middlewares.mjs";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.mjs";

// ----------- middleware ------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// ------------ config file ------------------
config();

// -------------- routes ---------------
app.use("/api/v1/tasks", router);

// -------------- custom middleware ---------------
app.use(notFound);
app.use(errorHandlerMiddleware);

// -------------- server ---------------
const PORT = 3000;

// function to connect to the db
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting the server", error);
  }
};

start();
