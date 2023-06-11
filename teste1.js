const { response } = require("express");
var data = require("./fakeData");
const { normalizeString } = require("./utils/string");
const { writeFile } = require("./utils/writeFile");

const getUser = (req, res, next) => {
  var name = req.query.name;

  //Validando se o parametro existe ou está vazio

  if (!name) {
    return res.status(400).json({ error: "Erro nos parâmetros!" });
  }

  name = normalizeString(name);

  // Procurando em fakeData se existe algum nome de usuário que se pareça com os paremetros enviados

  let response = data.filter((x) => normalizeString(x?.name).includes(name));

  // Se retornar algum usuário ele vai adicionar +1 na prop de vezes que o usuário foi visto

  if (response.length > 0) {
    data.map((x) => {
      response.map((y) => {
        if (y.id === x.id) {
          x.timesSeen = x.timesSeen + 1;
        }
      });
    });

    writeFile(data);
  }

  res.status(200).json(response);
};

const getUsers = (req, res, next) => {
  res.status(200).json(data);
};

module.exports = {
  getUser,
  getUsers,
};
