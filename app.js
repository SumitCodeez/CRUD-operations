const express = require("express");
const usersRouter = require("./routes/usersRouter");

const app = express();

app.use(express.json());

// Use user routes
app.use("/", usersRouter);

app.listen(3000 || process.env.PORT);
