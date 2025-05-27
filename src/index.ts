import express from "express";
import sequelize from "./config/database.ts";
import dotenv from "dotenv";
import router from "./user/router.ts";
import "./user/models/User.ts";

dotenv.config();

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use("/user", router);

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });