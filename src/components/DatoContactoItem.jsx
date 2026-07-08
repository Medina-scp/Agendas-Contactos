function DatoContactoItem({ dato, onEliminar }) {
  const valor = dato.correo || dato.telefono || dato.direccion

  return (
    <div className="dato-row">
      <div className="dato-info">
        <span className="badge" data-tipo={dato.tipo}>{dato.tipo}</span>
        <span className="dato-valor">{valor}</span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => onEliminar(dato.id_dato_contacto)}>Eliminar</button>
    </div>
  )
}

export default DatoContactoItem