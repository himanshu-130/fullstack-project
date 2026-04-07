export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString()}`;
};