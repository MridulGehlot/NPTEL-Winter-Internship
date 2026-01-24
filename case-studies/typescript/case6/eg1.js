function processTransaction(amount, desc, isCredit) {
    if (amount < 0) {
        throw new Error("Amount is Negative ".concat(amount));
    }
    if (desc == undefined) {
        desc = "";
    }
    console.log("Summary of the Transaction");
    console.log("Amount : ".concat(amount, ", Description : ").concat(desc, ", isCredit : ").concat(isCredit));
}
processTransaction(1000, "Here's Your Tip!!!", true);
var desc;
processTransaction(500, desc, false);
processTransaction(-50, desc, false);
