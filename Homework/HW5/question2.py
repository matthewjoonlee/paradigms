class Node:
    def __init__(self, value, left, right):
        self.value = value
        self.left = left
        self.right = right

    def __str__(self):
        return self.value


def traverse(root):
    if root is None:
        return []

    visited = []
    current_level = [root]
    level = 0

    while current_level:
        # Even levels are left to right, odd levels are right to left
        if level % 2 == 1:
            visited.extend(current_level)
        else:
            visited.extend(reversed(current_level))

        next_level = []

        # Build next level left to right
        for node in current_level:
            if node.left is not None:
                next_level.append(node.left)
            if node.right is not None:
                next_level.append(node.right)

        current_level = next_level
        level += 1

    return visited


if __name__ == "__main__":
    node9 = Node("Node9", None, None)
    node10 = Node("Node10", None, None)
    node7 = Node("Node7", None, None)
    node8 = Node("Node8", node9, node10)
    node5 = Node("Node5", None, None) 
    node6 = Node("Node6", node7, node8)
    node3 = Node("Node3", None, None)  
    node4 = Node("Node4", node5, node6)
    node1 = Node("Node1", node3, node4)
    node2 = Node("Node2", None, None)  
    root = Node("Root", node1, node2)
    for v in traverse(root):
        print(v)
