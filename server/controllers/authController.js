const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const secret = process.env.SECRET || 'abdelouahab';
const usersFilePath = path.join(__dirname, '..', 'db', 'user.json');

const readUsersFile = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data || '[]');
};

const writeUsersFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};


exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, username, age, email, password, confirmPassword } = req.body;

        if (!firstname || !lastname || !username || !age || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const users = readUsersFile();

        const userEmail = users.find((user) => user.email === email);
        if (userEmail) return res.status(400).json({ message: 'Email already exists' });

        const userName = users.find((user) => user.username === username);
        if (userName) return res.status(400).json({ message: 'Username already exists' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            _id: uuidv4(),
            firstname,
            lastname,
            username,
            age,
            email,
            password: hashedPassword,
            createdOn: new Date(),
        };

        users.push(newUser);
        writeUsersFile(users);

        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                firstname,
                lastname,
                username,
                age,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user!' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password!' });
        }

        const users = readUsersFile();

        const user = users.find((u) => u.email === email);
        if (!user) return res.status(400).json({ message: 'User not found!' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Incorrect email or password!' });

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
