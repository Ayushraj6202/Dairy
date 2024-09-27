import jwt  from "jsonwebtoken";
const authToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, 'secret', (err, user) => {
        // console.log(err);

        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

export default authToken ;
