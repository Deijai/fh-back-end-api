const { response, request } = require("express");
const Doctor = require("../models/Doctor");

const getDoctors = async (req = request, res = response) => {
  const inicio = Number(req.query.inicio) || 0;
  const limite = Number(req.query.limite) || 5;
  try {
    const [doctors, total] = await Promise.all([
      Doctor.find().skip(inicio).limit(limite).populate(["hospitals"]),
      Doctor.countDocuments(),
    ]);

    return res.json({ ok: true, doctors: doctors, total: total });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const createDoctor = async (req = request, res = response) => {
  const user = req.uid;
  const doctor = req.body;
  console.log("doctor: ", doctor);
  try {
    const doctorExist = await Doctor.findOne({ name: doctor.name });

    if (doctorExist) {
      return res.status(401).json({
        ok: false,
        message: "Médico ja cadastrado, verifique.",
      });
    }

    const newDoctor = new Doctor({ user: user, ...doctor });
    await newDoctor.save();
    console.log("newDoctor: ", newDoctor);

    return res.json({
      ok: true,
      doctor: newDoctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const updateDoctor = (req = request, res = response) => {
  try {
    return res.json({
      ok: true,
      doctor: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const deleteDoctor = (req = request, res = response) => {
  try {
    return res.json({
      ok: true,
      doctor: true,
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
