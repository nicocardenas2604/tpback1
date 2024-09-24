# Módulo de Gestión de Usuarios

Este módulo de JavaScript proporciona funcionalidades para la gestión de usuarios, incluyendo la creación, recuperación, actualización y eliminación de registros de usuarios. Utiliza módulos integrados de Node.js y bibliotecas externas para operaciones de archivos y gestión de variables de entorno.

## Características

### Recuperación de Usuarios

- Obtener una lista de todos los usuarios.
- Recuperar un usuario específico por su ID.

### Creación de Usuarios

- Añadir un nuevo usuario con validación de datos.
- Hash automático de contraseñas para mayor seguridad.

### Actualización de Usuarios

- Actualizar detalles de usuario, incluyendo nombre, email y contraseña.
- Asegurar la unicidad del email.

### Eliminación de Usuarios

- Eliminar un usuario por su ID.

## Comandos

### 1. Listar Usuarios

Para listar todos los usuarios registrados, ejecuta el siguiente comando:

```bash
node index.js list
```

### 2. Obtener Usuario por ID

Para obtener un usuario específico por su ID (suponiendo que el ID es `1`), utiliza el siguiente comando:

```bash
node index.js getID 1
```

### 3. Agregar un Nuevo Usuario

Para agregar un nuevo usuario, proporciona el nombre y el correo electrónico. Por ejemplo:

```bash
node index.js add "John Doe" "john@example.com"
```

### 4. Actualizar un Usuario

Para actualizar un usuario existente (suponiendo que el ID del usuario es `1` y que los nuevos datos son un nombre y un correo electrónico), utiliza el siguiente comando:

```bash
node index.js update 1 "Jane Doe" "jane@example.com"
```

### 5. Eliminar un Usuario

Para eliminar un usuario (suponiendo que el ID del usuario a eliminar es `1`), ejecuta:

```bash
node index.js delete 1
```
