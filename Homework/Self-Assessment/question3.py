def tree_to_text(tree, root_node):
    # Split node number from value or operator
    def node_value(label):
        return label.split("_", 1)[1]

    # Pemdas for operations
    def pemdas(op):
        return 2 if op in "*/" else 1

    # Build the expression string with recursion
    def build(node):
        value = node_value(node)
        children = tree.get(node, [])
        if not children:
            return value

        left_node, right_node = children
        left_expr = build(left_node)
        right_expr = build(right_node)

        # Return expression
        return f"{left_expr}{value}{right_expr}"

    return build(root_node)

if __name__ == "__main__":
    # Test case
    tree ={'n1_+': ['n2_3', 'n3_*'], 'n3_*': ['n4_/', "n5_2"], 'n4_/': ["n6_10", "n7_5"], "n6_10": [], "n7_5": [], "n5_2": [], 'n2_3': []}
    root_node = "n1_+" 
    expression = tree_to_text(tree, root_node)
    print(expression)