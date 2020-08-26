// const {format}= require ("timeago.js")


// const helpers = {};
// helpers.timeago = (timestamp) => {
//     return format(timestamp);
// }

// module.exports = helpers
const timeago = require('timeago.js');
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (Timestamp) => {
    return timeagoInstance.format(Timestamp);
};

module.exports = helpers;