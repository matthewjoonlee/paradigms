def move_robot(n):
    # Origin
    positions = [(0, 0)]
    x, y = 0, 0

    # N, E, S, W
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    for step_number in range(1, n + 1):
        # Pick direction based on the turn
        dx, dy = directions[(step_number - 1) % 4]

        # Move robot
        x += dx * step_number
        y += dy * step_number
        positions.append((x, y))

    return positions


if __name__ == "__main__":
    for v in move_robot(4):
        print(v)
