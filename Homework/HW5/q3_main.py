from question3 import Course, Professor, Student, TA, UniversityMember


if __name__ == "__main__":
    # Professor and TAs
    professor = Professor(
        "Joanna Cecilia da Silva Santos",
        "00001",
        "jdasilv2@nd.edu",
        "Computer Science and Engineering",
    )

    ta1 = TA("Ben Pable", "00002", "bpable@nd.edu")
    ta2 = TA("Prince Noah Johnson", "00003", "pjohns24@nd.edu")
    ta3 = TA("Robert Wallace", "00004", "rwallac1@nd.edu")
    ta4 = TA("Tomas Sousa Pereira", "00005", "tsousape@nd.edu")

    # Course
    paradigms = Course("Programming Paradigms", "CSE30332")
    paradigms.add_instructor(professor)

    # Assign TAs
    ta1.assign_to_course(paradigms)
    ta2.assign_to_course(paradigms)
    ta3.assign_to_course(paradigms)
    ta4.assign_to_course(paradigms)

    # Students
    student1 = Student(
        "Matthew Lee",
        "902272412",
        "mlee55@nd.edu",
        "Computer Science and Engineering",
    )
    student2 = Student(
        "Reagan McGowan",
        "123456",
        "rmcgowa2@nd.edu",
        "Business Analytics",
    )
    student3 = Student(
        "Michael Richelsen",
        "123457",
        "mrichels@nd.edu",
        "Finance",
    )

    # Enroll students
    paradigms.add_student(student1)
    paradigms.add_student(student2)
    paradigms.add_student(student3)

    # Print info
    print(professor)
    print(ta1)
    print(ta2)
    print(ta3)
    print(ta4)
    print(student1)
    print(student2)
    print(student3)
    print(UniversityMember.num_members)
