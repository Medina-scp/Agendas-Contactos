# Agenda de Contactos

Aplicación web SPA para gestionar una agenda de contactos, desarrollada como Evaluación Sumativa 3 del curso Programación Front End (INACAP).

Permite registrar contactos (nombre y apellido) y asociarles distintos datos de contacto —teléfono, correo o dirección— clasificados por tipo: Personal, Trabajo o Casa.

## Tecnologías utilizadas

- **React** (con Vite) — librería de UI basada en componentes
- **Supabase** — base de datos PostgreSQL y API REST autogenerada
- **JavaScript (ES6+)**
- **CSS** — estilos propios, sin frameworks de UI

## Funcionalidades

- Agregar y eliminar contactos
- Agregar y eliminar datos de contacto (teléfono, correo, dirección) asociados a un contacto
- Clasificación de datos de contacto por tipo (Personal / Trabajo / Casa)
- Validación de campos según las restricciones de la base de datos (formato de correo, formato de teléfono, campos obligatorios)
- Manejo de errores de conexión y de las operaciones CRUD, con mensajes visibles para el usuario
- Interfaz responsiva, adaptada a dispositivos móviles

## Modelo de base de datos

**`contacto`**
| Columna | Tipo | Detalle |
|---|---|---|
| id_contacto | serial | Primary Key |
| nombre | varchar | not null |
| apellido | varchar | not null |

**`dato_contacto`**
| Columna | Tipo | Detalle |
|---|---|---|
| id_dato_contacto | serial | Primary Key |
| id_contacto | integer | Foreign Key → contacto.id_contacto (on delete cascade) |
| tipo | varchar | check: Personal, Trabajo o Casa |
| correo | varchar | nullable |
| telefono | varchar | nullable |
| direccion | text | nullable |

## Estructura del proyecto



## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:
```bash
git clone https://github.com/Medina-scp/Agendas-Contactos.git
cd Agendas-Contactos/agenda-contactos
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con las credenciales de un proyecto de Supabase propio:

VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_publishable_key

4. Ejecutar el script SQL de creación de tablas (ver sección "Modelo de base de datos") en el SQL Editor de Supabase.

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Uso de Inteligencia Artificial

Se utilizó IA (Claude, de Anthropic) como apoyo para definir la propuesta de diseño visual (paleta de colores, tipografía y layout responsivo). El desarrollo de la lógica, componentes y conexión con la base de datos fue realizado por el autor, con IA como guía explicativa paso a paso.

## Autor

Martin Medina