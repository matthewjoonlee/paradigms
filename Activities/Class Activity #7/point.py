import math

# constructor
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    # method to print the point
    def print(self):
        print(f"({self.x},{self.y})")

# function to calculate the distance between two points
def distance(p1, p2):
    return math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)

# test case
if __name__ == "__main__":
    p1 = Point(3, 7)
    p2 = Point(-1, -2)

    p1.print()
    p2.print()
    print(distance(p1, p2))
