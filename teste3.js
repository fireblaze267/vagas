var data = require("./fakeData");
const { writeFile } = require("./utils/writeFile");

module.exports = function (req, res) {
  var id = Number(req.query.id);

  //Validando se o parametro existe ou está vazio

  if (!id) {
    return res.status(400).json({ error: "Erro nos parâmetros!" });
  }

  // Procura usuário pelo nome e compara se o usuário realmente foi apagado

  let newArray = data.filter((x) => x.id != id);

  if (data.length !== newArray.length) {
    writeFile(newArray);

    res.status(200).json({ message: "Usuário apagado com sucesso" });
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};
