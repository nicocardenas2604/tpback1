// Averiguar que importar de NODE para realizar el hash del pass
// Averiguar como "activar" la lectura de las variables de entorno del archivo .env (dotenv)
// 1° recuperar variables de entorno
// 2° Declarar los metodos

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { handleError } from "./utils/handleError.js";
import {
  createUserObject,
  createUpdateUserObject,
  hashPassword,
  validateEmail,
} from "./utils/createObjectUser.js";
import { config } from "dotenv";

config();

const PATH_USERS_FILE = process.env.PATH_USERS_FILE;
const PATH_USERS_ERROR = process.env.PATH_USERS_ERROR;

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Don't have permissions");
    }

    const existsFile = existsSync(PATH_USERS_FILE);

    if (!existsFile) {
      writeFileSync(PATH_USERS_FILE, JSON.stringify([]));
      throw new Error("File doesn't exists...");
    }

    const users = JSON.parse(readFileSync(PATH_USERS_FILE));
    return users;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
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
      throw new Error("User already exists");
    }

    if (!nombre || !apellido || !email || !password) {
      throw new Error("Missing data");
    }

    if (
      typeof nombre !== "string" ||
      typeof apellido !== "string" ||
      typeof email !== "string"
    ) {
      throw new Error("Invalid data type");
    }

    validateEmail(email, users);
    let newUser = createUserObject(userData);

    newUser = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashPassword(password),
      isLoggedIn,
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
    if (!id || !userData) {
      throw new Error("ID or data is missing");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = getUserById(id);

    const updatedData = createUpdateUserObject(userData);

    if (updatedData.nombre) user.nombre = updatedData.nombre;
    if (updatedData.apellido) user.apellido = updatedData.apellido;

    if (updatedData.email) {
      validateEmail(updatedData.email, users, id);
      user.email = updatedData.email;
    }

    if (userData.password) {
      user.password = hashPassword(userData.password);
    }

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
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_USERS_FILE);
    const user = getUserById(id);

    const updatedUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE, JSON.stringify(updatedUsers));

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_USERS_ERROR);
    return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
