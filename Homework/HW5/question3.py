from abc import ABC, abstractmethod


# Base class
class UniversityMember(ABC):
    num_members = 0

    def __init__(self, name, member_id, email):
        self.name = name
        self.member_id = member_id
        self.email = email
        UniversityMember.num_members += 1

    # Defined by each child class
    @abstractmethod
    def get_role(self):
        pass


class Student(UniversityMember):
    def __init__(self, name, member_id, email, major):
        super().__init__(name, member_id, email)
        self.major = major

    def get_role(self):
        return "Student"

    def __str__(self):
        return f"{self.name} ({self.email}) - Major: {self.major}"


class Professor(UniversityMember):
    def __init__(self, name, member_id, email, department):
        super().__init__(name, member_id, email)
        self.department = department

    def get_role(self):
        return "Professor"

    def __str__(self):
        # Last name only
        last_name = self.name.split()[-1]
        return f"Prof. {last_name} ({self.email})"


class TA(UniversityMember):
    def __init__(self, name, member_id, email):
        super().__init__(name, member_id, email)
        self.courses_assisting = []

    def get_role(self):
        return "TA"

    def assign_to_course(self, course):
        if course not in self.courses_assisting:
            self.courses_assisting.append(course)

    def __str__(self):
        # Course codes with commas
        course_codes = ", ".join(course.code for course in self.courses_assisting)
        return f"{self.name} ({self.email}). TA for Courses: {course_codes}"


# Course info
class Course:
    def __init__(self, name, code, enrolled_students=None, instructor=None):
        self.name = name
        self.code = code
        self.enrolled_students = enrolled_students if enrolled_students is not None else []
        self.instructor = instructor

    def add_student(self, student):
        if student not in self.enrolled_students:
            self.enrolled_students.append(student)

    def remove_student(self, student):
        if student in self.enrolled_students:
            self.enrolled_students.remove(student)

    def add_instructor(self, instructor):
        self.instructor = instructor

    def remove_instructor(self):
        self.instructor = None
