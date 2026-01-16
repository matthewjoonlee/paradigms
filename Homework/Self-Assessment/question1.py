def bfs_traversal(graph, initial_node):
    # your implementation here
    # your function will return a list!

    #visited set to keep track of visited nodes
    visited = set()
    #order of traversal
    order = []
    #queue with initial node and add to visited list
    queue = [initial_node]
    visited.add(initial_node)
    while queue:
        #pop front node and add to order
        current_node = queue.pop(0)
        order.append(current_node)
        #get all neighbors and add to queue
        for neighbor in graph[current_node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

def main ():
    #test case
    graph = {"+": ["*",3], "*":[2,7], 2:[],7:[],3:[]}
    initial_node = "+" 
    print(bfs_traversal(graph, initial_node))

if __name__ == "__main__":
    main()