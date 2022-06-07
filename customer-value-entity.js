const ValueEntity = require("@kalix-io/kalix-javascript-sdk").ValueEntity;
const { replies } = require("@kalix-io/kalix-javascript-sdk");

const entity = new ValueEntity(
    ["customer_api.proto", "customer_domain.proto"],
    "customer.api.CustomerService",
    "customers"
);

const domainPkg = "customer.domain.";
const domain = {
    CustomerState: entity.lookupType(domainPkg + "CustomerState"),
    Address: entity.lookupType(domainPkg + "Address"),
}
const apiPkg = "customer.api."
const api = {
    Customer: entity.lookupType(apiPkg + "Customer")
}

entity.setInitial(customerId => domain.CustomerState.create({ customerId: customerId }));

entity.setCommandHandlers({
    Create: create,
    GetCustomer: getCustomer
})

function create(customer, customerState, ctx) {
    let domainCustomer = apiCustomerToCustomerState(customer)
    ctx.updateState(domainCustomer)
    return replies.emptyReply()
}

function getCustomer(request, state, ctx) {
    let apiCustomer = customerStateToApiCustomer(state)
    return replies.message(apiCustomer)
}

function customerStateToApiCustomer(customerState) {
    // right now these two have the same fields so conversion is easy
    return api.Customer.create(customerState)
}

function apiCustomerToCustomerState(apiCustomer) {
    // right now these two have the same fields so conversion is easy
    return domain.CustomerState.create(apiCustomer)
}

module.exports = entity;
