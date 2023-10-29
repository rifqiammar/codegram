import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/UsersModel.js";

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) throw new Error("Username tidak di temukan!");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Password anda salah!");

    const username = user.username;
    const id = user.id;

    const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_SECRET_TOKEN, {
      expiresIn: "1d",
    });

    // Menyimpan Refresh token pada database
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: user.id,
        },
      }
    );

    // Menyimpan Refresh token pada Cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      // secure: true, if using https
    });

    console.log({ token: req.cookies.refreshToken });

    res.json({ refreshToken });
  } catch (error) {
    res.status(400).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) return res.sendStatus(204);

  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  // Clear Cookies
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

// ---------------------- Refresh Token -------------------------------------
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);

      //   Jika berhasil
      const username = user.username;
      const name = user.name;
      const accessToken = jwt.sign({ username, name }, process.env.SECRETE_TOKEN, { expiresIn: "15s" });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
