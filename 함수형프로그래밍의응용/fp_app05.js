const { _go, L, log, _map, _join } = require('../lib/fx');

// 추억의 구구단
const gugu = _go(
  L._range(2, 10),
  _map(a =>
    _go(
      L._range(1, 10),
      _map(b => `${a}x${b}=${a * b}`),
      _join('\n'),
    ),
  ),
  _join('\n\n'),
);
log(gugu);
