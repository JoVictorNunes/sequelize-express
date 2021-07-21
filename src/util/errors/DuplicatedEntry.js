class DuplicatedEntry extends Error {
  constructor() {
    super("Alguns dados já existem no servidor e não podem ser duplicados. Por favor, reconsidere alterar os dados de envio.");
    this.name = "DuplicatedEntry";
  }
}

module.exports = DuplicatedEntry;