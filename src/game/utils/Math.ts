export const round = (number: number, decimals: number) => {
    const factorDecimal = Math.pow(10, decimals);
    return Math.round(number * factorDecimal) / factorDecimal;
}