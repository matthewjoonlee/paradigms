def text_to_tree(expression: str) -> list:
    # convert the string into tokens (numbers and operators).
    tokens = []
    i = 0
    while i < len(expression):
        ch = expression[i]
        if ch.isspace():
            i += 1
            continue
        if ch.isdigit():
            start = i
            i += 1
            while i < len(expression) and expression[i].isdigit():
                i += 1
            tokens.append(expression[start:i])
            continue
        if ch in "+-*/":
            tokens.append(ch)
            i += 1
            continue

    # Build tree
    class Node:
        def __init__(self, value: str, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

    # Applies precedence rule for higher order operations
    def pemdas(op):
        return 2 if op in "*/" else 1

    operations = []
    nodes = []
    for token in tokens:
        # If token is a number, create a node and push to nodes stack because it is leaf
        if token.isdigit():
            nodes.append(Node(token))
            continue
        # Apply pemdas and left to right precedence like a stack
        while operations and pemdas(operations[-1]) >= pemdas(token):
            op = operations.pop()
            right = nodes.pop()
            left = nodes.pop()
            nodes.append(Node(op, left, right))
        operations.append(token)

    # Add remaining operators
    while operations:
        op = operations.pop()
        right = nodes.pop()
        left = nodes.pop()
        nodes.append(Node(op, left, right))

    root = nodes[0]

    # Output in order
    output = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node.left is not None:
            output.append(f'"{node.value}" -> "{node.left.value}" // left')
            queue.append(node.left)
        if node.right is not None:
            output.append(f'"{node.value}" -> "{node.right.value}" // right')
            queue.append(node.right)
    return output

def print_output(output: list) -> None:
    for line in output:
        print(line)


if __name__ == "__main__":
    expression = "2*7+3"  # Test 1
    output = text_to_tree(expression)
    print_output(output)
