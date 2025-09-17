// Componente que muestra un mensaje temporal de éxito si "mensaje" no es null.
const Notification = ({ mensaje }) => {
  if (mensaje === null) {
    return null;
  }

  return <div className="exito">{mensaje}</div>;
};

export default Notification;
