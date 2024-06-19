import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import apiErrorHandler from "./middlewares/apiErrorHandler.js";
import cors from "cors";
import mongodb_url from "./config/db.js";
import usersRouter from "./routes/Users.route.js";
import coursesRouter from "./routes/Courses.route.js";
import { courses } from "./seed/user.js";

config({
  path: "./config/.env",
});
// const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
console.log("🚀 ~ envMode:", process.env.NODE_DEV);
console.log("🚀 ~ envMode:", process.env.PORT);
const PORT = process.env.PORT || 3000;

// cors config 
const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("HI FROM BACKEND");
});

// courses()
// routes 

app.use("/api/v1/", usersRouter);

app.use("/api/v1/", coursesRouter);

app.use(apiErrorHandler);


mongodb_url()
.then(() =>{
  app.listen(PORT, (req,res) =>{
    console.log(`Server is listening on port ${process.env.PORT}`);
  })
})
.catch((error) =>{
  console.log(`MongoDb connection error ${error}`)
})

export default app


