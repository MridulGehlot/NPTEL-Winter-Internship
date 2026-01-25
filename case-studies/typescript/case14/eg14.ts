class FeedbackBox<T>
{
private feedbacks:T[]=[];
addFeedback(feedback:T)
{
this.feedbacks.push(feedback);
}
getAllFeedbacks():T[]
{
return [...this.feedbacks];
}
}

function getFirstItem<T>(collection:T[]):T|undefined
{
return collection[0];
}

const myLearningFeedback=new FeedbackBox<string>();
myLearningFeedback.addFeedback("Awesome !");
myLearningFeedback.addFeedback("I Am Enjoying MERN Stack Learning");
myLearningFeedback.addFeedback("Super Excited");
console.log(`All Feedbacks are : ${myLearningFeedback.getAllFeedbacks()}`);

type Rating={name:string,rate:number}
const moviesRatings=new FeedbackBox<Rating>();
moviesRatings.addFeedback({name:"Rowdy Rathore",rate:4.3});
moviesRatings.addFeedback({name:"Harry Potter",rate:4.7});
console.log(`All Feedbacks are : ${moviesRatings.getAllFeedbacks()}`);
console.log(`Printing All Movie Ratings`);
let collection=moviesRatings.getAllFeedbacks();
for(let i=0;i<collection.length;i++)
{
let c=collection[i];
for(const rr in c)
{
console.log(c[rr]);
}
}