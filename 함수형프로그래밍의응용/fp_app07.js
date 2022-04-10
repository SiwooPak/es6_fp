const { log } = require('../lib/fx');
// query, queryToObject
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};
// 명령형
function query1(obj) {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') res += '&';
    res += k + '=' + v;
  }
  return res;
}
log(query1(obj1));
// 함수형(entries(), reduce())
function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return query + (i > 0 ? '&' : '') + k + '=' + v;
  }, '');
}
log(query2(obj1));
