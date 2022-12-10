import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    try {

        // getting the request from the front end
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // set on the front end, and get everything after 7 spaces
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}