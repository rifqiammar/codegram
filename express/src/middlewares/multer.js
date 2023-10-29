import multer, { diskStorage } from "multer";

// Multer File Filter
const allowedFileExtension = ["jpg", "png", "JPG", "PNG", "JPEG", "jpeg"];
const fileFilterOption = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();

  if (!allowedFileExtension.includes(ext)) {
    req.errorValidateFile = "Hanya Boleh Image";
    return cb(null, false);
  }

  cb(null, true);
};

// Menentukan dimana menyimpan File yang akan di upload
const storageProfile = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profile");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    cb(null, `${timestamp}-${fileName}`);
  },
});

const uploadProfile = multer({
  storage: storageProfile,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2MB
  },
  fileFilter: fileFilterOption,
});

const storageContent = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/content");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    cb(null, `${timestamp}-${fileName}`);
  },
});

const uploadContent = multer({
  storage: storageContent,
  limits: {
    fileSize: 3 * 1000 * 1000, // 2MB
  },
  fileFilter: fileFilterOption,
});

export { uploadProfile, uploadContent };
