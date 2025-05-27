import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// For ES module - get the current file's path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go one level up to access the 'public' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/temp")); // Go up one level using "../"
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
