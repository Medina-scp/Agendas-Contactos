function ContactoItem({ contacto, onSeleccionar, onEliminar }) {
  return (
    <div className="contact-row">
      <span className="contact-name">{contacto.nombre} {contacto.apellido}</span>
      <div className="contact-actions">
        <button className="btn btn-sm" onClick={() => onSeleccionar(contacto)}>Ver detalle</button>
        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(contacto.id_contacto)}>Eliminar</button>
      </div>
    </div>
  )
}

export default ContactoItem