import { generateResponseFormat } from "../utils/generateResponseFormat";

export const signUpController = async () => {
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
            savedUser,
        ));
    } catch (err) {
        console.error('Error while calling signUpController', err);
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
