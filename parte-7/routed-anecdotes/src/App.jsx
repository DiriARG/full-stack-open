import { useState } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      {/* El componente <Link> crea enlaces para navegar entre rutas sin recargar la página. */}
      <Link style={padding} to="/">
        Anécdotas
      </Link>
      <Link style={padding} to="/create">
        Crear nueva
      </Link>
      <Link style={padding} to="/about">
        Acerca de
      </Link>
    </div>
  );
};

const Anecdota = ({ anecdotes }) => {
  // useParams obtiene los parámetros dinámicos de la URL (/anecdotes/:id); Se convierte a Number porque useParams devuelve todo como string.
  const id = Number(useParams().id);
  const anecdota = anecdotes.find((anecdota) => anecdota.id === id);
  return (
    <div>
      <h2>
        {anecdota.content} por {anecdota.author}
      </h2>
      <div>Tiene {anecdota.votes} votos</div>
      <br></br>
      <div>
        {" "}
        Para mas info mira: <a href={anecdota.info}>{anecdota.info}</a>{" "}
      </div>
      <br></br>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        // Recorre el array de anécdotas con map para generar una lista (<li>) de cada una.
        <li key={anecdote.id}>
          {/* Link de React Router que navega a la ruta dinámica de la anécdota (`/anecdotes/${anecdote.id}`).
          Cuando el usuario hace click, se muestra la vista detallada de la anécdota clickeada (anecdote.content). */}
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);


const CreateNew = ({ addNew, setNotification }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  // Hook para poder navegar.
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaAnecdota = {
      content,
      author,
      info,
      votes: 0,
    };
    // Se llama a la función para añadir la anécdota.
    addNew(nuevaAnecdota);

    // Se muestra la notificación y luego se limpia después de 5 segundos.
    setNotification(
      `La anécdota: ${nuevaAnecdota.content} se ha creado correctamente!`
    );
    setTimeout(() => {
      setNotification("");
    }, 5000);

    // Se redirige a la lista de anécdotas.
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      {/* Si "notification" es un string, ej: "Nueva anécdota creada!" se muestra el <div> con el msj". 
      Si "notification" está vacio, React lo ignora y no se renderiza nada. */}
      {notification && <div>{notification}</div>}
      
      {/* Rutas... 
      <Routes> es el contenedor que se encarga de examinar la URL actual y decidir que <Route> debe renderizarse.
      Cada <Route> define una ruta específica.
      - path = Es la URL exacta.
      - element={} es el componente que se mostrará para esa ruta. */}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdota anecdotes={anecdotes} />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
