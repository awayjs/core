///<reference path="../../build/AME.next.d.ts" />
var tests;
(function (tests) {
    (function (managers) {
        var Delegate = away.utils.Delegate;

        var ManagersTest = (function () {
            function ManagersTest() {
                away.Debug.THROW_ERRORS = false;

                this.stage = new away.display.Stage();

                var manager = away.managers.StageGLManager.getInstance(this.stage);

                this.sProxy = manager.getStageGLProxy(0);
                this.sProxy.addEventListener(away.events.StageGLEvent.CONTEXTGL_CREATED, Delegate.create(this, this.onContextCreated));
                this.sProxy.addEventListener(away.events.StageGLEvent.CONTEXTGL_RECREATED, Delegate.create(this, this.onContextReCreated));
                this.sProxy.addEventListener(away.events.StageGLEvent.CONTEXTGL_DISPOSED, Delegate.create(this, this.onContextDisposed));

                this.rttBfrA = away.managers.RTTBufferManager.getInstance(this.sProxy);
                this.rttBfrB = away.managers.RTTBufferManager.getInstance(this.sProxy);

                console.log('this.rttBfrA', this.rttBfrA);
                console.log('this.rttBfrB', this.rttBfrB);

                this.rttBfrB.dispose();

                console.log('this.rttBfrA', this.rttBfrA);
                console.log('this.rttBfrB', this.rttBfrB);
            }
            ManagersTest.prototype.onContextCreated = function (e) {
                away.Debug.log('onContextCreated', e);
            };

            ManagersTest.prototype.onContextReCreated = function (e) {
                away.Debug.log('onContextReCreated', e);
            };

            ManagersTest.prototype.onContextDisposed = function (e) {
                away.Debug.log('onContextDisposed', e);
            };
            return ManagersTest;
        })();
        managers.ManagersTest = ManagersTest;
    })(tests.managers || (tests.managers = {}));
    var managers = tests.managers;
})(tests || (tests = {}));
//# sourceMappingURL=ManagersTest.js.map
