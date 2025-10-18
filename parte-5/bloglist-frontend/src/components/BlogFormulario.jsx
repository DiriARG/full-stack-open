const BlogFormulario = ({
  agregarBlog,
  titulo,
  setTitulo,
  autor,
  setAutor,
  url,
  setUrl,
}) => {
  return (
    <div>
      <h3>Crear nuevo blog</h3>
      <form onSubmit={agregarBlog}>
        <div>
          <label>
            titulo:{" "}
            <input
              type="text"
              value={titulo}
              onChange={({ target }) => setTitulo(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            autor:{" "}
            <input
              type="text"
              value={autor}
              onChange={({ target }) => setAutor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:{" "}
            <input
              type="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">crear</button>
      </form>
    </div>
  );
};

export default BlogFormulario;
