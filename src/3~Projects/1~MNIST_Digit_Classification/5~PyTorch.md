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

class LeNet(nn.Module):

    def __init__(self, optional_args):
        super().__init__() # call this to initialize the parent class

        # 
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.conv2 = nn.Conv2d(6, 16, 5)
        # an affine operation: y = Wx + b
        self.fc1 = nn.Linear(16 * 5 * 5, 120)  # 5*5 from image dimension
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        # Max pooling over a (2, 2) window
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        # If the size is a square you can only specify a single number
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        x = x.view(-1, self.num_flat_features(x))
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def num_flat_features(self, x):
        size = x.size()[1:]  # all dimensions except the batch dimension
        num_features = 1
        for s in size:
            num_features *= s
        return num_features

```
[code source](https://pytorch.org/tutorials/beginner/introyt/introyt1_tutorial.html#pytorch-models)

Once you have built a model, you can then make an instance of it (just like a python class) and then apply it to your input!

Using the example above:

```python
net = LeNet()

input = torch.rand(1, 1, 32, 32)   

output = net(input)                # we don't call forward() directly
```

## Data Loading & Train/Test Splits

When training a machine learning model, it is important to keep some of the data aside for training the model, and the rest for testing it.  PyTorch provides an easy way to accomplish this through data loaders.  Using DataLoader, we can pull a certain amount of data and define whether we are going to use it for training or testing.  We can even transform the data at the same time, using methods such as cropping or normalization.

An example of loading data using DataLoader is shown below:

```python
train_loader = torch.utils.data.DataLoader(
  torchvision.datasets.MNIST('/files/', train=True, download=True,
                             transform=torchvision.transforms.Compose([
                               torchvision.transforms.ToTensor(),
                               torchvision.transforms.Normalize(
                                 (mean,), (st_dev,))
                             ])), batch_size=training_set_size, shuffle=True)
```
[code source](https://pytorch.org/tutorials/beginner/introyt/introyt1_tutorial.html#pytorch-models)

In this example, we are loading data from a file path, as a training set.  Then, we are transforming the data to a tensor that is then being normalized using a mean and standard deviation value.  The size of the set is being set by training_set_size, and the data is being shuffled while being loaded.

A testing set can be created in the same way.

The ways data can be loaded and transformed are numerous, and you can learn more [here](https://pytorch.org/vision/stable/transforms.html) if you wish.