const { _go, L, _range, log, _map, _reduce } = require('../lib/fx');
// 별 그리기
const f1 = _go(
  L._range(1, 6),
  _map(_range),
  _map(_map(_ => '*')),
  _map(_reduce((a, b) => `${a}${b}`)),
  _reduce((a, b) => `${a}\n${b}`),
);
log(f1);

// _reduce()부분은 중복되니 따로 함수로 구현해서 수정 => _join()
const _join = sep => _reduce((a, b) => `${a}${sep}${b}`);
const f2 = _go(
  L._range(1, 6),
  _map(_range),
  _map(_map(_ => '*')),
  _map(_join('')),
  _join('\n'),
);
log(f2);
