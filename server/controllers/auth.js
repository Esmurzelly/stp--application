import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import nodemailer from 'nodemailer';


export const register = async (req, res) => {
  try {
    const { fullName, email, password, city } = req.body;

    const isRegistrated = await User.findOne({ email });

    if (isRegistrated) {
      return res.json({
        message: 'Current username is already registrated',
      });
    };

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      email,
      passwordHash,
      city
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
    console.log(e)
    res.json({ message: `Error while creating the User - error is ${e}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'This user does not exist',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({
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

    res.status(200).json({
      token,
      user,
      message: 'You are in the system!',
    });
  } catch (e) {
    res.status(500).json({ message: `No access, error is ${e}` });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
      token,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { fullName, email, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName;
    user.email = email;
    user.city = city;

    await user.save();

    res.json({
      user,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const uploadAvatar = async (req, res) => {
  const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

  try {
    const file = req.files.file;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const avatarName = uuidv4() + '.jpg';
    file.mv(`${IMAGE_STORAGE}` + avatarName);
    user.avatar = avatarName;
    await user.save();

    console.log('user id', user)

    return res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteAvatar = async (req, res) => {
  const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    fs.unlinkSync(`${IMAGE_STORAGE}` + user.avatar);
    user.avatar = null;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const sendEmail = (req, res) => {
  const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.REACT_APP_EMAIL,
      pass: process.env.REACT_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  contactEmail.verify(error => {
    if (error) {
      console.log('server error email', error);
    } else {
      console.log('ready to send');
    }
  });

  try {
    const name = req.body.fullName;
    const email = req.body.email;
    const message = req.body.message;

    const mail = {
      from: name,
      to: process.env.REACT_APP_EMAIL,
      subject: `New Message From ${name}`,
      html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>`
    };

    contactEmail.sendMail(mail, error => {
      if (error) {
        res.json(error);
        console.log('error', res.json(error));
      } else {
        res.json({
          code: 200, status: 'Message sent'
        });
      };
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}