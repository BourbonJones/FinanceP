const Operation = require("../models/opetation");

//Controller
async function getOperations(person) {
    let currentOps = await Operation.find({person: person});
    return { "message": currentOps };
}

async function storeOparation( item, date, value, category, person ) {
    let newOp = new Operation({ item: item, date: date, value: value, category: category, person: person });
    console.log(newOp);
    try {
        await newOp.save();
        return { "message": "Oparation added to database" };
    } catch (err) {
        return { "message": err };
    }
}

async function changeOperation( id, item, date, value, category, person ) {
    try {
        var currentOp = await Operation.findByIdAndUpdate(id, { item: item, date: date, value: value, category: category, person: person }, {new: true});
        return { "message": currentOp };
    } catch (err) {
        return { "message": err };
    }
}

async function deleteOperation(id) {
    try {
        await Operation.findByIdAndRemove(id);
        return { "message": "Operation removed" };
    } catch (err) {
        return { "message": err };
    }
}

module.exports = {
    getOperations: getOperations,
    storeOparation: storeOparation,
    deleteOperation: deleteOperation,
    changeOperation: changeOperation
}