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

  const id = req.params.id;
  const uid = req.uid;

  try {

    const hospitalExist = await Hospital.findById(id);

    if(!hospitalExist){
      return res.status(404).json({
        ok: false,
        message: 'Hospital não encontrado.',
      });
    }

   const hospitalsExistName = await Hospital.findOne({name: req.body.name})

    if( hospitalsExistName &&  hospitalsExistName.id !== id){
      return res.status(400).json({
        ok: false,
        message: 'Voce não pode alterar um hospital com um nome que ja existe.',
      });
    }

    const fieldsHospitals = {
        ...req.body,
        user: uid,
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(id, fieldsHospitals, {new: true});
    return res.json({
      ok: true,
      hospital: updatedHospital,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const deleteHospital = async (req = request, res = response) => {
  const id = req.params.id;
  try {

    const hospitalExist = await Hospital.findById(id);

    if(!hospitalExist){
      return res.status(404).json({
        ok: false,
        message: 'Hospital não encontrado.',
      });
    }

    await Hospital.findByIdAndDelete(id);
    return res.json({
      ok: true,
      hospital: 'Hospital deletado.',
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
