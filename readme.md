# README - Uso de Comandos en el Módulo de Gestión de Usuarios

Este módulo permite interactuar con el sistema de gestión de usuarios a través de la línea de comandos. A continuación, se explica cómo utilizar los diferentes comandos disponibles.

## Comandos Disponibles

### 1. Listar Usuarios

Para listar todos los usuarios registrados en el sistema, utiliza el siguiente comando:

```bash
node index.js list
```

- **Descripción:** Este comando invoca la función `getUsers()`, que devuelve una lista de todos los usuarios almacenados en el archivo JSON.

### 2. Obtener Usuario por ID

Para obtener un usuario específico utilizando su ID (por ejemplo, `1`), ejecuta el siguiente comando:

```bash
node index.js getID 1
```

- **Descripción:** Este comando llama a `getUserById(args[1])`, donde `args[1]` es el ID del usuario que deseas recuperar. Devuelve el objeto del usuario correspondiente o un mensaje de error si no se encuentra.

### 3. Agregar un Nuevo Usuario

Para agregar un nuevo usuario, proporciona la información requerida (nombre, apellido, email y contraseña) como argumentos. Por ejemplo:

```bash
node index.js add "John Doe" "john@example.com" "password123"
```

- **Descripción:** Este comando crea un nuevo objeto de usuario utilizando la función `createUserObject(args)` y luego llama a `addUser(newUser)`, que valida los datos y agrega el usuario al sistema.

### 4. Actualizar un Usuario

Para actualizar un usuario existente, proporciona el ID del usuario seguido de los nuevos datos (nombre, apellido, email y/o contraseña). Por ejemplo:

```bash
node index.js update 1 "Jane Doe" "jane@example.com" "newpassword"
```

- **Descripción:** Este comando invoca `updateUser(args[1], createUpdateUserObject(args))`, donde `args[1]` es el ID del usuario a actualizar y `createUpdateUserObject(args)` crea un objeto con los nuevos datos.

### 5. Eliminar un Usuario

Para eliminar un usuario especificando su ID (por ejemplo, `1`), ejecuta:

```bash
node index.js delete 1
```

- **Descripción:** Este comando llama a `deleteUser(args[1])`, donde `args[1]` es el ID del usuario que deseas eliminar. Devuelve el usuario eliminado o un mensaje de error si el ID está ausente.

## Ejemplo Completo de Uso

```bash
# Listar todos los usuarios
node index.js list

# Obtener un usuario por ID
node index.js getID 1

# Agregar un nuevo usuario
node index.js add "John Doe" "john@example.com" "password123"

# Actualizar un usuario existente
node index.js update 1 "Jane Doe" "jane@example.com" "newpassword"

# Eliminar un usuario
node index.js delete 1
```

Además, se manejarán errores específicos relacionados con la entrada de datos y las operaciones de usuarios, lo que permitirá una mejor comprensión de los problemas al interactuar con el sistema.

## Conclusión

Estos comandos permiten una fácil gestión de usuarios desde la línea de comandos, facilitando las operaciones de creación, actualización, recuperación y eliminación de registros de usuarios.
