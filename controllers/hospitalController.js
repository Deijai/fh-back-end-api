const { response, request } = require("express");
const Hospital = require("../models/Hospital");

const getHospitals = async (req = request, res = response) => {
  try {
    const hospitals = await Hospital.find().populate('user');
    return res.json({ ok: true, hospitals: hospitals });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const createHospital = async (req = request, res = response) => {
  const uid = req.uid;
  const hospital = req.body;

  try {
    console.log("uid: ", req.uid);

    if (!uid) {
      return res.status(401).json({
        ok: false,
        message:
          "Usuário invalido ou sem permissão, falar com o ADM do sistema",
      });
    }

    const hospitalExist = await Hospital.findOne({ name: hospital.name });
    if (hospitalExist) {
      return res.status(401).json({
        ok: false,
        message: "Hospital ja cadastrado, verifique.",
      });
    }

    //criando a instancia do hospital
    const newHospital = new Hospital({ user: uid, ...hospital });

    await newHospital.save();

    return res.json({
      ok: true,
      hospital: newHospital,
    });
  } catch (error) {
    console.log("error => ", error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const updateHospital = async (req = request, res = response) => {
  try {
    return res.json({
      ok: true,
      hospital: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const deleteHospital = async (req = request, res = response) => {
  try {
    return res.json({
      ok: true,
      hospital: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
