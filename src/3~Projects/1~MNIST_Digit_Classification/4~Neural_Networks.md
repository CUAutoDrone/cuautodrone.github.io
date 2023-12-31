# Neural Networks
Neural networks (NNs) are a layered structure that transforms an input vector into an output vector, the technique is meant to (as the name suggests) mimic the brain.

## Neurons
The most basic unit of a NN is the neuron. A neuron is very simple, it has some inputs, an "activation" (which is just a number) and some outputs.

The inputs determine what the activation will be and the output simply passes this neuron's activation value farther into the network. In the most basic form, the activation is determined by multiplying the value on each input by that input's weight and summing them all together. This is a dot product of the input vector, $X$ , and the neuron's weight vector, $W$ . Additionally, we add a bias term $b$ to change what the "default" state of the neuron is. Essentially, this term biases the neuron to be active or inactive. Finally, we pass this value through what's called an **activation function**, often denoted $\phi(x)$ . We'll learn more about activation functions and their purpose in a bit. All together, the activation $a$ of a neuron is calculated as follows.

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

## Architecture of a Neural Network
Once we have a neuron, we can start to connect them together to make a network. Often, neurons are grouped together into a "layer" which is essentially just a list of neurons, these are not actually connected to each other but it's helpful to think of them as a group (you'll see why in a bit).

These layers are then connected in series to make a network. The first layer is the input layer, it's activation value will be equal to the training data input, for example a picture (in the case of a picture, which is 2d, the pixels will be flattened to be 1d). The last layer will be the output, this is the answer the NN is giving you, which should match the format of your training data answers. All the layers in between the input and output are called "hidden" layers. The basic architecture looks like this:

![The architecture of a basic NN](imgs/nns/NNArchitecture.png)

Each dot represents a neuron and each vertical group is a layer (for example the neurons boxed in red). The blue lines represent the input to the top neuron in the second layer and the green lines are its output, which is fed into the next layer. This neural network is what is called **fully connected** which means that every neuron takes input from all neurons in the previous layer and gives output to all neurons in the next layer.

The reason we think of neurons in layers is because it allows us to compute their values more efficiently using matrix multiplication. If we think of a layer of neurons as an N-dimensional vector, and the next layer as an M-dimensional vector, then we can efficiently get the next layer's activations by multiplying by an $N{\times}M$ matrix. Confusingly, the weight matrix is actually stored as an $M{\times}N$ matrix and transposed before multiplying. Then, we just need an M-dimensional vector for the biases and we can compute the next layer all in parallel. Since matrix multiplication has been highly optimized (especially on the GPU), this drastically speeds up the computations necessary for training and using neural networks. The equation to get the next layer looks like this. Where $a_l$ is the row vector representing the activation of the $l^{th}$ layer.

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

The goal of the neural network is to be able to approximate any function. The function will take in the input layer (a vector often denoted $x$ ) and output the output layer (another vector often denoted $y$ ). If you're familiar with the notation, think of this as a function $f: \Reals^\text{in} \mapsto \Reals^\text{out}$ . We want it so that when we choose the correct values for the weights and biases, we get a function where every input gives us the correct input (for example giving it a picture of a 4, at it classifying it as a 4). This is why we need to represent all of our data as vectors. That way we can think of the "correct" answers as a function that maps inputs (like images) to outputs (like choices for digits).

## Loss functions
The final part of the NN architecture is the loss function. This is the function we use to compare the output our NN gave us (the activation of our output layer) with the correct answer (the vector that is part of our training data). There are lots of different loss functions, some of which are very complicated, but fundamentally, what they are doing is very simple. If we have two vectors, we want to encapsulate how "close" they are. Small values will mean that the two vectors are close (which means our NN is close to predicting the correct answer) and large values mean the opposite. The most basic possible loss function would simply be the average of all the differences between the values. That is if we had an n-dimensional output vector $\hat{y}$ , and the vector we wanted $y$ . Then the loss function would be:

$$
\frac{1}{n}\sum_{i=1}^n |y_i - \hat{y}_i|
$$

