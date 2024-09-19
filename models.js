import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { handleError } from "./utils/handleError.js";

const PATH_FILE = process.env.PATH_FILE;

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Don't have permissions");
    }

    const existsFile = existsSync(PATH_FILE);

    if (!existsFile) {
      writeFileSync(PATH_FILE, JSON.stringify([]));
      throw new Error("File doesn't exists...");
    }

    const users = JSON.parse(readFileSync(PATH_FILE));
    return users;
  } catch (error) {
    const objError = handleError();
    return objError;
  }
};

const response = getUsers();
console.log(response);

const getUserById = (id) => {
  try {
  } catch (error) {}
};

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  const { nombre, apellido, email, password } = userData;

  const users = getUsers();

  const existUser = users.find((userData) => userData.nombre === nombre);

  if (existUser) {
    return "usuario ya existente";
  }

  const newUser = {
    id: randomUUID(),
    nombre,
    apellido,
    email: email,
    password,
  };

  users.push(newUser);

  writeFileSync(PATH_FILE, JSON.stringify(users));

  return "usuario creado";

  //try {
  //} catch (error) {}
};

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (id, userData) => {
  const { nombre, apellido, email, password } = userData;

  const users = getUsers();

  const existUser = users.find((userData) => userData.id === id);

  if (!existUser) {
    return "usuario no existente";
  }

  if (nombre) existUser.nombre = nombre;
  if (apellido) existUser.apellido = apellido;
  if (email) existUser.email = email;
  if (password) existUser.password = password;

  writeFileSync(PATH_FILE, JSON.stringify(users));
  return existUser;
  // try {
  // } catch (error) {}
};

const deleteUser = (id) => {
  const users = getUsers();

  const existsUser = users.find((userData) => userData.id === id);

  if (!existsUser) {
    return "Not found user";
  }

  const newUser = users.filter((user) => user.id !== id);

  writeFileSync(PATH_FILE, JSON.stringify(newUser));

  return newUser;

  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
