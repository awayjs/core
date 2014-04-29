///<reference path="../../build/awayjs.next.d.ts" />
var tests;
(function (tests) {
    (function (utils) {
        var IDUtilTest = (function () {
            function IDUtilTest() {
                console.log(away.library.IDUtil.createUID());
            }
            return IDUtilTest;
        })();
        utils.IDUtilTest = IDUtilTest;
    })(tests.utils || (tests.utils = {}));
    var utils = tests.utils;
})(tests || (tests = {}));
//# sourceMappingURL=IDUtilTest.js.map
