var data = require("./fakeData");
const { writeFile } = require("./utils/writeFile");

module.exports = function (req, res) {
  var id = Number(req.query.id);
  var body = req.body;

  //Validando se o parametro existe ou está vazio

  if (!id) {
    return res.status(400).json({ error: "Erro nos parâmetros!" });
  }

  // Acha aonde precisa ser alterado por id e só altera informações que foram enviadas

  var foundIndex = data.findIndex((x) => x.id === id);

  if (foundIndex != -1) {
    data[foundIndex] = {
      ...data[foundIndex],
      name: body?.name ? body.name : data[foundIndex].name,
      job: body?.job ? body.job : data[foundIndex].job,
      perm_delete: body?.perm_delete
        ? body?.perm_delete
        : data[foundIndex].perm_delete,
      perm_update: body?.perm_update
        ? body?.perm_update
        : data[foundIndex].perm_update,
    };

    writeFile(data);

    res.status(200).json({ message: "Usuário alterado com sucesso" });
  } else {
    res.status(404).json({ error: "Não foi possivel encontrar o usuário" });
  }
};
