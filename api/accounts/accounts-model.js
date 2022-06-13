const db = require('../../data/db-config.js')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

async function create(account) {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
