# PyTorch

## What Is PyTorch?

PyTorch is an open source machine-learning framework.  It is commonly used for building deep-learning models (models that can recognize complex patterns in contexts such as images, audio, etc. to produce insights).  PyTorch is extremely applicable to scenarios including natural language processing and image recognition -- which is why we will be using it for this project!

## Setting up PyTorch

To install PyTorch, search for and open your Anaconda Navigator, and then open up the Anaconda Command Prompt.

Create a conda virtual environment if you do not already have one.  If you don't remember how to do this, revisit the 'Anaconda' page under getting started!

Once you have your virtual environment, make sure that you are inside it (the environment name will appear in parenthases in your command prompt on the right side).

Then, run the following command:

```python
  conda install pytorch torchvision torchaudio cpuonly -c pytorch
```

Make sure you import pytorch where ever you are using it!

```python
import torch
```

## The Basics : Tensors

Tensors are the basic data structure of PyTorch and they are very similar to Numpy arrays. They have the same format with of axis, shape and size.

Tensors are how we represent our model's inputs, outputs, and parameters. It is important to note that tensors are not mutable, like Numpy arrays are. Another major distinction is that tensors can be transferred to different devices to speed up computation.  This is why tensors are a preferred alternative to Numpy arrays when working with machine learning because they have support for accelerators like GPU & TPUs. 
 
Tensors can be created from data, Numpy arrays, and other tensors.  A few examples are listed below:

```python
#From data
ones = [[1, 1, 1],[1, 1, 1]]
ones_tensor = torch.Tensor(ones)

#From numpy arrays
torch.from_numpy(numpy_array)
```

Tensors also have attributes, or properties about them that we can access/view:

```python
#The shape of the tensor
tensor.shape

#The data type of the tensor
tensor.dtype

#Where the tensor is stored (ex : CPU)
tensor.device
```

Like matrices, tensors also have operations including:

- Indexing
- Slicing
- Creating from data only if certain conditions are met
- Returning a filled tensor of a specified number

Essentially all of the Numpy functions we talked about have an equivalent function in PyTorch. 

