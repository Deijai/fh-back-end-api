const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ ok: true, users: users });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const createUser = async (req, res = response) => {
  const user = req.body;

  try {
    const emailExist = await User.findOne({ email: user.email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: "Ja existe um usuario com esse e-mail.",
      });
    }
    const newUser = new User(user);

    //encriptar password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(user.password, salt);

    //salvar user
    await newUser.save();

    //gerar token JWT
    const token = await generateJWT(newUser._id);
    console.log("token: ", token);

    console.log(newUser);

    return res.json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  const { google, password, email, ...fields } = req.body;

  try {
    const userExist = await User.findById({ _id: uid });

    if (!userExist) {
      return res.status(404).json({
        ok: false,
        message: "Usuário não existe.",
      });
    }

    if (userExist.email !== email) {
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          message: "Já existe um usuário com esse email.",
        });
      }
    }

    fields.email = email;

    const userUpdate = await User.findByIdAndUpdate(uid, fields, { new: true });

    console.log(userExist);

    return res.json({
      ok: true,
      user: userUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userExist = await User.findById({ _id: uid });

    if (!userExist) {
      return res.status(404).json({
        ok: false,
        message: "Usuário não existe.",
      });
    }

    const userDelete = await User.findOneAndDelete({ _id: uid });

    return res.json({
      ok: true,
      user: userDelete,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
