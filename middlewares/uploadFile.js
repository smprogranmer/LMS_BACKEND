import multer from "multer";
import path from "path";

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const newFilename = `${Date.now()}_${file.originalname.replace(extname, "")}${extname}`;
    cb(null, newFilename);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error("file type not supported"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE, fieldSize: MAX_FILE_SIZE },
  fileFilter,
});

export default upload;
