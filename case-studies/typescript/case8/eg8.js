var p1 = {
    username: "Amit",
    bio: null
};
var p2 = {
    username: "Bobby",
    bio: "CSE Undergraduate",
    avatarUrl: "HTTPS://SOME Image"
};
function show(p) {
    var bio = p.bio === null ? "No Bio Provided" : "Bio : ".concat(p.bio);
    var url = p.avatarUrl ? "URL : ".concat(p.avatarUrl) : "No Avatar URL";
    console.log("Name : ".concat(p.username, " - ").concat(bio, " - ").concat(url));
}
show(p1);
show(p2);
