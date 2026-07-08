import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import DatoContactoItem from './DatoContactoItem'
import FormularioDatoContacto from './FormularioDatoContacto'

function DetalleContacto({ contacto, onCerrar }) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [contacto.id_contacto])

  async function cargarDatos() {
    setCargando(true)
    setError(null)

    const { data, error } = await supabase
      .from('dato_contacto')
      .select('*')
      .eq('id_contacto', contacto.id_contacto)

    if (error) {
      console.error('Error al cargar datos de contacto:', error)
      setError('No se pudieron cargar los datos de este contacto.')
    } else {
      setDatos(data)
    }

    setCargando(false)
  }

  async function agregarDato(nuevoDato) {
    setError(null)

    const datoConContacto = { ...nuevoDato, id_contacto: contacto.id_contacto }

    const { data, error } = await supabase
      .from('dato_contacto')
      .insert([datoConContacto])
      .select()

    if (error) {
      console.error('Error al agregar dato de contacto:', error)
      setError('No se pudo agregar el dato de contacto.')
      return
    }

    setDatos((prev) => [...prev, data[0]])
  }

  async function eliminarDato(idDatoContacto) {
    setError(null)

    const { error } = await supabase
      .from('dato_contacto')
      .delete()
      .eq('id_dato_contacto', idDatoContacto)

    if (error) {
      console.error('Error al eliminar dato de contacto:', error)
      setError('No se pudo eliminar el dato de contacto.')
      return
    }

    setDatos((prev) => prev.filter((d) => d.id_dato_contacto !== idDatoContacto))
  }

  return (
    <div className="panel">
      <div className="detail-header">
        <div>
          <h3>{contacto.nombre} {contacto.apellido}</h3>
          <p>Datos de contacto</p>
        </div>
        <button className="btn btn-sm" onClick={onCerrar}>Cerrar</button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      {cargando ? (
        <p className="empty-state">Cargando datos de contacto...</p>
      ) : datos.length === 0 ? (
        <p className="empty-state">Este contacto no tiene datos registrados todavía.</p>
      ) : (
        <div>
          {datos.map((dato) => (
            <DatoContactoItem
              key={dato.id_dato_contacto}
              dato={dato}
              onEliminar={eliminarDato}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
        <FormularioDatoContacto onAgregar={agregarDato} />
      </div>
    </div>
  )
}

export default DetalleContacto