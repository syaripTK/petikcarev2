const app = require("./app.js");
const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
