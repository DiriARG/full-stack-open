// Componente que muestra mensajes de éxito o error.
/*Recibe un prop llamado "message", que es un objeto con dos propiedades:
{ texto: "contenido del mensaje", tipo: "exito" | "error" }*/
const Notification = ({ mensaje }) => {
  if (mensaje === null) {
    return null;
  }

  return <div className={mensaje.tipo}>{mensaje.texto}</div>;
};

export default Notification;
