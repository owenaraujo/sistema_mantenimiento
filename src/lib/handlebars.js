const timeago = require('timeago.js');
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (Timestamp) => {
    return timeagoInstance.format(Timestamp);
};

module.exports = helpers;