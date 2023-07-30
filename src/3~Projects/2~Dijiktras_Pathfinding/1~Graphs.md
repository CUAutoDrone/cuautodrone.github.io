# Graphs

In order to properly implement Djikstra's Algorithm, you need to understand the graph data structure.  Knowing what a graph and its associated terminology is will make your research much easier to understand!

## Nodes

Nodes are the building blocks of graphs. Also called vertices, they can represent data such as locations, people in a social media network, or destinations in video games.

## Edges

Edges are the connections between nodes.  Think of them as roads between towns and cities.  One node can be connected to many other nodes with edges.  

Edges can also be weighted -- think of weights as numbers that represent the cost required to travel along that edge.  Weights are important because in cases like Djikstra's Algorithm, you want to minimize the total cost that it takes to get from your source to destination node!

If the edges in a graph have weights, the graph is referred to as a **weighted graph**

## Connecting the Two

When you have a set of nodes and the edges between them, you have a graph!  In code, graphs can be represented in different ways -- most common are adjacency lists and adjacency matrices.

## Adjacency Lists & Matrices
To learn a bit more about the ways that graphs can be represented, you can watch this video!
[Adjacency Lists & Matrices in Python](https://www.youtube.com/watch?v=ukFNELi_U88)

## Directed vs Undirected Graphs

Directed graphs only allow you to go from node to node in one direction -- you can't go backwards along an edge!  Undirected graphs don't have this restriction, meaning you can travel from node to node in any direction along the edges.
