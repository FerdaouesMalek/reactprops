"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _useCommittedRef = _interopRequireDefault(require("./useCommittedRef"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useRafInterval(fn, ms, paused = false) {
  let handle;
  let start = new Date().getTime();
  const fnRef = (0, _useCommittedRef.default)(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = (0, _useCommittedRef.default)(paused);
  function loop() {
    const current = new Date().getTime();
    const delta = current - start;
    if (pausedRef.current) return;
    if (delta >= ms && fnRef.current) {
      fnRef.current();
      start = new Date().getTime();
    }
    cancelAnimationFrame(handle);
    handle = requestAnimationFrame(loop);
  }
  (0, _react.useEffect)(() => {
    handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);
}
var _default = useRafInterval;
exports.default = _default;