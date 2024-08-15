const { JsonDatabase } = require("wio.db");

const logs = new JsonDatabase({
    databasePath: "/src/database/logs.json",
});
const infos = new JsonDatabase({
    databasePath: "/src/database/infos.json",
});

module.exports = {
    logs,
    infos
};
