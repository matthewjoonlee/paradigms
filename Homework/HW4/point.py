import math

class Point:
    # Initializes a point with x and y coordinates.
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Prints the point in the format (x,y).
    def print(self):
        print(f"({self.x},{self.y})")

    # Calculate distance to (0,0)
    def calculate_distance_to_origin(self):
        return math.sqrt((self.x ** 2) + (self.y ** 2))

    # Greater than > 
    def __gt__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (
            self.calculate_distance_to_origin()
            > other.calculate_distance_to_origin()
        )

    # Greather than or equal to >=
    def __ge__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (
            self.calculate_distance_to_origin()
            >= other.calculate_distance_to_origin()
        )

    # Equal to ==
    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (
            self.calculate_distance_to_origin()
            == other.calculate_distance_to_origin()
        )

    # Less than <
    def __lt__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (
            self.calculate_distance_to_origin()
            < other.calculate_distance_to_origin()
        )

    # Less than or equal to <=
    def __le__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (
            self.calculate_distance_to_origin()
            <= other.calculate_distance_to_origin()
        )


# Test cases 
if __name__ == "__main__":
    p1 = Point(2,3)  
    p2 = Point(-3,1) 
    p3 = Point(-2,-3)
    print(p1 > p2) # prints True because p1 is more distant to the origin than p2
    print(p1 == p2) # prints False because p1 and p2 are not equally distant to the origin 
    print(p1 < p2) # prints False because p1 is not closer to the origin as compared to p2
    print(p1 == p3) # prints True  because p1 and p3 are equally distant to the origin
