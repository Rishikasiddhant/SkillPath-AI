import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token;

    // 1. Header se Authorization token check karein
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // "Bearer <token>" format se sirf token extract karein
            token = req.headers.authorization.split(' ')[1];

            // 2. Token verify karein (Aapka JWT_SECRET .env file mein hona chahiye)
            // Agar token galat hai ya expiry ho gayi hai, ye error dega
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. User ki info ko request object mein store karein
            req.user = decoded; 

            // Sab sahi hai, agle function (controller) par jaane dein
            next(); 
        } catch (error) {
            console.error("Token verification error:", error.message);
            // 401 Unauthorized agar token galat hai
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // Agar header mein token missing hai
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};