const history = new Map();

function get(session = "default") {
  return history.get(session) || [];
}

function add(session, message) {
  const list = get(session);
  list.push(message);
  history.set(session, list);
}

function clear(session = "default") {
  history.delete(session);
}

module.exports = { get, add, clear };