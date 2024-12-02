import Sequelize from 'sequelize';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { generateToken } from '../utils/token.js';

export const userSignup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }

        const { name, email, password, role } = req.body;

        // console.log(req.body)

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please log in.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, role });

        const token = generateToken({ userId: newUser.id, email: newUser.email });

        newUser.token = token;
        newUser.token_expire = new Date(Date.now() + 1 * 60 * 60 * 1000);
        await newUser.save();

        return res.status(201).json({ success: true, message: 'User registered successfully.', name, email, photo, mobile, gender, dob, role, token });


    } catch (error) {
        console.error('Error in userSignup:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}


export const userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, message: errors.errors[0].msg });
        }

        const { email, password, role } = req.body;
        // console.log(req.body);
   
        if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        const userData = await User.findOne({ where: { email, role } });
        console.log('Query Result:', userData);

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Authentication failed. Incorrect password!' });
          }

        const token = generateToken({ userId: userData.id, email: userData.email });
        return res.status(200).json({
            message: 'User verified successfully.',
            token,
            userData: {
            
              email,
              role
            //   name: user.name,
            //   email: user.email,
            //   gender: user.gender,
            //   photo: user.photo,
            //   role: user.role
              // Add other fields as needed
            }
        })


    } catch (error) {
        console.error('Error in userLogin:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}