import Users from "../models/UsersModel.js";
import Posts from "../models/PostsModel.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { username, password, confPassword, name, email } = req.body;

    // Jika Duplikat
    const duplicate = await Users.findOne({ where: { username } });
    if (duplicate) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Validasi file upload
    if (req.errorValidateFile) {
      throw new Error(req.errorValidateFile);
    }

    // Cek Konfirmasi Password
    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match",
      });
    }

    // Enkripsi Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // image name
    const file = req.file;
    const fileName = file ? file.filename : "no_image.jpg";
    const pImg = `${req.protocol}://${req.hostname}:${process.env.PORT}/users/img/${fileName}`;

    // DB Create
    const result = await Users.create({
      username,
      password: hashedPassword,
      name,
      email,
      profile_img: pImg,
    });

    // Send response
    res.status(200).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "User created failed",
      error: error.message,
    });
  }
};

const getUserImg = (req, res) => {
  try {
    const { imgpathname } = req.params;
    res.sendFile(imgpathname, { root: "./public/images/profile" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await Users.findAll();
    res.status(200).json({
      message: "Get all users Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const result = await Users.findOne({
      where: {
        refresh_token: authorization,
      },
      include: {
        model: Posts,
      },
    });

    res.status(200).json({
      message: "Get user Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, createUser, getUserImg, getOneUser };
