const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

let { cows } = JSON.parse(fs.readFileSync(dbFilePath));

exports.getCows = (req, res) => {
    const { userID } = req.query;
    const filteredCows = userID ? cows.filter(cow => cow.userID === userID) : cows;
    res.status(200).json({
        status: 'success',
        results: filteredCows.length,
        data: filteredCows 
    });
};

exports.addCow = (req, res) => {
    try {
        const { entrydate, strain, userID } = req.body;

        const newCow = {
            id: uuidv4(),
            userID,
            entrydate,
            strain
        };

        cows.push(newCow);
        saveData(); 

        res.status(201).json({
            status: 'success',
            data: {
                cow: newCow,
            }
        });
    } catch (error) {
        console.error('Error adding cow:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add cow',
        });
    }
};

exports.deleteCow = (req, res) => {
    const { id } = req.params;

    const index = cows.findIndex((cow) => cow.id === id);

    if (index !== -1) {
        cows.splice(index, 1);
        saveData(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow deleted successfully',
            data: {
                cow: null,
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

exports.editCow = (req, res) => {
    const { id } = req.params;
    const { entrydate, strain } = req.body;

    const index = cows.findIndex((cow) => cow.id === id);

    if (cows[index]) {
        cows[index].entrydate = entrydate;
        cows[index].strain = strain;
        saveData();

        res.status(200).json({
            status: 'success',
            message: 'Cow updated successfully',
            data: {
                cow: cows[index],
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

exports.countCowsByUser = (req, res) => {
    const { userID } = req.query;

    const filteredCows = userID ? cows.filter(cow => cow.userID === userID) : [];

    res.status(200).json({
        status: 'success',
        count: filteredCows.length
    });
};


function saveData() {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    data.cows = cows;
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}
