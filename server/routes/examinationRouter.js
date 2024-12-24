const router = require('express').Router()

const { getExams, addExams, deleteCow, editCow, countExaminationsByDisease } = require('../controllers/examinationsController')

router.get('/', getExams)
router.post('/', addExams)
router.delete('/:id', deleteCow)
router.put('/:id', editCow);
router.get('/countByDisease', countExaminationsByDisease);

module.exports = router