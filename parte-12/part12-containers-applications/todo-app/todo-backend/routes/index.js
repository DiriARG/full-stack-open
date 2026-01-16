const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_req, res) => {
  // Se obtiene el contador de Redis.
  const addedTodos = await getAsync('added_todos')

  // Se envia la respuesta en el formato JSON solicitado.
  res.json({
    added_todos: Number(addedTodos) || 0
  })
})

module.exports = router;
