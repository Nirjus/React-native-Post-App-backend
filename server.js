import colors from "colors";
import app from "./App.js";
import connectDB from "./config/db.js";
import { port } from "./secret/secret.js";

app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`.bgMagenta);
    await connectDB();
})

