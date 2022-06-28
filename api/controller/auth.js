const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/email");
const { encrypt} = require("../services/crypto");
const generateOTP = require("../services/otp");

const registerUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password } = req.body;

    const isExisting = await findUserByEmail(email);
    if (isExisting) {
      return res.send("Already existing");
    }

    //create new user
    const newUser = await createUser(username, email, password);

    if (!newUser[0]) {
      return res.status(400).send({
        message: "Unable to create new user",
      });
    }

    res.send(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const verifyEmail = async (req,res) => {
    const {email,OTP} = req.body;
    const user = await validateUserSignUp(email,OTP);
    res.send(user);
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong credentials");
    }

    const validated =
      (await bcrypt.compare(req.body.password, user.password)) &&
      user._doc.active;
    if (!validated) {
      return res.status(400).json("Wrong credentials");
    }

    const { password, ...others } = user._doc;
    user && validated && res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

//create new User
const createUser = async (username, email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, "Unable to sign you up"];
  }
  try {
    await sendEmail({
      email: email,
      subject: 'Verification Mail',
      OTP: otpGenerated,
    });
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

const validateUserSignUp = async(email,OTP) => {
    const user = await User.findOne({
        email,
      });
      if (!user) {
        return [false, 'User not found'];
      }
      if (user && user.otp !== OTP) {
        return [false, 'Invalid OTP'];
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { active: true },
      });
      return [true, updatedUser]
};

module.exports = { registerUser, verifyEmail, loginUser };
