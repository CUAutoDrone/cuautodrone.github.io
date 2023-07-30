# Pathfinding

Pathfinding is pretty much what it sounds like! You want to find a path (the shortest one in our case) from one point to another.

If you are given a set of many destinations that all have paths between them, there are many ways to get from the starting destination to the end destination.  Computers and programs look at this situation differently from humans though -- they must take a more systematic and algorithmic approach.  This means that there are many different methods that we can search through all the destinations (or more generally, a data structure).

# Types of Graphs That Pathfinding Will Work With

We've already covered a little bit about what graphs are, and how their structures involve nodes that can be labeled or unlabeled.  Graphs can also be discrete or continuous.  Discrete graphs are a series of unconnected points that do not have paths between them.  Continuous graphs on the other hand do have paths in between the points.

Pathfinding will obviously work best if there is an actual path to be followed.  As a result, you will conduct pathfinding on a continuous graph.

# Pathfinding Algorithms

There are multiple algorithms that can be used to implement pathfinding -- meaning there are different systems that we can use to search a graph and analyze the different ways that exist to get from one point to another.  Some of these include Depth First Search, Breadth First Search, Djikstra's Algorithm, and the A* Algorithm.

You will be implementing Djikstra's algorithm, but we recommend also doing a bit of research on DFS and BFS if you have time, as these may help you understand Djikstra's algorithm a little better.

![Pathfinding Image](imgs/pathfinding/path-img.png)
