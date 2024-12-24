const router = require('express').Router()

const { getMilk, addMilk, deleteMilk, editMilk, calculateMilkSumByUser } = require('../controllers/milkController')


router.get('/', getMilk)
router.post('/', addMilk)
router.delete('/:id', deleteMilk)
router.put('/:id', editMilk);
router.get('/sum', calculateMilkSumByUser);

module.exports = router