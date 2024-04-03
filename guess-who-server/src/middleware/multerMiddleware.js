const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");

    // const uploadPath = path.join(__dirname, "../uploads");
    // console.log(uploadPath, "uploadPath");
    // cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  //   filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //     const extension = path.extname(file.originalname);
  //     console.log(extension, "extension");
  //     const filename = uniqueSuffix + extension;
  //     console.log(filename, "filename");
  //     cb(null, filename);
  //   },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({ storage });
