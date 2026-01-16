const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  
  // Se obtiene el valor actual de "added_todos".
  const cuentaActual = await getAsync('added_todos')
  // Se calcula el nuevo valor, en caso de que no exista empieza en 1. 
  const nuevaCuenta = cuentaActual ? Number(cuentaActual) + 1 : 1
  // Se guarda el nuevo valor en Redis.
  await setAsync('added_todos', nuevaCuenta)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  // Como el middleware "findByIdMiddleware" ya encontró la tarea y la puso en "req.todo" solo se envía como respuesta.
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;

  // Si la propiedad "text" fue enviada en la petición, se actualiza en el documento.
  if (text !== undefined) {
    req.todo.text = text;
  }
  
  if (done !== undefined) {
    req.todo.done = done;
  }

  // Se guardan los cambios en MongoDB.
  const actualizarTarea = await req.todo.save();
  // Se muestran.
  res.json(actualizarTarea);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
