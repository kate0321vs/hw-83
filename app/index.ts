import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";
import commentsRouter from "./routers/comments";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use("/comments", commentsRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/forum');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect()
    })
};

run().catch((err) => console.error(err));