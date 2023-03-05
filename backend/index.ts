import mongoose from "mongoose";
import app from "./app";

/* Mongoose Setup */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* Only Add Data Once */
    // Student.insertMany(dataStudent);
  })
  .catch((error) => console.log(`${error} did not connect`));
