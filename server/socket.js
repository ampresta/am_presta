let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: { origin: "http://127.0.0.1:3000" },
    });
    return io;
  },

  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  },
};
