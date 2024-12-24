const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

let { examinations } = JSON.parse(fs.readFileSync(dbFilePath));

exports.getExams = (req, res) => {
    const { userID } = req.query;
    const filteredExaminations = userID ? examinations.filter(examination => examination.userID === userID) : examinations;

    res.status(200).json({
        status: 'success',
        results: filteredExaminations.length,
        data: filteredExaminations 
    });
};

exports.addExams = (req, res) => {
    try {
        const { examinationdate, disease, userID } = req.body;

        const newExam = {
            id: uuidv4(),
            userID,
            examinationdate,
            disease
        };

        examinations.push(newExam);
        saveData(); 

        res.status(201).json({
            status: 'success',
            data: {
                examinations: newExam,
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

    const index = examinations.findIndex((exam) => exam.id === id);

    if (index !== -1) {
        examinations.splice(index, 1);
        saveData(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow deleted successfully',
            data: {
                examinations: null,
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
    const { examinationdate, disease } = req.body;

    const index = examinations.findIndex((exam) => exam.id === id);

    if (examinations[index]) {
        examinations[index].examinationdate = examinationdate;
        examinations[index].disease = disease;
        saveData(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow updated successfully',
            data: {
                exam: examinations[index],
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

// Calculate the number of examinations for specific diseases
exports.countExaminationsByDisease = (req, res) => {
    const diseases = ["Brucellosis", "Botulism", "Bluetongue"];
    const diseaseCounts = diseases.reduce((acc, disease) => {
        acc[disease] = examinations.filter(exam => exam.disease === disease).length;
        return acc;
    }, {});

    res.status(200).json({
        status: 'success',
        data: diseaseCounts
    });
};

function saveData() {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    data.examinations = examinations;
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}