const { log, add, _map, _filter, _reduce } = require("./fx");

/* go, pipe */
// go() 즉시 함수들과 인자들을 전달해서 즉시 값을 평가하는 함수
const _go = (...args) => _reduce((a, func) => func(a), args);

_go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);

// pipe() 함수를 리턴하는 함수
const _pipe =
  (f, ...func) =>
  (...args) =>
    _go(f(...args), ...func);

const f = _pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);
log(f(add(0, 1)));
/* curry */
