const { _go, L, _takeAll, _take, log, map } = require("../lib/fx");

// 지연평가 + Promise - L.map, map, take
_go(
  [1, 2, 3],
  L._map((a) => Promise.resolve(a + 10)),
  _take(2),
  log
);

_go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L._map((a) => Promise.resolve(a + 10)),
  _take(2),
  log
);

_go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => Promise.resolve(a + 10)),
  log
);
