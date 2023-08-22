# Graphs
Graphs are a mathematical object used all over computer science. In order to properly implement Dijkstra's Algorithm, you need to understand the graphs in the abstract and how they are implemented in code as a data structure.  Knowing what a graph and its associated terminology is will make your research much easier to understand!


## Nodes & Edges

Graphs are made up of two core components, nodes and edges. Broadly, they represent things (the nodes) and the connections between them (the edges). Nodes are the building blocks of graphs. Also called vertices, they can represent data such as locations, people in a social media network, or destinations in video games.

Edges are the connections between nodes.  They can represent roads between towns, friendships in a group or connectivity in a network.  One node can be connected to many other nodes with edges.  A node's neighbors are all the nodes that it is connected to by an edge.

Graphs are almost always communicated visually. A graph is displayed with the nodes as circles (often labeled with what they represent) and the edges as lines that connect the nodes together.

![Simple Graph Example](imgs/graphs/graph-intro.png)

Something worth noting is that there are lots of ways to display the same graph. The thing that defines a graph is the connections between nodes, so even though these look different they have the same connections. We say that two different looking graphs that are actually the same are "isomorphic"

![Isomorphic Graph Example](imgs/graphs/graph-into-isomorphic.png)

## Weights & Directions

Edges can also be weighted. Weights can mean anything depending on what the graph represents, the cost to build a connection, the capacity on a network or, for our case, the distance between locations.  Weights are important because in cases like Dijkstra's Algorithm, you want to minimize the total cost that it takes to get from your source to destination node! When drawing a graph, the weight is typically written beside it's edge

If the edges in a graph have weights, the graph is referred to as a **weighted graph**

Edges can either be directed (called a **digraph**) or undirected. For a directed edge, the connection has a direction, if you were modeling one way streets, you would want to use a directed graph to show the directionality. You can have a directed edge going in both directions between two nodes or just one way, and they can also have different weights. Undirected graphs don't have this, an edge simply means that the two nodes are connected no matter the direction. You can model an undirected graph with a directed graph that has two edges between all nodes, one in each direction. Directed edges are typically drawn as arrows.

In the case of modeling pathfinding, directed graphs only allow you to go from node to node in one direction &mdash; you can't go backwards along an edge!  Undirected graphs don't have this restriction, meaning you can travel from node to node in any direction along the edges.


## Adjacency Lists & Matrices

In code, graphs can be represented in different ways, the most common are adjacency lists and adjacency matrices.

We'll see how we can represent the following graph using either an adjacency list or an adjacency matrix.

![Example Graph](imgs/graphs/graph-example.png)

Adjacency lists provide a list of neighbors for each node. So, if we number the nodes, we can store each list in the index of an array. This lets us looks up all the neighbors of a node very quickly. Typically these lists will store the number of the neighboring node and the weight of the edge to get there.

```python
# This is the adjacency list representation for the example graph
# If you were to have edge weights, you would need to store that
# in a tuple with the node number.
adjacency_list = [
    [4,2,3], # The nodes adjacent to 0, order doesn't matter
    [3,4],
    [], # 2 has no neighbors so has an empty list
    [0],
    [],
]
```

Adjacency matrices have an entry for every pair of nodes, then in that section is the weight of the edge. This is good when you need to look up an edge between two known nodes quickly. Each row is the "from" and each column the "to" so the value in row 2 and column 3 is the edge from 2 to 3. The value in the matrix will be the edge weight, or simply 0 or 1 to indicate connected/disconnected.
$$
\begin{bmatrix}
0 & 0 & 1 & 1 & 1\\
0 & 0 & 0 & 1 & 1\\
0 & 0 & 0 & 0 & 0\\
1 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0\\
\end{bmatrix}
$$

One of the biggest decisions you need to make is how you will represent your graph in code. For Dijkstra's I'd recommend an adjacency list, but you still need to decide how you will represent points in code and if you will encapsulate it in a class or something else.

To learn a bit more about the ways that graphs can be represented, you can watch this video!
[Adjacency Lists & Matrices in Python](https://www.youtube.com/watch?v=ukFNELi_U88)
