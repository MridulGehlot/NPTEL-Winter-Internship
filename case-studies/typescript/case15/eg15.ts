//Data Model
type Learner = { id: string; quizzesCompleted: number };
type Instructor = { id: string; coursesTaught: number };
type Admin = { id: string; accessLevel: "basic" | "super" };
//My Task
type InstructorOrAdmin=Instructor|Admin;
type Assignment={title:string; dueDate:Date; points:number};
type ReadOnlyAssignment=Readonly<Assignment>;
type LearnerStats={quizzes:number; videos:number; assignments:number};
type StatsAsStrings=
{
[k in keyof LearnerStats]:string;
};