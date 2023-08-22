# Pathfinding

Pathfinding is pretty much what it sounds like! You want to find a path (the shortest one in our case) from one point to another. While this is simple in concept, there are a few subtleties that make it more complicated to implement in practice.

The first challenge is that Dijkstra's algorithm only works on graphs. This means that we have to figure out how we can represent the real world, which is continuous, as a graph, which is discrete. 

![Pathfinding Image](imgs/pathfinding/path-img.png)

The simplest way to do this is split up the world into a grid, where each box is a node and connect adjacent grid points with an edge (you can choose to include diagonals or not). Then if there is an obstacle in the grid point, simply remove that node. This is what you are expected to do for this assignment. Additionally, the regularity of the grid means there are potential optimizations when storing the graph and performing Dijkstra's (which you may discover and choose to implement).

# Connectedness

It might also be the case that no path exists, if this is the case, then the graph is said to be disconnected, if, for all pairs of nodes, there is a path between them, then the graph is connected. For the most part we expect that the graph will be connected and that a path with exist. However, you should make sure that your implementation handles the case where no path exists.

# Pathfinding Algorithms

There are multiple algorithms that can be used to implement pathfinding &mdash; meaning there are different systems that we can use to search a graph and analyze the different ways that exist to get from one point to another.  Some of these include Depth First Search (DFS), Breadth First Search (BFS), Dijkstra's Algorithm, and the A* Algorithm.

You may also want to research BFS as it will help you understand Dijkstra's better, and if you have the time, DFS is also useful. We will talk more about A* later as it is still used in practice and only slightly more complex than Dijkstra's.