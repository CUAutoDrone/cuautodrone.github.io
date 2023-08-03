# Neural Networks
Neural networks (NNs) are a layered structure that transforms an input into an output, meant to mimic the brain (as the name suggests). The most basic unit of an NN is the neuron. A neuron is very simple, it has some inputs, an "activation" and some outputs.

The inputs determine what the activation will be and the output simply passes this neuron's activation value farther into the network. In the most basic form, the activation is determined by multiplying the value on each input by that input's weight and summing them all together. This is a dot product of the input vector, $X$ , and the weight vector, $W$ . Additionally, we add a bias term $b$ to change what the "default" state of the neuron is. Essentially, this term biases the neuron to be active or inactive. Finally, we pass this value through whats called an **activation function**, often denoted $\phi(x)$ . We'll learn more about activation functions and their purpose in a bit. All together, the activation $a$ of a neuron is calculated as follows.

$$
X = 
\begin{bmatrix}
   x_1 & \dots & x_n
\end{bmatrix}, \hspace{0.2cm} W = 
\begin{bmatrix}
   w_1 & \dots & w_n
\end{bmatrix}
$$
$$
a = \phi(x_1 \cdot w_1 + \dots + x_n \cdot w_n + b) = \phi(X \cdot W + b)
$$

Once we have a neuron, we can start to connect them together to make a network. Often, neurons are grouped together into a "layer" which is essentially just a list of neurons, these are not actually connected to each other but it's helpful to think of them as a group (you'll see why in a bit).

These layers are then connected in series to make a network. The first layer is the input layer, it's activation value will be equal to the training data input, for example a picture (in the case of a picture, which is 2d, the pixels will be flattened to be 1d). The last layer will be the output, this is the answer the NN is giving you, which should match the format of your training data answers. All the layers in between the input and output are called "hidden" layers. The basic architecture looks like this:

![The architecture of a basic NN](imgs/nns/NNArchitecture.png)

Each dot represents a neuron and each vertical group is a layer (for example the neurons boxed in red). The blue lines represent the input to the top neuron in the second layer and the green lines are its output, which is fed into the next layer. This neural network is what is called "fully connected" which means that every neuron takes input from all neurons in the previous layer and gives output to all neurons in the next layer.

The reason we think of neurons in layers is because it allows us to compute their values more efficiently using a matrix multiplication. If we think of a layer of neurons as an N-dimensional vector, and the next layer as an M-dimensional vector, then we can efficiently get the next layer's activations by multiplying by an $M{\times}N$ weight matrix. Then, we just need an M-dimensional vector for the biases and we can compute the next layer all in parallel. Since matrix multiplication has been highly optimized (especially on the GPU), this drastically speeds up the computations necessary for training and using neural networks. The equation to get the next layer looks like this. Where $a_l$ is the row vector representing the activation of the $l^{th}$ layer.

$$
W =
\begin{bmatrix}
   w_{1,1} & \dots & w_{1,n}\\
   \vdots & \ddots & \vdots\\
   w_{m,1} & \dots & w_{m,n}
\end{bmatrix}, \hspace{0.2cm} b = 
\begin{bmatrix}
   b_1 & \dots & b_m
\end{bmatrix}
$$
$$
a_l = \phi(a_{l-1} \cdot W^\intercal + b)
$$

The weight matrix now records all of the weights between two layer, where $w_{i,j}$ represents the weight from the $j^{th}$ neuron in layer $l-1$ to the $i^{th}$ neuron in layer $l$ . This feels backwards but it turns out to be useful in computation, and at this point it's a convention.

Side note, when we run a vector through the activation function, that's actually just shorthand for applying the function to each component of the vector.
$$
f \big( \begin{bmatrix}
   v_1 & v_2 & \dots & v_n
\end{bmatrix}\big ) = \begin{bmatrix}
   f(v_1) & f(v_2) & \dots & f(v_n)
\end{bmatrix}
$$

The goal of the neural network is to be able to approximate any function. The function will take in the input layer (a vector) and output the output layer (another vector). If you're familiar with the notation, this of this as a function $f: \Reals^\text{in} \mapsto \Reals^\text{out}$ . We want it so that when we choose the correct values for the weights and biases, we get a function where every input gives us the correct input (for example giving it a picture of a 4, at it classifying it as a 4). Now you can understand why we need to modify our data so it's all represented in numbers. That way we can think of the "correct" answers as a function that maps inputs (like images) to outputs (like choices for digits). 

The reason that we pass the value throw the activation function because it's necessary to allow us to approximate any function. With out the activation function, it can only approximate one kind of function, a line. This is because, the neurons would just performing a linear transformation (a multiplication and addition) and any combination of linear transformations is still going to be a linear transformation. The way around this is to pass the input to our neuron into a non-linear activation function. The function needs to be non-linear because otherwise we are just doing another linear transformation and we're back to where we started. Other than that, it can technically be any non-linear function, but we want it to be defined for any input and there are a few common ones that have some nice properties.

- Sigmoid, this function will squish all values to between 0 and 1 smoothly. It roughly approximates the binary nature of a biological neuron, it will either fire, or not fire.

$$\phi(x) = \frac{1}{1+e^{-x}}$$
![Sigmoid Graph](imgs/nns/sigmoid.png)
- Tanh, the hyperbolic tangent is a function very similar to the sigmoid function, however it squishes values to between -1 and 1 and has a steeper slope. It is used for many of the same reasons as sigmoid but its steeper slope can help it learn faster in some scenarios.

$$\phi(x) = \frac{e^x+e^{-x}}{e^x-e^{-x}}$$
![Hyperbolic Tangent Graph](imgs/nns/tanh.png)
- ReLU, Rectified Linear Unit is a very simple function that is very fast to compute (both the value and the derivative). Additionally, it doesn't suffer from the vanishing gradient problem like sigmoid and tanh. This function is commonly used for larger neural networks because of these properties.

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

So how do neural networks learn? If we take it for granted that a neural network can approximate any function, and that classifying images (or really any other task) boils down to function approximation, then we still need to find the weights and biases that make the network approximate our function. That's what training does. You can think of 

Finally, there a few nonessential tidbits that are worth mentioning.

First, the specifics of the matrix math used for neural networks varies widely, this is because you can transpose everything, switch the order of the multiplications and end up with the same stuff. This means that often you will find the data represented as a column vector and the weight matrix un-transposed on the other side like $W \cdot X + b$ , which looks nice and used the more standard column vector (plus column vectors line up nicely with the layers). However, PyTorch used row vectors for its data (since it's naturally a list) and looking at PyTorch documentation is the primary reason you should know the notation. So, it's important to understand this version.

Secondly, you might see the bias folded into the weight matrix by adding a 1 to the data (and each layer), and an extra column to the weight matrix. This simplifies the computation and code but thinking of the bias as a separate vector that is added later makes it more clear what is actually happening. Really, this is just a computational trick that's worth knowing about.

Finally, finally, if you want a more intuitive explanation for why neural networks work and the process of gradient descent, I highly recommend, [3Blue1Brown's series on neural networks](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi), which a lot of this section is based on. The [Why layers?](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&t=331s) section of the first video and the second video are probably the most valuable, if you have the time.