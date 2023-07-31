# Neural Networks
Neural networks (NNs) are a layered structure that transforms an input into an output, meant to (as the name suggests) mimic the brain. The most basic unit of a NN is the neuron. A neuron is very simple, it has some inputs, an "activation" and some outputs.

The inputs determine what the activation will be and the output simply passes this neuron's activation value father into the network. In the most basic form. The activation is determined by multiplying the value on each input by the weight of that input and summing them all together. This is a dot product of the input vector, $X$ and the weight vector, $W$

$$
X = 
\begin{bmatrix}
   x_1 \\
   x_2
\end{bmatrix}, \hspace{0.2cm} W = 
\begin{bmatrix}
   w_1 \\
   w_2
\end{bmatrix}
$$
$$
a = x_1 \cdot w_1 + x_2 \cdot w_2 = W \cdot X
$$