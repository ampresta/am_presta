let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
	    cors: { origin: "http://102.50.245.168:58356" },
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
