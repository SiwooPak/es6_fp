const { _go, _filter, log, _reduce } = require("./lib/fx");
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
const products = [
  { no: 1, name: "cola", price: 1100, qty: 2 },
  { no: 2, name: "water", price: 600, qty: 5 },
  { no: 3, name: "coffee", price: 700, qty: 5 },
];

const coins = [100, 500, 1000, 5000, 10000];

/*
  - selected_product: 선택한 상품의 번호
  - payment: 결제수단 방식
  - cash: 현금 결제식 투입되는 현금
  - purchaseStatus: 구매 여부
  - selectedProductIno: 선택한 상품의 정보
  - changes: 잔돈
  - result: 결과값
*/
const main = (selectedProduct, payment, cash) => {
  // 구매상태
  let purchaseStatus = true;
  let selectedProductInfo;
  let avlCash = {},
    changes = {};
  cash = cash || 0;
  // 결과값
  let result = {};

  // 구매하고 싶을 때까지
  while (purchaseStatus) {
    purchaseStatus = false;
  }
  // 선택한 상품 재고 확인
  const productStockCheck = _go(
    products,
    _filter((p) => p.qty > 0 && p.no === selectedProduct),
    check_zero
  );

  // 선택한 상품의 정보 가져오기
  selectedProductInfo = _go(
    products,
    _filter((p) => p.no === selectedProduct)
  )[0];

  // 선택한 상품이 품절이라 구매 불가능한 경우
  if (!productStockCheck) {
    purchaseStatus = false;
    result = `선택하신 상품(${selectedProductInfo.name})은 품절입니다.`;
    return result;
  }

  // 구매가능한 경우, 결제수단은 카드인가?
  if (payment === "card") {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    // 구매 상태 변경
    purchaseStatus = false;
    // 결과 반환(상품 출고)
    result["product"] = selectedProductInfo.name;
    if (cash > 0) result["changes"] = cash;
    log(products);
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

  const totalCash = total(avlCash);
  if (selectedProductInfo.price <= totalCash) {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    result['product'] = selectedProductInfo.name;
    // 현금 차감
    totalCash - selectedProductInfo.price;
  }

  return result;
};

log(main(1, "cash", { 50: 2, 100: 1, 1000: 1 }));
