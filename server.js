const app = require("./app");
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Microservicio de usuarios corriendo en el puerto: ${ port }`);
});