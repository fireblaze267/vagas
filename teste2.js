var data = require("./fakeData");
const fs = require("fs/promises");
const { writeFile } = require("./utils/writeFile");

module.exports = function (req, res) {
  var body = req.body;

  // Validando as informações que vem do body

  if (!body?.name || !body?.job) {
    return res.status(400).json({ error: "Erro nos parâmetros!" });
  }

  // Criando array com novo Usuário (permissões por padrão vem desligadas )

  data.push({
    id: data.length + 1,
    name: body.name,
    job: body.job,
    timesSeen: 0,
    perm_update: false,
    perm_delete: false,
  });

  // Reescrevendo arquivo fakeData como novo array
  writeFile(data);

  res.status(200).json({ message: "usuário cadastrado com sucesso" });
};
