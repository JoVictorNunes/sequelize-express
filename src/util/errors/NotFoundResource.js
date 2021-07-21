class NotFoundResource extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundResource";
  }
}

module.exports = NotFoundResource;