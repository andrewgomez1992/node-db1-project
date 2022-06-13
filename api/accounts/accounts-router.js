const router = require('express').Router()
const md = require('./accounts-middleware')
// const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    res.json('get accounts')
    // const data = await Account.getAll()
    // res.json(data)
  } catch (err) {
    next({ status: 422, message: 'this is horrible' })
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    res.json('get accounts id')
  } catch (err) {
    next(err)
  }
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    res.json('post accounts')
  } catch (err) {
    next(err)
  }
})

router.put('/:id',
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  md.checkAccountId, async (req, res, next) => {
    try {
      res.json('put accounts')
    } catch (err) {
      next(err)
    }
  });

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    res.json('delete accounts')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = router;
