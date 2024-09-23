import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { handleError } from "./utils/handleError.js";
import { get } from "node:http";
import { config } from "dotenv";

config();

const PATH_USERS_FILE = process.env.PATH_USERS_FILE;
const PATH_USERS_ERROR = process.env.PATH_USERS_ERROR;

const getUsers = () => {
  const existsFile = existsSync(PATH_USERS_FILE);

  try {
    if (!existsFile) {
      writeFileSync(PATH_USERS_FILE, JSON.stringify([]));
      console.log("El archivo no existía, se creó uno nuevo.");
    }

    const users = JSON.parse(readFileSync(PATH_USERS_FILE));
    return users;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

const response = getUsers();
console.log(response);

const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  try {
    const { nombre, apellido, email, password } = userData;

    const existsUser = users.find((userData) => userData.nombre === nombre);

    if (existsUser) {
      throw new Error("El usuario ya existe");
    }

    if (!nombre || !apellido || !email || !password) {
      throw new Error("Falta informacion");
    }

    if (typeof nombre !== "string") {
      throw new Error("El nombre es inválido");
    }

    if (typeof apellido !== "string") {
      throw new Error("El apellido es inválido");
    }

    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("El email es inválido");
    }

    existsUser = users.find((user) => user.email === email);
    if (existsUser) {
      throw new Error("El email ya está en uso");
    }

    const newUser = {
      id: randomUUID(),
      nombre,
      apellido,
      email,
      password,
      isLoggedId,
    };
    const users = getUsers(PATH_USERS_FILE);
    users.push(newUser);
    writeFileSync(PATH_USERS_FILE, JSON.stringify(users));

    return newUser;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (id, userData) => {
  try {
    const { nombre, apellido, email, password } = userData;

    if (!id || !userData) {
      throw new Error("ID no encontrado");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = getUserById(id);

    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (email) user.email = email;
    if (password) user.password = password;

    writeFileSync(PATH_USERS_FILE, JSON.stringify(users));

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("ID no encontrado");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = getUserById(id);

    const newUser = users.filter((user) => user.id !== id);

    writeFileSync(PATH_USERS_FILE, JSON.stringify(newUser));

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
