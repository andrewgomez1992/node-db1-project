const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next({ status: 422, message: 'account not found' })
  }
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Account.create({ name: req.body.name.trim(), budget: req.body.budget })
    res.status(201).json(data)
  } catch (err) {
    next({ status: 400, message: 'that name is taken' })
  }
})

router.put('/:id',
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
    try {
      res.json('update account')
    } catch (err) {
      next(err)
    }
  });

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = router;
