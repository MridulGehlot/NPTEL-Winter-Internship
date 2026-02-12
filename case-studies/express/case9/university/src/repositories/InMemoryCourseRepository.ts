import { ICourseRepository } from './interfaces/ICourseRepository';
import { Course } from '../models/Course';

export class InMemoryCourseRepository implements ICourseRepository {
  private courses: Course[] = [
    { id: '1', name: 'CS101', capacity: 30, students: [] },
    { id: '2', name: 'MATH201', capacity: 25, students: ['student1'] },
    { id: '3', name: 'PHYS301', capacity: 20, students: ['student1', 'student2'] }
  ];

  async findAll(): Promise<Course[]> {
    return this.courses;
  }

  async findById(id: string): Promise<Course | null> {
    return this.courses.find(course => course.id === id) || null;
  }

  async save(course: Course): Promise<void> {
    const idx = this.courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      this.courses[idx] = course;
    } else {
      this.courses.push(course);
    }
  }

  async enrollStudent(courseId: string, studentId: string): Promise<void> {
    const course = await this.findById(courseId);
    if (course && !course.students.includes(studentId)) {
      course.students.push(studentId);
      await this.save(course);
    }
  }

  async findByStudentId(studentId: string): Promise<Course[]> {
    return this.courses.filter(course => course.students.includes(studentId));
  }

  async delete(courseId: string): Promise<void> {
    const idx = this.courses.findIndex(c => c.id === courseId);
    if (idx >= 0) {
      this.courses.splice(idx, 1);
    }
  }
}
