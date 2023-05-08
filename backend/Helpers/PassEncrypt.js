const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
  } catch (e) {
    console.log(e);
  }
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports.HashPassword = HashPassword;
module.exports.comparePassword = comparePassword;
