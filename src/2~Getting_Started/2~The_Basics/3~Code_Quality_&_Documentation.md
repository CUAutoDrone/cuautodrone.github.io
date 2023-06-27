# Code Quality and Documentation
In general there are no strict rules when it comes to code quality and documentation. There are definetly conflicting opinions, so this doc will lay out some general guidelines and some conventions that we would like you to adhere to. Some of this is adapted from Python's [PEP8](https://peps.python.org/pep-0008/) style guide.

## Variable Naming
There are a few different common naming styles, here are some of them
- *camelCase* is where all but the first word is capatalized. Usually used for typical variables, i.e. for an int, float, string, list, etc.
- *snake_case* is where all letters are lowercase, seperated by underscores. Usually used for functions or variables.
- *CapCase* is where every word is capatalized. Usually used for classes.
- *ALL_UPPERCASE* is where all letters are capatalized, seperated by underscores. Usually used for constants that will not change value.

The above uses are just guidelines, consistency is more important that adhering to strict rules. If you are working on existing code, use whatever rules are already there (or maybe edit it to match).

In almost all cases, don't use single letters for variable names. I promise you that the extra time it takes to type out a real name will be less that the time it will take you (or someone else) to figure out what the hell 's' means in 3 months when looking at some old code. There are a few exceptions to this rule, when in a loop and counting iterations, its perfectly ok (unless the iterations mean something specific) to use 'i', 'j', and 'k' (in that order). Also, when referencing coordinates its fine to use 'x', 'y' and 'z'. Finally, for a purely mathematical function (i.e. sqrt, gcd) it might make sense to have single letter parameters like 'x' or 'n' to a function (although you probably want to use NumPy anyways).

Don't worry too much about long variable names, if you need a few words to describe the variable well, thats fine! Typing and reading are both faster than trying to parse confusing names. Also,  keep abeviations limited to common ones like img for image or lst for list.

