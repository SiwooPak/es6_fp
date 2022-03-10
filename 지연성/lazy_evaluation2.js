const { _filter, _take, _map, _map, log, L } = require("../lib/fx");

// range, map, filter, take, reduce 중첩사용
go(
  _range(10),
  _map((n) => n + 10),
  _filter((n) => n % 2),
  _take(2),
  log
);
// 위의 코드 지연평가로 리팩토링
go(
  L._range(10),
  L._map((n) => n + 10),
  L._filter((n) => n % 2),
  L._take(2),
  log
);
