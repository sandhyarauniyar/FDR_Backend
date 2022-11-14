const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use("/", require("./routes"));

app.listen((port = process.env.PORT || 5000), () => {
    console.log(`The Food Done Right App is Up and Running at Port: ${port}`);
});
