import express from 'express';
import { InMemoryCourseRepository } from './repositories/InMemoryCourseRepository';
import { CourseService } from './services/CourseService';

const app = express();
app.use(express.json());

// Dependency Injection - Repository Pattern
const courseRepo = new InMemoryCourseRepository();
const courseService = new CourseService(courseRepo);

// Routes - Business logic uses INTERFACE only
app.post('/courses/:id/enroll', async (req, res) => {
  try {
    const result = await courseService.enroll(
      Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      req.body.studentId
    );
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/students/:id/courses', async (req, res) => {
  try {
    const studentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const courses = await courseService.getStudentCourses(studentId);
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    const courseId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await courseService.deleteCourse(courseId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('\nUniversity Registration');
  console.log('http://localhost:3000');
  console.log('\nROUTES:');
  console.log('POST  /courses/1/enroll     # {"studentId": "student3"}');
  console.log('GET   /students/student1/courses');
  console.log('DELETE /courses/2         # Delete course');
});
