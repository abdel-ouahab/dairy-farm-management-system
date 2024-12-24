const router = require('express').Router()

const { getCows, addCow, deleteCow, editCow, countCowsByUser } = require('../controllers/cowsController')

router.get('/', getCows)
router.post('/', addCow)
router.delete('/:id', deleteCow)
router.put('/:id', editCow);
router.get('/count', countCowsByUser);

module.exports = router