// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
// 3° aplicar control de errores entorno a las posibilidades de que surja uno
import { createHash } from "node:crypto";

const createUserObject = (args) => {
  return {
    nombre: args[1],
    apellido: args[2],
    email: args[3],
    password: args[4],
    isLoggedIn: false,
  };
};

const createUpdateUserObject = (args) => {
  return {
    nombre: args[2],
    apellido: args[3],
    email: args[4],
    password: args[5],
  };
};

const hashPassword = (password) => {
  return createHash("sha256").update(password).digest("hex");
};

const validateEmail = (email, users, userId = null) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const existsEmail = users.find((u) => u.email === email && u.id !== userId);
  if (existsEmail) {
    throw new Error("Email already exists");
  }
};

export {
  createUserObject,
  createUpdateUserObject,
  hashPassword,
  validateEmail,
};
