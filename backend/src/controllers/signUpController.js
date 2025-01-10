import { User } from "../models/User.js";
import { generateResponseFormat } from "../utils/generateResponseFormat.js";
import bcrypt from 'bcryptjs';

export const signUpController = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
        });
    
        const savedUser = await newUser.save();

        res.status(201).json(generateResponseFormat(
            'User created successfully',
            201,
            'success',
            {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                _id: savedUser._id,
                __v: 0  
            },
        ));
    } catch (err) {
        console.error('Error while calling signUpController', err);
        if(err?.errorResponse?.code === 11000) {
            return res.status(400).json(generateResponseFormat(
                'User already exists',
                400,
                'bad-request',
                null,
            ));
        }
        res.status(500).json(
            generateResponseFormat(
                'Something went wrong',
                500,
                'error',
                null,
            )
        );
    }
}
