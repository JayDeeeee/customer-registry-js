const Kalix = require("@kalix-io/kalix-javascript-sdk").Kalix

console.log("Starting Value Entity")
const server = new Kalix();
server.addComponent(require("./customer-value-entity-view"))
server.addComponent(require("./customer-value-entity"))
server.start()
// end::register[]

