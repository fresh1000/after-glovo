export const discount = (price: number) => {
  return parseFloat((price * 0.8).toFixed(2))
}