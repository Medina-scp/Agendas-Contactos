import { useState } from 'react'

function FormularioDatoContacto({ onAgregar }) {
  const [tipo, setTipo] = useState('Personal')
  const [campo, setCampo] = useState('telefono')
  const [valor, setValor] = useState('')
  const [error, setError] = useState('')

  function validar() {
    if (!valor.trim()) {
      setError('Debes ingresar un valor.')
      return false
    }

    if (campo === 'correo') {
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regexCorreo.test(valor.trim())) {
        setError('Ingresa un correo válido (ej: nombre@dominio.com).')
        return false
      }
    }

    if (campo === 'telefono') {
      const regexTelefono = /^[0-9+\s-]{7,15}$/
      if (!regexTelefono.test(valor.trim())) {
        setError('Ingresa un teléfono válido (solo números, 7 a 15 caracteres).')
        return false
      }
    }

    setError('')
    return true
  }

  function manejarEnvio(e) {
    e.preventDefault()

    if (!validar()) {
      return
    }

    const nuevoDato = {
      tipo,
      correo: null,
      telefono: null,
      direccion: null,
    }
    nuevoDato[campo] = valor.trim()

    onAgregar(nuevoDato)

    setValor('')
  }

  return (
    <form onSubmit={manejarEnvio}>
      <div className="field-row">
        <div className="field">
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Casa">Casa</option>
          </select>
        </div>

        <div className="field">
          <label>Dato</label>
          <select value={campo} onChange={(e) => { setCampo(e.target.value); setValor(''); setError('') }}>
            <option value="telefono">Teléfono</option>
            <option value="correo">Correo</option>
            <option value="direccion">Dirección</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>Valor</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        {error && <p className="field-error">{error}</p>}
      </div>

      <button type="submit" className="btn btn-primary btn-sm">Agregar</button>
    </form>
  )
}

export default FormularioDatoContacto