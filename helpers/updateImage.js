const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const fs = require("fs");

const removeImage = (collection, pathImage) => {
  const pathValidate = `./uploads/${collection}/${pathImage}`;
  if (fs.existsSync(pathValidate)) {
    fs.unlinkSync(pathValidate);
  }
};

const updateImage = async (collection, id, newFileName) => {
  switch (collection) {
    case "doctors":
      const doctorsExist = await Doctor.findById(id);

      if (!doctorsExist) {
        return false;
      }
      removeImage(collection, doctorsExist.image);

      doctorsExist.image = newFileName;
      await doctorsExist.save();
      return true;

      break;

    case "hospitals":
      const hospitalsExist = await Hospital.findById(id);

      if (!hospitalsExist) {
        return false;
      }
      removeImage(collection, hospitalsExist.image);

      hospitalsExist.image = newFileName;
      await hospitalsExist.save();
      return true;
      break;

    case "users":
      const usersExist = await User.findById(id);
      console.log('usersExist ', usersExist);

      if (!usersExist) {
        return false;
      }
      removeImage(collection, usersExist.image);

      usersExist.image = newFileName;
      await usersExist.save();
      return true;
      break;

    default:
        return false;
      break;
  }

  console.log("updateImage ok");
};

module.exports = {
  updateImage,
};
