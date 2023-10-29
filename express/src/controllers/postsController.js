import Posts from "../models/PostsModel.js";
import Users from "../models/UsersModel.js";

const getAllPosts = async (req, res) => {
  try {
    const result = await Posts.findAll({
      attributes: ["id", "img_content", "caption", "createdAt"],
      include: [
        {
          model: Users,
          attributes: ["id", "username", "name", "profile_img"],
        },
      ],
    });

    res.status(200).json({
      message: "Get all posts Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // Validasi file upload
    if (req.errorValidateFile) {
      throw new Error(req.errorValidateFile);
    }

    const { userId, caption } = req.body;

    // image name
    const file = req.file;
    const fileName = file ? file.filename : "no_image.jpg";
    const pImg = `${req.protocol}://${req.hostname}:${process.env.PORT}/posts/img/${fileName}`;

    // DB Create
    const result = await Posts.create({
      userId,
      caption,
      img_content: pImg,
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

const getPostImg = (req, res) => {
  try {
    const { imgpathname } = req.params;
    res.sendFile(imgpathname, { root: "./public/images/content" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPostImg, getAllPosts };
