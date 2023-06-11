// Tira acentos, deixa em minúsculo e apaga espaços em branco da string

function normalizeString(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

module.exports = {
  normalizeString,
};
