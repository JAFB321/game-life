export var round = function (number, decimals) {
    var factorDecimal = Math.pow(10, decimals);
    return Math.round(number * factorDecimal) / factorDecimal;
};
//# sourceMappingURL=Math.js.map