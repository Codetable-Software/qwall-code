class QwallError extends Error {
  constructor(message, code = "QWALL_ERROR") {
    super(message);
    this.name = "QwallError";
    this.code = code;
  }
}

module.exports = { QwallError };