Learn more tensor operations [here](https://pytorch.org/docs/stable/torch.html).

## Models
The torch.nn class provides a variety of methods that perform common operations necessary to build neural networks. In order to create a custom model to train, you have to create a class that inherits from `torch.nn.Module`.

PyTorch has a module that allows for the creation of models using various properties and methods.

Neural networks can consist of many different layers, and PyTorch makes initializing a model and then passing an input through a specific set of layers very procedural.

A PyTorch model requires you to implement the following two methods:

- An `__init__` function : Here, we will instantiate the model's layers. It can take whatever parameters you want that you can use to build the model's architecture. Inside the function you should call `super().__init__()`.

- A `forward` function : This functions define how the input (the one parameter) is transformed into the output, whatever is returned from the function.

- Any other useful methods that would help in computation/accessing info about your model. Since your model is a Python class, it can contain whatever other methods you'd like. As long as it has the required functions, you can build and add to it as needed.

Here is an example of a model class

```python
from torch import nn
import torch.nn.functional as F

class CustomModel(nn.Module):

    def __init__(self, optional_args):
        super().__init__() # call this to initialize the parent class

        # Then define your layers

        self.convolutional_layer = nn.Conv2d(in_channels, out_channels, kernel_size)
        self.linear_layer = nn.Linear(in_features, out_features)

    def forward(self, x):
        # The torch.nn.functional module offers a ton of different functions you can use in your network
        # Some commonly used ones are

        # Activation functions
        F.relu(x)
        F.softmax(x)
        F.sigmoid(x)

        # Pooling
        F.max_pool2d(x)
        F.avg_pool2d(x)

        return x

```

Once you have built a model, you can then make an instance of it (just like a python class) and then apply it to your input!

Using the example above:

```python
net = CustomModel()

input = torch.rand(1, 1, 32, 32)   

output = net(input) # we don't call forward() directly
```

## Datasets and Dataloaders

Datasets are a class that allows PyTorch to get one particular instance of data. Often you define this class yourself although PyTorch does include some built in. In order to define a Dataset, you need to inherit from the `torch.utils.data.Dataset` class, you must implement three methods

- An `__init__` function that takes any parameters and initializes the class. Often you will want to pass in the file path, a list of images or a Numpy array that contains your data.
- A `__len__` function that returns the total number of datapoints
- A `__getitem__` function that takes an index and returns the data. Typically, the data will be a tuple where the first element is the input to the network and the second element is the expected output of the network.


PyTorch has a few built in dataset, here is one for the MNIST digit classification

```python
train_dataset = torchvision.datasets.MNIST(
    "/files/",
    train=True,
    download=True,
    transform=torchvision.transforms.ToTensor(),
    target_transform=torchvision.transforms.Compose(
        [lambda x: torch.LongTensor([x]), lambda x: F.one_hot(x, 10)]
    ),
)
```
This dataset looks complicated because it applies a series of transformations to the input and output data. The `transform` parameter is what happens to the images (they get turned into a tensor). The `target_transform` is called on the output, they are originally the number from 0-9 that represent the digit but we change them to be a one-hot encoded tensor.

To see one of the data, you can index into it like this
```python
train_dataset[0]
```
This will be the first example, it's a tuple where the first element is a 1x28x28 tensor that represents the image and then a 10 dimentional vector with a 1 hot encoded vector. Try to display the image and print out the answer vector and make sure they make sense.


The dataloader is (usually) much more simple. Most of the time you will only need to define the dataset, the batch size and whether you want to shuffle your data (typically yes for training and doesn't matter for validation). 
```python
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=training_set_size, shuffle=True)
```

You can create a test loader using the same technique but with a different dataset.

## Optimizers

PyTorch optimizers are pretty simple to use (even though they're quite complicated under the hood). Basically all you have to do is choose one of the optimizers (Usually either SGD or Adam), tell it what parameters on the model you want to optimizer and then give it the hyperparamters and you're done.


```python
optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
optimizer = torch.optim.SGD(model.parameters(), lr=0.1, momentum=0.9)
```

## The training evaluation loop
Once you have a dataloader, you can train your model. This loop will be basically the same no matter what your model is. Essentially, you need to define an Optimizer (which PyTorch takes care of) and initialize your model. Then you follow these steps to train one epoch of your model

1. Zero out your gradient from the previous step
2. Feed your batch through the model
3. Compare your models output to the expected output using your loss function (typically called criterion)
4. Perform backpropagation to determine the gradient
5. Take a step in the direction of your gradient
6. Record your loss

These steps translate almost 1 to 1 into code


```python
for input, labels in dataloader:
        input, labels = input.to(DEVICE), labels.to(DEVICE) # First, make sure your data is cast to your device, this really only matters for training on the GPU, but its good practice
        optimizer.zero_grad() # 1
        output = model(input) # 2
        loss = criterion(output, labels) # 3
        loss.backward() # 4
        optimizer.step() # 5
        losses.append(loss.item()) # 6, you call item on your loss to ignore all the extra data that comes along with it and just get the value
```

This loop is pretty much all you need to train your model for one epoch. The whole function to train for one epoch is not much more complicated.

```python
def train_epoch(model, optimizer, dataloader):
    model.train() # You have to tell your model to go into "train" mode
    losses = []
    for input, labels in dataloader:
        input, labels = input.to(DEVICE), labels.to(DEVICE)
        optimizer.zero_grad()
        output = model(input)
        loss = criterion(output, labels)
        losses.append(loss.item())
        loss.backward()
        optimizer.step()
    return losses # Typically you want to keep a list of all the batch losses
```

The validation loop is very similar except that you don't want to optimize your model or calculate the gradient.

```python
def test_epoch(model, dataloader):
    model.eval()
    losses = []
    
    with torch.no_grad():
        for input, labels in dataloader:
            input, labels = input.to(DEVICE), labels.to(DEVICE)
            output = model(input)
            loss = criterion(output, labels)
            losses.append(loss.item())
            
    return losses

```

To fully train the model, you just have to call the train_epoch function for as many epochs you have and then the model is trained! Typically, after each epoch you also want to see what the validation error is so that you can see how your model does on unknown data.


## Creating a Neural Network
Using the built in dataset for MNIST digits, create a dataloader for the training and testing. Then, create a simple model that flattens the input image into a 728 feature vector and then passes it through some linear layers with the activation function of your choice, make srue the output is 10 dimensional. 