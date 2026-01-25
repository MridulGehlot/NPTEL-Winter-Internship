type Profile={
username:string;
bio:string|null;
avatarUrl?:string
}

let p1:Profile={
username:"Amit",
bio:null
}

let p2:Profile={
username:"Bobby",
bio:"CSE Undergraduate",
avatarUrl:"HTTPS://SOME Image"
}

function show(p:Profile):void
{
let bio= p.bio===null?"No Bio Provided":`Bio : ${p.bio}`;
let url= p.avatarUrl?`URL : ${p.avatarUrl}`:"No Avatar URL";
console.log(`Name : ${p.username} - ${bio} - ${url}`);
}

show(p1);
show(p2);