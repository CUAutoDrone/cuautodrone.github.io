# Graphs
Graphs are a mathematical object used all over computer science. In order to properly implement Dijkstra's Algorithm, you need to understand the graphs in the abstract and how they are implemented in code as a data structure.  Knowing what a graph and its associated terminology is will make your research much easier to understand!

## Nodes and Edges

Graphs are made up of two core components, nodes and edges. Broadly, the represent things and the connections between them. Nodes are the building blocks of graphs. Also called vertices, they can represent data such as locations, people in a social media network, or destinations in video games.

Edges are the connections between nodes.  Think of them as roads between towns and cities.  One node can be connected to many other nodes with edges.  A node's neighbors are all the nodes that it is connected to by an edge.


## Weights and Directions
Edges can also be weighted. Weights can mean anything depending on what the graph is used for, cost to build a connection, capacity on a network or, for our case, distance.  Weights are important because in cases like Dijkstra's Algorithm, you want to minimize the total cost that it takes to get from your source to destination node!

If the edges in a graph have weights, the graph is referred to as a **weighted graph**

Edges can either be directed or undirected. For a directed edge, the connection has a direction, if you were modeling one way streets, you would want to use a directed graph to show the directionality. You can have a directed edge going in both directions between two nodes or just one way, and they can also have different weights. Undirected graphs don't have this, an edge simply means that the two nodes are connected no matter the direction. You can model an undirected graph with a directed graph that has two edges between all nodes, one in each direction.

In the case of modeling distance, directed graphs only allow you to go from node to node in one direction &mdash; you can't go backwards along an edge!  Undirected graphs don't have this restriction, meaning you can travel from node to node in any direction along the edges.

## Adjacency Lists & Matrices

In code, graphs can be represented in different ways, the most common are adjacency lists and adjacency matrices.
To learn a bit more about the ways that graphs can be represented, you can watch this video!
[Adjacency Lists & Matrices in Python](https://www.youtube.com/watch?v=ukFNELi_U88)
