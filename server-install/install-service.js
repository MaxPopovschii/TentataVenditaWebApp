var Service = require("node-windows").Service;
const path = require("path");

// Create a new service object
var svc = new Service({
  name: "Ravasio nodejs server",
  description: "Ravasio server",
  script: path.resolve(__dirname, "../server/server/dist/server/src/main.js"),
  env: process.env,
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.on("uninstall", () => {
  svc.install();
});
svc.on("alreadyuninstalled", () => {
  svc.install();
});
try {
  svc.uninstall();
} catch (e) {
  svc.install();
}
