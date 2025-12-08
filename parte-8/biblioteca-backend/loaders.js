const DataLoader = require("dataloader");
const Book = require("./modelos/book");

// Se crea un DataLoader para agrupar y optimizar las consultas de "bookCount" por autor.
const crearLoaderBookCount = () =>
  new DataLoader(async (listaIdsAutores) => {
    
    console.log("DataLoader ejecutado. IDs recibidos: ", listaIdsAutores);
    /*  
      listaIdsAutores -> [idAutor1, idAutor2, idAutor3, ...]
      DataLoader recibe un array con todos los Ids solicitados en la solicitud GraphQL.
      En lugar de hacer N queries como:
      Book.countDocuments({ author: idAutor })
      Ejecuta una única consulta usando "aggregate".
    */
    const resultados = await Book.aggregate([
      // $match: Filtra solo los libros para los IDs de autor que están en la lista.
      { $match: { author: { $in: listaIdsAutores } } },
      // $group: Agrupa los libros por ID de autor y calcula la suma total.
      { $group: { _id: "$author", total: { $sum: 1 } } },
    ]);

    // Mapeo: Se convierte el array de resultados a un objeto (mapa) para facilitar la búsqueda por ID.
    const mapaConteosPorAutor = {};
    resultados.forEach((resultado) => {
      // Asigna el conteo de libros (resultado.total) al mapa, usando el ID del autor convertido a string como clave; ya que en JS las claves de los objetos deben ser strings.
      mapaConteosPorAutor[resultado._id.toString()] = resultado.total;
    });

    // DataLoader exige que el array de salida MANTENGA EL MISMO ORDEN que el array de entrada (listaIdsAutores).
    return listaIdsAutores.map((id) => mapaConteosPorAutor[id.toString()] || 0); // Retorna 0 si el autor no tiene libros.
  });

module.exports = { crearLoaderBookCount };
