import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
       await db.dropCollection("artists");
       await db.dropCollection("albums");
       await db.dropCollection("tracks");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    const [User1, User2] = await User.create({
        username: "user",
        password: "password",
        token: crypto.randomUUID()
    }, {
        username: "user_2",
        password: "password",
        token: crypto.randomUUID()
        });

    const [Post1, Post2] = await Post.create({
        title: "What’s One Small Habit That Changed Your Life?",
        description: "We often hear about massive changes and life overhauls, but sometimes it's the smallest habits that have the biggest impact. Maybe it's journaling for 5 minutes, drinking more water, or just walking around the block every morning. What’s a small habit that made a meaningful difference in your life? Share yours and let’s inspire each other.",
        image: "fixtures/picture1.jpg",
        user: User1
    }, {
        title: "What’s the Most Underrated App or Tool You Use Daily?",
        description: "From obscure productivity tools to weird browser extensions—what helps you out every day but no one seems to talk about?",
        user: User2
        }
    );

    await Comment.create({
        user: User1,
        post: Post1,
        text: 'Starting each morning by making my bed. It takes 30 seconds, but it gives me a tiny sense of order and control that sets the tone for the whole day.'
    }, {
        user: User2,
            post: Post1,
            text: 'Drinking a full glass of water right after waking up. I used to go straight for coffee, but this one simple change made me feel way more awake and less sluggish.'
    }, {
        user: User1,
        post: Post2,
        text: 'Notion. I know it\'s kind of popular, but I still feel like most people don\'t realize how powerful it is for organizing literally everything—from grocery lists to work projects.'
        }, {
            user: User1,
            post: Post2,
            text: 'Clipboard history manager (like Paste on Mac). Total lifesaver when you copy/paste a lot. Can’t believe I worked without one for so long.'
        }
     );

    await db.close()
};

run().catch(console.error);