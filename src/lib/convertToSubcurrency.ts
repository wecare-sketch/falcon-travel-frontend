/**
 * Converts a dollar amount to the smallest currency unit (cents for USD)
 * @param amount - The amount in dollars (e.g., 200.50)
 * @param factor - The conversion factor (default: 100 for cents)
 * @returns The amount in smallest currency unit (e.g., 20050 for $200.50)
 */
function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export default convertToSubcurrency;