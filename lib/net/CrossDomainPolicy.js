"use strict";
var CrossDomainPolicy = (function () {
    function CrossDomainPolicy() {
    }
    CrossDomainPolicy.ANONYMOUS = 'anonymous';
    CrossDomainPolicy.USE_CREDENTIALS = 'use-credentials';
    return CrossDomainPolicy;
}());
exports.CrossDomainPolicy = CrossDomainPolicy;