## Code Formatting
We would like you to use a formatter. This will change the whitespace (and sometimes [other stuff](https://peps.python.org/pep-0008/)) in your code according to some consistent rules. It doesn't always make the code look better but it helps make code consistent to read even when written by multiple people.

To set this up in VS Code, go to settings (Ctrl/Cmd+,) and search "format on save" and check the box. When you first save, there is going to be a popup in the bottom right corner that will ask you to install a formatter. Just click the blue option. Now, your code will be formatted whenever it is saved.

## Documentation and Function Specification
To document a function, you need to write a specification. This is a description of what the function does that should fully specify the behaviour of the function for any input. 
- The first part of a specification is a short 1-2 sentence description of the functions purpose. This should exist for every function.
- Then you want to describe what it takes as parameters, this should include a description for each paramter, any requirements that parameter must fulfill, and all optional parameters and their default values.
- Then describe what it returns/does. This means you need to fully explain
    - Any side effects.
    - The return value.
    - Any raised exceptions (and when they happen).
- Finally, examples often help to clarify exactly what the function does and the format of the return value.

The detail of the specification is context dependent, for a simple function or one that is easy to describe (i.e. sort) it may be resonable to skip or limit the detail of some of these parts.

Heres an example with the maximum amount of detail you might need.

```python
def format_time(time):
    """
    Formats the given time (in units of seconds) into a string of the form hours:minutes:seconds

    @param time: the time to be formatted in units of seconds
    requires: time is a non-negative number

    @returns: a string of equivalent time in hours, minutes and seconds separated by colons (:)
    The minutes and seconds will be in the range 0-59 and seconds will have two significant digits.
    If hours is 0 it will be omitted. If the hours and minutes are 0 then they will be omitted.
    Minutes and seconds have leading 0s to two digits when after a colon.

    Ex.
    format_time(8.2) -> 8.20
    format_time(100) -> 1:40.00
    format_time(81423.5174) -> 22:37:03.52
    """
    ...
```
For many functions, something like the first sentence would suffice. If the function is very specific, some examples showing different behaviours really helps clarify. Writing "Minutes and seconds have leading 0s to two digits when after a colon." is fine but the actual examples make it much more clear.

## Code Comments
Comments should be brief. Don't write comments for every little snippet of code, save them for things that are non-obvious or unusual. Comments can also be valuable for explaining in more detail what a constant or variable represents. Another good use of comments is to explain *why* code is what it is. Here is an example of a bad comment. 
```python
# doubles width
width = 2 * width
```
It is unnessesary because the code says what the comment does just as clearly. A more useful comment would explain why width needs to be doubled, for example
```python
# compensate for screen size
width = 2 * width
```
although it might be even better to have the code more explicitly describe what its doing like this
```python
screen_size_scale_factor = 2
width *= screen_size_scale_factor
```
Now the comment is unnessesary. Plus, if you ever have to change the code, you won't have to remember to change all the comments too. If possible, write the code to make commenting redundant.

Another reason to use comments is if code is doing something complex. For example, if you are using an algorithm its worth mentioning what it is.

```python
def sort(lst):
    """
    Sorts the list in ascending order
    """
    # Uses Quicksort to sort the list
    ...
```
Finally, if you have a strange way of storing information in a class or are doing something unusual for performance reasons, thats worth commenting. 

## Libraries and Modules
We don't always have to write our own code. Using Python often libraries leads to more readable and faster code (NumPy is largely written in C and is faster than anything you could write in Python). However, we want to limit the libraries that we use to ones that are common, well known and well maintained. So even if you find a module that does what you need, we probably still want to implement it ourselves. This way we limit our dependencies, have control over our implementaion and learn the code in-depth.

These are some of the libraries we will be using a lot and standard import statements, use these for consistency.
```python
import numpy as np # NumPy
import matplotlib.pyplot as plt # Pyplot
import torch # PyTorch
import Image # Python Image Library (PIL)
import cv2 # OpenCV2
```

Don't use
```python
from module import *
```
which import everything from a module. This will crowd your namespace and can make the code harder to read, as its ambiguous where a function/variable/class came from. Instead import the specific things you need using.
```python
from module import my_func, myVar, MyClass
```
or
```python
import module

module.my_func()
module.myVar
module.MyClass()
``` 
  \
  \
When writing large pieces of code, it can be useful to create your own modules or just access things from different files. This way you can split functionality between files. For example, when training a computer vision model, a file structure like the following might be useful.

```
├── data
│   ├── train
│   │   ├── img1
│   │   ├── img2
│   │   ├── ...
│   │   ├── img5000
│   ├── validate
│   │   ├── img1
│   │   ├── img2
│   │   ├── ...
│   │   ├── img500
├── src
│   ├── config.py
│   ├── model.py
│   ├── preprocess.py
│   ├── dataloader.py
│   ├── engine.py
│   ├── inference.py
├── out
│   ├── models
│   │   ├── best_model.pth
│   │   ├── current_model.pth
│   ├── graphs
│   │   ├── training_loss.png
│   │   ├── validation_loss.png

```
This way, the scripts, data and models are all kept seperate. This keeps things organized and is useful for keeping a git repository up to date. You probably don't want the data to be stored in the repository but the source code should be.

Within the src directory, you can access classes, variables and functions from other files by using import statements. Say the *config.py* file has some variables that need to be accessed elsewhere, say for example the size of the resized images.

In config.py
```python
X_RESIZE = 512
Y_RESIZE = 256
```

In another .py file in src
```python
from config import X_RESIZE, Y_RESIZE 
# When importing, exclude the .py and then import what you need.
# To import multiple things, use a comma after each name.

# Now X_RESIZE and Y_RESIZE are just like any other variable.
```

When you do this, its good practice to add a check to determine if the file is being imported or run directly. 
```python
# Note both __name__ and '__main__' have double underscores before and after them
if __name__ == '__main__': 
    # this code is not run when imported
```
When the file is run directly (either in the terminal or by clicking the play button in VS Code) this if statement will be true, but when importing it will be false. This way you can have your variable, class and function definitions outside the if statement (accessible by import) but code you only want to run sometimes (for example tests) inside.


## Using Language Features
If the language has a way to do something built-in, probably do it that way. This leads to more standard, more readable code.

One simple example can be found in Python's loop, where there are a few slightly different syntaxes for slightly different use cases.

A standard Python loop counting from 0 to 9
```python
for i in range(10):
    print(i)
```

If you just need to loop through the elements in the list, use this syntax
```python
my_list = ['a', 'b', 'c', 'd']
for item in my_list:
    print(item)
```
If you need both the elements and the index, use enumerate
```python
my_list = ["New York", "Los Angeles", "Chicago"]
for i, city in enumerate(my_list):
    print(f"At index {i} is {city}")
```
Some other notable examples are [zip](https://docs.python.org/3/library/functions.html#zip) (and other [built-in functions](https://docs.python.org/3/library/functions.html)), [f-strings](https://docs.python.org/3/reference/lexical_analysis.html#f-strings), [list comprehension](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions), [slicing](https://www.w3schools.com/python/python_strings_slicing.asp), and [unpacking](https://medium.com/geekculture/python-variable-unpacking-a5d0ed284011#:~:text=In%20Python%2C%20%E2%80%9CVariable%20Unpacking%E2%80%9D,the%20number%20of%20the%20variables.).

