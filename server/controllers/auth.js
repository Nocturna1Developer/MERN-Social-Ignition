import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* 
* REGISTER USER - asynchronous since we are calling mongo database
*  req - request body from the frontend
*  res - response sending back to front end
*  express does this by default
*/

export const register = async (req, res) => {
    try {
        // send an object to front end that has these parameters
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // encrypts our password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // creating user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });

        // res provided by express, if user is valid 201 status success code is created
        // make sure newUser data is correct 
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* 
* LOGGING IN - asynchronous since we are calling mongo database
*  req - request body from the frontend
*  res - response sending back to front end
*  express does this by default

*  NOT REALLY USED IN OFFICIAL PRODUCTION
*/

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // use mongoose to find a specific email
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        // uses the same salt to compare if two passwords are the same
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials " });

        // secure password and delete so it doesn't get sent back to front end
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
