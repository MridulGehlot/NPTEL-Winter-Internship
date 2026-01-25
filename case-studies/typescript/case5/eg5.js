var storage = [];
function recordAnswer(id, answer) {
    storage.push({
        id: id,
        answer: answer
    });
}
recordAnswer(1, "Mridul");
recordAnswer(2, 4598);
recordAnswer(3, ["Apple", "Ball", "Cat"]);
for (var _i = 0, storage_1 = storage; _i < storage_1.length; _i++) {
    var x = storage_1[_i];
    console.log("ID : ".concat(x.id, ", Answer : ").concat(x.answer));
}
