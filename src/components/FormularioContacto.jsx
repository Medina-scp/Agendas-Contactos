import { useState } from 'react'

function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [errores, setErrores] = useState({})

  function validar() {
    const nuevosErrores = {}

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    }
    if (!apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function manejarEnvio(e) {
    e.preventDefault()

    if (!validar()) {
      return
    }

    onAgregar({ nombre: nombre.trim(), apellido: apellido.trim() })

    setNombre('')
    setApellido('')
  }

  return (
    <form onSubmit={manejarEnvio}>
      <div className="field-row">
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className="field-error">{errores.nombre}</p>}
        </div>

        <div className="field">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {errores.apellido && <p className="field-error">{errores.apellido}</p>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Agregar contacto</button>
    </form>
  )
}
export default FormularioContacto