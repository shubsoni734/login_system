const LoginModule = require("../Modules/LoginModule");
const { HashPassword, comparePassword } = require("../Helpers/PassEncrypt");

const RegisterControllers = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log(name);
    if (!name) {
      return res.json({ error: "name is required" });
    }
    if (!email) {
      return res.json({ error: "email is required" });
    }
    if (!password) {
      return res.json({ error: "password is required" });
    }
    if (!mobile) {
      return res.json({ error: "mobile number is required" });
    }
    const existingUser = await LoginModule.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "user already exist",
      });
    }
    const hashPassword = await HashPassword(password);
    const user = await new LoginModule({
      name,
      email,
      password: hashPassword,
      mobile,
    }).save();

    console.log(user);

    res.status(201).json({
      success: true,
      message: "Register Succes fuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in login",
      error,
    });
  }
};

const LoginControll = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email and Password",
      });
    }
    const user = await LoginModule.findOne({ email: email });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "  ",
      });
    }
    // const pass = await LoginModule.findOne({ password: password });
    const match = await comparePassword(password, user.password);
    console.log(match, "password match");
    if (match) {
      res.status(200).json({
        success: true,
        message: "Login SuccesFully",
        user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "password is wrong",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status({
      success: false,
      message: "error in login",
    });
  }
};

const FatchData = async (req, res) => {
  try {
    console.log("hgjkhjhj");
    const { email } = req.body;
    console.log(email);
    const data = await LoginModule.find(
      { email: req.params.name },
      { $set: req.body }
    );
    console.log(data);
    res.status(200).json({
      success: true,
      message: "data Fatching Success",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error at fatching time",
    });
  }
};

const updateData = async (req, res) => {
  try {
    const { name, email, mobile, passowrd } = req.body;
    const user = await LoginModule.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name: name,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "data Updated Success",
    });
  } catch (err) {
    res.status(500).send(err);
    // }
    // console.log({ result: req.params.email });
    // console.log(
    //   LoginModule.updateOne(
    //     { email: req.params.email },
    //     { $set: { name: "asdfghjkl" } }
    //   ).save()
    // );
    // console.log({ result: "update api// call" });
    // const update = await LoginModule.updateOne(
    //   { email: req.params.name },
    //   { $set: { name: "shubsoni123" } }
    // );
    // if (update) {
    //   res.status(200).json({
    //     success: true,
    //     message: "data update sussess",
    //   });
    // }
    // res.status(200).json({
    //   success: false,
    //   message: "data not update",
    // });
  }
  //  catch (error) {
  //   console.log(error);
  // }
};
module.exports.RegisterControllers = RegisterControllers;
module.exports.LoginControll = LoginControll;
module.exports.FatchData = FatchData;
module.exports.updateData = updateData;
