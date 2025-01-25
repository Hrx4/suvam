const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const blogModel = require("./models/blogModel");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const MONGODB_URI =
  "mongodb+srv://dragkamal71:nJpsGN4A1pHn9OFF@cluster0.zub33.mongodb.net/";

cloudinary.config({
  cloud_name: "dguddxadk", // Replace with your Cloudinary Cloud Name
  api_key: "927691489194442", // Replace with your API Key
  api_secret: "4Q1MqO9iASwovPvi4uIB6-but8Y", // Replace with your API Secret
});

// http://localhost:5000/ , https://suvam-svwu.vercel.app/

// Connect to MongoDB
const connection = async () => {
  await mongoose.connect(MONGODB_URI);
};
connection();
const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend to access the backend
  methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// Configure Multer with disk storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); // Save to 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Use unique file names
    },
  }),
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.post("/api/createData", upload.single("image"), async (req, res) => {

  const token = jwt.verify(req.cookies.admin_token, "secret");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { title, content , blogType } = req.body;

  if (!req.file) {
    await blogModel.create({ title, content , blogType });

    return res.status(200).send({ message: "No file uploaded." });
  }

  try {
    const filePath = req.file.path; // Path to the uploaded file

    // Upload file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // Automatically detect file type
    });

    await blogModel.create({
      title,
      content,
      blogType,
      image: uploadResponse.secure_url,
    });

    // Delete file from server after uploading to Cloudinary
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted from server memory.");
      }
    });

    // Send response
    res.status(200).send({
      message: "Image uploaded successfully.",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Error in uploading process:", error);

    // Send error response
    if (!res.headersSent) {
      res.status(500).send({ message: "Server error while uploading image." });
    }
  }
});
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find({blogType: req.query.blogType});
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error in fetching blogs:", error);
    res.status(500).json({ message: "Server error while fetching blogs." });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error in fetching blog:", error);
    res.status(500).json({ message: "Server error while fetching blog." });
  }
});

app.put("/api/blogs/:id", upload.single("image"), async (req, res) => {
  const token = jwt.verify(req.cookies.admin_token, "secret");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (!req.file) {
    try {
      const { title, content, existimage, blogType } = req.body;

      const blog = await blogModel.findByIdAndUpdate(req.params.id, {
        title,
        content,
        blogType,
        image: existimage,
      });
      res.status(200).json(blog);
    } catch (error) {
      console.error("Error in updating blog:", error);
      res.status(500).json({ message: "Server error while updating blog." });
    }
  } else {
    try {
      const { title, content , blogType } = req.body;

      const filePath = req.file.path; // Path to the uploaded file

      // Upload file to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto", // Automatically detect file type
      });

      const blog = await blogModel.findByIdAndUpdate(req.params.id, {
        title,
        content,
          blogType,
        image: uploadResponse.secure_url,
      });

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted from server memory.");
        }
      });

      res.status(200).json(blog);
    } catch (error) {
      console.error("Error in updating blog:", error);
      res.status(500).json({ message: "Server error while updating blog." });
    }
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  console.log(req.cookies.admin_token);
  try {
    if (!jwt.verify(req.cookies.admin_token, "secret")) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const blog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error in deleting blog:", error);
    res.status(500).json({ message: "Server error while deleting blog." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (username === "admin" && password === "Suvam@4256") {
    const token = jwt.sign({ token: "suvamhere@4256" }, "secret");
    res.cookie("admin_token", token);
    return res.json({ message: "Cookie has been set" });
  }
  res.status(401).json({ message: "Invalid username or password" });
});

app.post("/api/logout", async (req, res) => {
  const token = jwt.verify(req.cookies.admin_token, "secret");
  console.log(token);
  if (
    req.cookies.admin_token &&
    token
  ) {
    return res
      .clearCookie("admin_token")
      .json({ message: "Logged out successfully" });
  }
  res.status(401).json({ message: "Invalid token" });
}); 

// Ensure the 'uploads' directory exists
const UPLOADS_DIR = path.join(__dirname, "./uploads"); 
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
