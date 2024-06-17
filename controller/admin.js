const ADMIN = require('../module/admin');
const bcrypt = require('bcrypt');
const jwt=require('../controller/jwt')

exports.admin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new ADMIN({
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.json({ message: 'Admin signup successful' });
    } catch (err) {
        console.error('Error saving admin to database', err);
        res.status(500).json({ error: 'Error saving admin to database' });
    }
};

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await ADMIN.findOne({ email });
        if (!admin) {
            console.log("Admin not found");
            return res.status(401).json({ error: 'Admin not found' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            console.log("Password does not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token=jwt.generateToken({email});
        console.log(token);
        res.json({ message: 'Login successful',token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};