This is probably the most intuitive loss function, when the vectors are identical, its value is 0, otherwise it will be positive. This would work fine as a loss function (it's called L1 loss or mean absolute error) but there are a few problems that hurt it in practice. First, the absolute value makes it hard to take the derivative (which is important for training). Additionally, imagine we had a vector that was 1 million elements long. If each of those values was off by 1, then the total loss would be 1. Alternatively, we could have a vector where 1 million - 1 elements are off by .5 and the last is off by half a million. Both of these give the same loss (almost) but the first is probably preferable. It's usually better to have lots of slightly wrong values than to have one value that is way off. We can fix both of these issue by replacing the absolute value with a square.

$$
\frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2
$$

Now, outlier values are punished more and the function has a nice derivative. This loss function is called Mean Square Error (MSE). You can also think of this function as calculating the squared distance between the two vectors.

The last loss function we'll talk about is called the Cross-Entropy Loss function. It is commonly used for classification problems. It requires that the output values sum to 1 which corresponds to the networks "predicted probability" of each class, essentially how confident the network is that the input data is of that class. This is usually achieved with SoftMax, an activation function explained later (technically, PyTorch does this step for you when using Cross Entropy). Additionally, the encoding scheme also needs to be one-hot. The specifics of why the Cross-Entropy function works well don't matter right now, but since this is one the most commonly used loss functions for classification, it's worth knowing about. For $C$ total classes, the function is

$$
-\sum_{c=1}^C y_c \log{\hat{y}_c}
$$

## Training a Neural Network
So how do neural networks learn? If we take it for granted that a neural network can approximate any function, then we still need to find the weights and biases that make the network approximate our function. That's the goal of training. As I talked about in the ML section, you can think of finding the correct weights and biases as an optimization problem. The function that we are minimizing is the loss function over the data in our training set. Remember to note that this is a distinct function from the one our neural network is approximating. The function we are optimizing takes in all our weights and biases, our training data and the model (which includes the activation functions and our loss function) and outputs one number: the loss. This is the value we are trying to minimize.

The technique used to minimize this function is called gradient descent. Essentially, it works by locally determining which way is "down" and moving one step in that direction. Eventually, the process hits a local minimum and learning slows to 0. The way that it determines "down" is by calculating the gradient (which, if you're not familiar, is a higher dimensional version of the derivative). The gradient is a vector that points in the direction of steepest ascent, so we make it negative and move in the other direction. We scale the gradient by the *learning rate* a hyperparameter mentioned in the ML section. This is how learning rate determines the step size of each movement.

The gradient is calculated by an algorithm called backpropagation, but the details don't matter for now. Essentially, for each piece of training data that is passed through the network (called the forward pass), we can calculate how *it* wants the weights to be changed (using backpropagation). Then, if we sum up all of the training examples, we get the exact gradient on the training data for that model. Then we can take a step in that direction and repeat.

But calculating the exact gradient using all the training data, just to take one step is inefficient and slow as we might have thousands of training examples. What we do instead is calculate an approximate gradient that we can get much faster. While we won't take a perfect step, we will be able to take a lot more good steps and ultimately reach the bottom faster. To get this approximate gradient, all we have to do it feed in some of our training data instead of all of it. The number of samples you use each time to calculate the gradient is called the **batch size** and it's one of the hyperparameters that you have to choose before training starts. When we do this, we need to make sure the content of each batch is random. If there was a pattern to each batch, it's unlikely to be a good approximation for the true gradient. If a batch were all 2s for example, the network would just learn to classify everything as a 2 on that batch. We also still want to use all of the training data eventually. The way that this is typically done is to shuffle the training data, then split it into batches. Then, each epoch, we use each batch to take a step.

Calculating the approximate gradient rather than the true gradient actually has some unexpected benefits beyond speed. It helps avoid getting stuck on saddle points and other false minimums by adding noise to the true gradient. Additionally, it allows us to fit our data into the limited memory available in the GPU (or CPU). Datasets are very often larger than the 4-24GB available in consumer graphics cards so we can only load it into memory in batches.

## Activation Functions
The reason that we pass the value through the activation function because it's necessary to allow us to approximate any function. Without the activation function, it can only approximate one kind of function, a line. This is because the neurons (without an activation function) would just be performing a linear transformation (a multiplication and addition) and any combination of linear transformations is still going to be a linear transformation. The way around this is to pass the input to our neuron into a non-linear activation function. The function needs to be non-linear because otherwise we are just doing another linear transformation and we're back to where we started. Other than that, it can technically be any non-linear function, but we want it to be defined for all inputs and there are a few common ones that have some nice properties.

**Sigmoid** is a function that will squish all values to between 0 and 1 smoothly. It roughly approximates the binary nature of a biological neuron, it will either fire, or not fire. This function suffers from something called the "vanishing gradient" problem, since for all values of $x$ , the derivative of sigmoid is less than 1, for deep networks, the gradient can become very small. This is because, by the chain rule, the derivative of each layer is multiplied and multiplying by a value less than 1 shrinks the value. This means that for NNs with many layers the gradient can shrink towards 0 and the network can't learn.

$$\phi(x) = \frac{1}{1+e^{-x}}$$

![Sigmoid Graph](imgs/nns/sigmoid.png)

**Tanh**, the hyperbolic tangent is a function very similar to the sigmoid function, however it squishes values to between -1 and 1 and has a steeper slope. It is used for many of the same reasons as sigmoid but its steeper slope can help it learn faster in some scenarios. However, since the derivative is still $\leq 1$ it still suffers from the vanishing gradient problem.

$$\phi(x) = \tanh(x) = \frac{e^x+e^{-x}}{e^x-e^{-x}}$$

![Hyperbolic Tangent Graph](imgs/nns/tanh.png)

**ReLU**, the Rectified Linear Unit is a very simple function that is very fast to compute (both the value and the derivative). Additionally, it doesn't suffer from the vanishing gradient problem like sigmoid and tanh. This function is commonly used for larger neural networks because of these properties. You might think that the derivative being undefined at 0 would be a problem, but in practice, we can just define it to be either 1 or 0 and it's rare that it even comes up.

$$\phi(x) = \max{(0, x)}$$

![ReLU Graph](imgs/nns/relu.png)

**Leaky ReLU** is a modified version of ReLU that addresses the main weakness of ReLU which is that for many cases, the derivative is 0, as we will see later, this can lead to what is called "dead" neurons that can't learn. The trade off is that this function is more expensive to compute (though not much). Despite the advantages of leaky ReLU, standard ReLU is still commonly used. A value of $\alpha < 1$ is chosen before training.

$$
\phi(x) = \begin{cases}
   x &\text{if } x \geq 0 \\
   \alpha x &\text{if } x < 0
\end{cases}
$$

![Leaky ReLU Graph](imgs/nns/leaky-relu.png)

**SoftMax** is an activation function that is commonly used in classification NNs in the last layer. It takes all of the activation values in the last layer and changed them so that they sum to 1 and retain the same relative order. This means that you can interpret the last layer after SoftMax as a probability distribution where the closer the value is to 1, the more confident the network is that is the answer. Since this graph depends on all the values of the layer, it doesn't really have a graph like the other activation functions.

$$
\phi(x_i) = \frac{e^{x_i}}{\sum_{x_j \in x}e^{x_j}}
$$

## Appendix
The specifics of the matrix math used for neural networks varies widely, this is because you can transpose everything, switch the order of the multiplications and end up with the same stuff. This means that often you will find the data represented as a column vector and the weight matrix un-transposed on the other side like $W \cdot X + b$ , which looks nice and used the more standard column vector (plus column vectors line up nicely with the layers). However, PyTorch used row vectors for its data (since it's naturally a list) and looking at PyTorch documentation is the primary reason you should know the notation. So, it's important to understand this version.

___
You might see the bias folded into the weight matrix by adding an extra constant 1 to the data (and each layer), and an extra column to the weight matrix. This simplifies the computation and code but thinking of the bias as a separate vector that is added later makes it more clear what is actually happening. Really, this is just a computational trick that's worth knowing about. Now the weight+bias matrix will look like

$$
\begin{bmatrix}
   w_{1,1} & \dots & w_{1,n} & b_1\\
   \vdots & \ddots & \vdots & \vdots\\
   w_{m,1} & \dots & w_{m,n} & b_m
\end{bmatrix}
$$

and the layer vector will look like

$$
a_l = \begin{bmatrix}
   a_{l,1} & a_{l,2} & \dots & a_{l,n} & 1
\end{bmatrix}
$$

___
Another optimization is when doing a feed forward and backpropagation step on each piece of training data, we can actually do a lot of that in parallel. To do this, we just replace the row vector we've been using with a matrix where each row is a different training sample. Then we do the same matrix multiplications and calculate the loss function row-wise. 
___
If you want a more intuitive explanation for why neural networks work and the process of gradient descent, I highly recommend, [3Blue1Brown's series on neural networks](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi), which a lot of this section is based on. The [Why layers?](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&t=331s) section of the first video and the [second video](https://www.youtube.com/watch?v=IHZwWFHWa-w) are probably the most valuable, if you have the time. If you're curious about backpropagation, the last two videos are also good.