const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/updateImage");
const path = require("path");
const fs = require("fs");

const upload = async (req = request, res = response) => {
  const collection = req.params.collection || "";
  const id = req.params.id || "";
  try {
    //validar tipos
    const collectionsValid = ["users", "hospitals", "doctors"];
    if (!collectionsValid.includes(collection)) {
      return res.status(400).json({
        ok: false,
        message: `${collection} não é um tipo válido, verifique.`,
      });
    }

    //Validar o arquivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No files were uploaded.",
      });
    }

    const extensionsValid = ["png", "jpeg", "jpg", "gif"];

    // Processa a imagem
    const file = req.files.image;
    const nameFile = file.name.split(".");
    const extensionFile = nameFile[nameFile.length - 1];

    //validar extensão
    if (!extensionsValid.includes(extensionFile)) {
      return res.status(400).json({
        ok: false,
        message: `Arquivo inválido, os tipo válidos são: ${extensionsValid}`,
      });
    }

    //gerar o nome do arquivo
    const newFileName = `${uuidv4()}.${extensionFile}`;

    //Path para guardar a imagem
    const path = `./uploads/${collection}/${newFileName}`;

    //mover a imagem para a pasta uploads
    file.mv(path, (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: `${err}`,
        });
      } else {
        //atualizar base de dados
        updateImage(collection, id, newFileName)
          .then((response) => {
            return res.json({
              ok: true,
              file: newFileName,
            });
          })
          .catch((err) => {
            return res.json({
              ok: false,
              error: err,
            });
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

const getImage = async (req = request, res = response) => {
  const collection = req.params.collection || "";
  const image = req.params.image || "";

  try {
    const pathImage = path.join(__dirname, `../uploads/${collection}/${image}`);
    const pathImageDefault = path.join(__dirname, "../uploads/no-img.jpg");

    if (!fs.existsSync(pathImage)) {
      return res.sendFile(pathImageDefault);
    }
    return res.sendFile(pathImage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

module.exports = {
  upload,
  getImage,
};
