import { useState } from 'react'

const AlternarContenido = (props) => {
  const [visible, setVisible] = useState(false)

  const ocultar = { display: visible ? 'none' : '' }
  const mostrar = { display: visible ? '' : 'none' }

  const alternarVisibilidad = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={ocultar}>
        <button onClick={alternarVisibilidad}>{props.textoBoton}</button>
      </div>
      <div style={mostrar}>
        {props.children}
        <button onClick={alternarVisibilidad}>Cancelar</button>
      </div>
    </div>
  )
}

export default AlternarContenido
