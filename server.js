const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const booksRouter = require("./routes/books");

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});