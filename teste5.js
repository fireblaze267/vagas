const { normalizeString } = require("./utils/string");
var data = require("./fakeData");

module.exports = function (req, res) {
  var name = req.query.name;

  //Validando se o parametro existe ou está vazio

  if (!name) {
    return res.status(400).json({ error: "Erro nos parâmetros!" });
  }

  name = normalizeString(name);

  // Procura Usuario precisamente e retorna quantas vezes ele foi pesquisado
  let result = data.filter((x) => normalizeString(x?.name) === name);

  if (result.length > 0) {
    res.json(
      "Usuário " + result[0]?.name + ` foi lido ${result[0]?.timesSeen} vezes.`
    );
  }

  res.json("Não foi encontrado nenhum usuário com esse nome");
};
