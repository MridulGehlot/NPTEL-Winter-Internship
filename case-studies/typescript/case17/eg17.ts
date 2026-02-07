// Abstract class: the blueprint for all content
abstract class Content {
  public readonly title: string;
  public readonly author: string;
  private published: boolean = false;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  public publish() {
    this.published = true;
  }

  protected isPublished(): boolean {
    return this.published;
  }

  // Every content type must say what type it is
  abstract getType(): string;
}

//My Code
class Assignment extends Content
{
private dueDate:Date;
constructor(title:string,author:string,dueDate:Date)
{
super(title,author);
this.dueDate=dueDate
}
public setDueDate(dueDate:Date,isInstructor:boolean):void
{
if(!this.isPublished() && isInstructor) this.dueDate=dueDate;
else throw new Error(`Cannot Update Due Date after Publishing or Instructor Rights Needed`);
}
public getType():string
{
return "Assignment";
}
}

//Testing Code
const assignment = new Assignment("Final Project", "Prof. Smith", new Date("2026-02-15"));
console.log("Type:", assignment.getType()); // "Assignment"
try {
  assignment.setDueDate(new Date("2026-02-20"), false); // learner
} catch (e) {
  console.log(e.message);
}
try {
  assignment.setDueDate(new Date("2026-02-20"), true); // instructor
  console.log("Due date updated successfully.");
} catch (e) {
  console.log(e.message);
}