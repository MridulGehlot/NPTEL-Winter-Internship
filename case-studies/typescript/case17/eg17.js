var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Abstract class: the blueprint for all content
var Content = /** @class */ (function () {
    function Content(title, author) {
        this.published = false;
        this.title = title;
        this.author = author;
    }
    Content.prototype.publish = function () {
        this.published = true;
    };
    Content.prototype.isPublished = function () {
        return this.published;
    };
    return Content;
}());
//My Code
var Assignment = /** @class */ (function (_super) {
    __extends(Assignment, _super);
    function Assignment(title, author, dueDate) {
        var _this = _super.call(this, title, author) || this;
        _this.dueDate = dueDate;
        return _this;
    }
    Assignment.prototype.setDueDate = function (dueDate, isInstructor) {
        if (!this.isPublished() && isInstructor)
            this.dueDate = dueDate;
        else
            throw new Error("Cannot Update Due Date after Publishing or Instructor Rights Needed");
    };
    Assignment.prototype.getType = function () {
        return "Assignment";
    };
    return Assignment;
}(Content));
//Testing Code
var assignment = new Assignment("Final Project", "Prof. Smith", new Date("2026-02-15"));
console.log("Type:", assignment.getType()); // "Assignment"
try {
    assignment.setDueDate(new Date("2026-02-20"), false); // learner
}
catch (e) {
    console.log(e.message);
}
try {
    assignment.setDueDate(new Date("2026-02-20"), true); // instructor
    console.log("Due date updated successfully.");
}
catch (e) {
    console.log(e.message);
}
