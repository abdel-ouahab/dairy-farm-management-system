const router = require('express').Router()

const { getBriths, addBirth, deleteBirth, editBirth, countBirthsLastYear } = require('../controllers/birthsController')

router.get('/', getBriths)
router.post('/', addBirth)
router.delete('/:id', deleteBirth)
router.put('/:id', editBirth);
router.get('/countLastYear', countBirthsLastYear);

module.exports = router