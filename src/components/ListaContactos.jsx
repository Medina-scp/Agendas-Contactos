import ContactoItem from './ContactoItem'

function ListaContactos({ contactos, onSeleccionar, onEliminar }) {
  if (contactos.length === 0) {
    return <p className="empty-state">No hay contactos registrados todavía.</p>
  }

  return (
    <div>
      {contactos.map((contacto) => (
        <ContactoItem
          key={contacto.id_contacto}
          contacto={contacto}
          onSeleccionar={onSeleccionar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}

export default ListaContactos