var data = require("../fakeData");

module.exports = function (req, res, next) {
  var id = Number(req.query.UserId);

  if (!id) {
    res.status(404).json({ error: "Usuário não encontrado" });
  }

  const searchResult = data.find((x) => x.id === id);

  if (req.method === "PUT") {
    if (searchResult.perm_update) {
      next();
    } else {
      res.status(400).json({ erro: "Usuário não tem permissão" });
    }
  }
  if (req.method === "DELETE") {
    if (searchResult.perm_delete) {
      next();
    } else {
      res.status(400).json({ erro: "Usuário não tem permissão" });
    }
  }
};
