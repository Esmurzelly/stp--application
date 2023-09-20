import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { fullName, email, password, city } = req.body;

    const isRegistrated = await User.findOne({ email });

    if (isRegistrated) {
      return res.json({
        message: 'Current username is already registrated',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      passwordHash,
      city,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: 'Registration is okay',
    });
  } catch (e) {
    res.json({ message: `Error while creating the User - error is ${e}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: 'This user does not exist',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash); // or passwordHash?

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Incorrect password.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user,
      message: 'You are in the system!',
    });
  } catch (e) {
    res.json({ message: `No access, error is ${e}` });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: 'This user does not exist.',
      });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    res.json({
        user,
        token
    })
  } catch (error) {
    res.json({ message: `No access, error is ${error}` });
  }
};