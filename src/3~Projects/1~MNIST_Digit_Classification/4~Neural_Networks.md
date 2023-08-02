# Neural Networks
Neural networks (NNs) are a layered structure that transforms an input into an output, meant to (as the name suggests) mimic the brain. The most basic unit of a NN is the neuron. A neuron is very simple, it has some inputs, an "activation" and some outputs.

The inputs determine what the activation will be and the output simply passes this neuron's activation value father into the network. In the most basic form. The activation is determined by multiplying the value on each input by the weight of that input and summing them all together. This is a dot product of the input vector, $X$ and the weight vector, $W$ additionally, we add a bias term $b$ to change what the "default" state of the neuron is. Essentially, this term biases the neuron to be active or inactive. All together, the activation $a$ of a neuron is calculated as follows.

$$
X = 
\begin{bmatrix}
   x_1 \\
   \vdots\\
   x_n
\end{bmatrix}, \hspace{0.2cm} W = 
\begin{bmatrix}
   w_1 \\
   \vdots\\
   w_n
\end{bmatrix}
$$
$$
a = x_1 \cdot w_1 + \dots + x_n \cdot w_n + b = W \cdot X + b
$$

Once we have a neuron, we can start to connect them together to make a network. Often, neurons are grouped together into a "layer" which is essentially just a list of neurons, these are not actually connected to each other but it's helpful to think of them as a group (you'll see why in a bit).

These layers can then be fully connected in series to make a network. The first layer is the input layer, it's activation value will be equal to the training data input, for example a picture. The last layer will be the output, this is the answer the NN is giving you, we'll see how to interpret the answer in a bit. All the layers in between the input and output are called "hidden" layers. The basic architecture looks like this:

![The architecture of a basic NN](imgs/nns/NNArchitecture.png)

Each dot represents a neuron and each vertical group is a layer (for example the neurons boxed in red). The blue lines represent the input to the top neuron in the second layer and the green lines are its output, which is fed into the next layer. This neural network is what is called "fully connected" which means that every neuron takes input from all neurons in the previous layer and gives output to all neurons in the next layer.

The reason we think of neurons in layers is because it allows us to compute their values more efficiently using a matrix multiplication. If we think of a layer of neurons as an N-dimensional vector, and the next layer as an M-dimensional vector, then we can efficiently get the next layer's activations by multiplying by an $M\times N$ weight matrix. Then, we just need an M-dimensional vector for the biases and we can compute the next layer all in parallel. Since matrix multiplication has been highly optimized (especially on the GPU), this drastically speeds up the computations necessary for training and using neural networks. The equation to get the next layer looks like this.

$$
W = 
\begin{bmatrix}
   w_{1,1} & \dots & w_{1,n}\\
   \vdots & \ddots & \vdots\\
   w_{m,1} & \dots & w_{m,n}
\end{bmatrix}, \hspace{0.2cm} b = 
\begin{bmatrix}
   b_1 \\
   \vdots\\
   b_m
\end{bmatrix}
$$
$$
A_l = W \cdot A_{l-1} + b
$$

The goal of the neural network is to be able to approximate any function. The function will take in the input layer (a vector) and output the output layer (another vector). We want it so that we can choose the values for the weights and biases so that we get a function where for any input we get the output that corresponds to the correct value. Now you can understand why we need to modify our data so it's all represented in numbers. That way we can think of the "correct" answers as a function that maps inputs (like images) to outputs (like bounding boxes). 

However, as described, the neural network can not approximate any function, in fact, it can only approximate one kind of function, a line. This is because right now, the neurons are just performing a linear transformation (a multiplication and addition) and any number of linear transformations is still going to be a linear transformation. The way around this is to pass the input to our neuron into something non-linear called an **activation function**, often denoted $\phi(x).$ This can technically be any non-linear function, but we want it to be defined for any input and there are a few common ones that have some nice properties.

- Sigmoid, this function will squish all values to between 0 and 1 smoothly. It roughly approximates the binary nature of a biological neuron, it will either fire, or not fire.

$$\phi(x) = \frac{1}{1+e^{-x}}$$
![Sigmoid Graph](imgs/nns/sigmoid.png)
- Tanh, the hyperbolic tangent is a function very similar to the sigmoid function, however it squishes values to between -1 and 1 and has a steeper slope. It is used for many of the same reasons as sigmoid but its steeper slope can help it learn faster in some scenarios.

$$\phi(x) = \frac{e^x+e^{-x}}{e^x-e^{-x}}$$
![Hyperbolic Tangent Graph](imgs/nns/tanh.png)
- ReLU, Rectified Linear Unit is a very simple function that is very fast to compute (both the value and the derivative). This function is commonly used for larger neural networks because of these properties.

$$\phi(x) = \max{(0, x)}$$
![ReLU Graph](imgs/nns/relu.png)
- Leaky ReLU, is a modified version of ReLU that addresses the main weakness of ReLU which is that for many cases, the derivative is 0, as we will see later, this can lead to what is called "dead" neurons that can't learn. The trade off is that this function is more expensive to compute (though not much). Despite the advantages of leaky ReLU, standard ReLU is still commonly used. A value of $\alpha < 1$ is chosen before training.

$$
\phi(x) = \begin{cases}
   x &\text{if } x \geq 0 \\
   \alpha x &\text{if } x < 0
\end{cases}
$$
![Leaky ReLU Graph](imgs/nns/leaky-relu.png)

This updates our neuron activation equation to be
$$
a = \phi(W \cdot X + b)
$$

