const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    //verifica email
    if (!userExist) {
      return res.status(404).json({
        ok: false,
        message: "Dados inválidos, verifique.",
      });
    }

    console.log(userExist);

    //verifica senha
    const validatePassword = bcrypt.compareSync(password, userExist.password);

    console.log(validatePassword);

    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        message: "Dados inválidos, verifique.",
      });
    }

    //gerar token JWT
   const token = await generateJWT(userExist._id);
   console.log('token: ', token);


    return res.json({
      ok: true,
      user: userExist,
      token
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  login,
};
