const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// POST endpoint to process JSON data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input. "data" should be a non-empty array.',
        });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        } else {
            return res.status(400).json({
                is_success: false,
                message: `Invalid input: "${item}" is neither a number nor a single character alphabet.`,
            });
        }
    });

    res.json({
        is_success: true,
        user_id: 'sangeetha-bhoopathi',
        email: 'sangeetha.b2021@vitstudent.ac.in',
        roll_number: '21BBS272',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
});

// GET endpoint to check the server status
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
