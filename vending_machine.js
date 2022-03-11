const { _go, _filter, _reduce } = require("./lib/fx");
const { log, table } = console;
const check_zero = (products) => products.length > 0;
const changeQty = (products, no) => {
  products.forEach((p) => {
    if (p.no === no) return p.qty--;
  });
};
const total = (avlCash) =>
  _go(
    Object.keys(avlCash),
    _reduce((a, b) => Number(a) * avlCash[a] + Number(b) * avlCash[b])
  );

const last_changes = (totalCash, changes) => {
  for (const coin of coins) {
    if (totalCash < coin) continue;
    const count = Math.floor(totalCash / coin);
    if (changes[coin]) changes[coin] += count;
    else changes[coin] = count;
    totalCash -= coin * Math.floor(totalCash / coin);
  }
};

const productsStatus = (str, products) => {
  log(str);
  table(products);
  log("================");
};

const products = [
  { no: 1, name: "cola", price: 1100, qty: 2 },
  { no: 2, name: "water", price: 600, qty: 5 },
  { no: 3, name: "coffee", price: 700, qty: 5 },
];

const coins = [10000, 5000, 1000, 500, 100];

/*
  - selected_product: 선택한 상품의 번호
  - payment: 결제수단 방식
  - cash: 현금 결제식 투입되는 현금
  - selectedProductIno: 선택한 상품의 정보
  - changes: 잔돈
  - result: 결과값
*/
const main = (selectedProduct, payment, cash) => {
  let avlCash = {},
    changes = {};
  cash = cash || 0;
  // 결과값
  let result = {};
  productsStatus("구매 전 재고 상태", products);
  // 결제수단이 혐금이고 현금을 투입하지 않을시
  if (payment === "cash" && cash === 0) {
    return { screen: "금액부족" };
  }

  // 선택한 상품 재고 확인
  const productStockCheck = _go(
    products,
    _filter((p) => p.qty > 0 && p.no === selectedProduct),
    check_zero
  );

  // 선택한 상품의 정보 가져오기
  const selectedProductInfo = _go(
    products,
    _filter((p) => p.no === selectedProduct)
  )[0];
  // 번호에 해당하는 상품이 없는 경우
  if (selectedProductInfo === undefined)
    return {
      screen: `번호(${selectedProduct})에 해당하는 상품이 없습니다.`,
    };

  // 선택한 상품이 품절이라 구매 불가능한 경우
  if (!productStockCheck) {
    purchaseStatus = false;
    result.screen = `선택하신 상품(${selectedProductInfo.name})은 품절입니다.`;
    return result;
  }

  // 구매가능한 경우, 결제수단은 카드인가?
  if (payment === "card") {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    // 결과 반환(상품 출고)
    result["selectedProduct"] = selectedProductInfo.name;
    result["payment"] = payment;
    // 만약 현금을 투입한 경우
    if (cash > 0) result["changes"] = cash;
    productsStatus("구매 전 재고 상태", products);
    return result;
  }

  // 결제수단이 현금인 경우
  // 투입한 현금 중에 사용가능한 현금만 걸러내기
  _go(
    Object.keys(cash),
    _filter((c) => {
      if (coins.find((v) => v === Number(c))) {
        avlCash[c] = cash[c];
      } else {
        changes[c] = cash[c];
      }
    })
  );

  let totalCash = total(avlCash);

  // 상품 금액이 충족한 경우
  if (selectedProductInfo.price <= totalCash) {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    // 현금 차감
    totalCash -= selectedProductInfo.price;
    // 최종 거스름돈 구하기
    last_changes(totalCash, changes);
    result.selectedProduct = selectedProductInfo.name;
    result.payment = payment;
    result.changes = changes;
  } else {
    // 금액 부족일시 스크린에 금액부족 및 잔돈 반환
    last_changes(totalCash, changes);
    result.screen = "금액부족";
    result.changes = changes;
  }
  productsStatus("구매 후 재고 상태", products);

  return result;
};

log(main(1, "cash", { 500: 2, 1000: 1 }));
log(main(2, "cash", { 500: 2, 1000: 1 }));
log(main(4, "card"));
