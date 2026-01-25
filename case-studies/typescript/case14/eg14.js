var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var FeedbackBox = /** @class */ (function () {
    function FeedbackBox() {
        this.feedbacks = [];
    }
    FeedbackBox.prototype.addFeedback = function (feedback) {
        this.feedbacks.push(feedback);
    };
    FeedbackBox.prototype.getAllFeedbacks = function () {
        return __spreadArray([], this.feedbacks, true);
    };
    return FeedbackBox;
}());
function getFirstItem(collection) {
    return collection[0];
}
var myLearningFeedback = new FeedbackBox();
myLearningFeedback.addFeedback("Awesome !");
myLearningFeedback.addFeedback("I Am Enjoying MERN Stack Learning");
myLearningFeedback.addFeedback("Super Excited");
console.log("All Feedbacks are : ".concat(myLearningFeedback.getAllFeedbacks()));
var moviesRatings = new FeedbackBox();
moviesRatings.addFeedback({ name: "Rowdy Rathore", rate: 4.3 });
moviesRatings.addFeedback({ name: "Harry Potter", rate: 4.7 });
console.log("All Feedbacks are : ".concat(moviesRatings.getAllFeedbacks()));
console.log("Printing All Movie Ratings");
var collection = moviesRatings.getAllFeedbacks();
for (var i = 0; i < collection.length; i++) {
    var c = collection[i];
    for (var rr in c) {
        console.log(c[rr]);
    }
}
