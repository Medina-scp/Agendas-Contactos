import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import ListaContactos from './components/ListaContactos'
import FormularioContacto from './components/FormularioContacto'
import DetalleContacto from './components/DetalleContacto'

function App() {
  const [contactos, setContactos] = useState([])
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarContactos()
  }, [])

  async function cargarContactos() {
    setCargando(true)
    setError(null)

    const { data, error } = await supabase
      .from('contacto')
      .select('*')
      .order('apellido', { ascending: true })

    if (error) {
      console.error('Error al cargar contactos:', error)
      setError('No se pudieron cargar los contactos. Intenta de nuevo.')
    } else {
      setContactos(data)
    }

    setCargando(false)
  }

  async function agregarContacto(nuevoContacto) {
    setError(null)

    const { data, error } = await supabase
      .from('contacto')
      .insert([nuevoContacto])
      .select()

    if (error) {
      console.error('Error al agregar contacto:', error)
      setError('No se pudo agregar el contacto. Intenta de nuevo.')
      return
    }

    setContactos((prev) => [...prev, data[0]])
  }

  async function eliminarContacto(idContacto) {
    setError(null)

    const { error } = await supabase
      .from('contacto')
      .delete()
      .eq('id_contacto', idContacto)

    if (error) {
      console.error('Error al eliminar contacto:', error)
      setError('No se pudo eliminar el contacto. Intenta de nuevo.')
      return
    }

    setContactos((prev) => prev.filter((c) => c.id_contacto !== idContacto))

    if (contactoSeleccionado?.id_contacto === idContacto) {
      setContactoSeleccionado(null)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <p>Gestiona tus contactos y sus datos de contacto.</p>
      </header>

      {error && <p className="error-banner">{error}</p>}

      <div className="app-grid">
        <div>
          <div className="panel">
            <h2 className="panel-title">Nuevo contacto</h2>
            <FormularioContacto onAgregar={agregarContacto} />
          </div>

          <div className="panel">
            <h2 className="panel-title">Contactos</h2>
            {cargando ? (
              <p className="empty-state">Cargando contactos...</p>
            ) : (
              <ListaContactos
                contactos={contactos}
                onSeleccionar={setContactoSeleccionado}
                onEliminar={eliminarContacto}
              />
            )}
          </div>
        </div>

        {contactoSeleccionado && (
          <DetalleContacto
            contacto={contactoSeleccionado}
            onCerrar={() => setContactoSeleccionado(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App

