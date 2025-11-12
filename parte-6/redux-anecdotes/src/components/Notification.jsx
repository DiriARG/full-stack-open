import { useSelector } from "react-redux";

const Notification = () => {
  // Obtención del mensaje actual desde el store. "state.notificacion" viene del nombre del slice en "store.js".
  const notification = useSelector((state) => state.notificacion);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (!notification) return null;
  return <div style={style}>{notification}</div>;
};

export default Notification;
