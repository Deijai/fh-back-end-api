const { response, request } = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");

const getAll = async (req = request, res = response) => {
  const find = req.params.param || "";
  const regex = new RegExp(find, "i");

  console.log("find: ", find);

  try {
    const [users, hospitals, doctors] = await Promise.all([
      User.find({ name: regex }),
      Hospital.find({ name: regex }),
      Doctor.find({ name: regex }),
    ]);

    return res.json({
      ok: true,
      users,
      hospitals,
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const getOne = async (req = request, res = response) => {
  const collection = req.params.collection || "";
  const find = req.params.param || "";
  const regex = new RegExp(find, "i");
  let data = [];

  try {
    switch (collection) {
      case "users":
       data = await User.find({ name: regex });
        break;

      case "hospitals":
        data = await Hospital.find({ name: regex }).populate('user');
        break;

      case "doctors":
        data = await Doctor.find({ name: regex }).populate('user').populate('hospitals');
        break;

      default:
        return res.status(400).json({
          ok: false,
          message: "Nenhuma coleção encontrada com o filtro informado.",
        });
        
    }

    return res.json({
        ok: true,
        data,
      });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  getAll,
  getOne,
};
