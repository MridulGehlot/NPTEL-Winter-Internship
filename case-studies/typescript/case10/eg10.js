function checkSign(num) {
    if (num >= 0)
        console.log("Number is positive");
    else
        console.log("Number is negative");
}
function evenOrOdd(num) {
    if (num % 2 == 1)
        console.log("Number is odd");
    else
        console.log("Number is even");
}
function getGrade(score) {
    if (score >= 90)
        return "A";
    else if (score >= 80)
        return "B";
    else if (score >= 70)
        return "C";
    else if (score >= 60)
        return "D";
    else
        return "F";
}
function provideFeedback(grade) {
    switch (grade) {
        case "A":
            console.log("Excellent Performence");
            break;
        case "B":
            console.log("Good Performence");
            break;
        case "C":
            console.log("Average Performence");
            break;
        case "D":
            console.log("Need Improvement");
            break;
        case "F":
            console.log("Urgent Attention Needed");
            break;
        default:
            console.log("Invalid Grade");
    }
}
var num = -56;
checkSign(num);
evenOrOdd(num);
var grade = getGrade(91);
provideFeedback(grade);
