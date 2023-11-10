# Practicing with Libraries

We've already talked a little about libraries, but here we will go over some of the most useful ones and their basic functionalities.

The terms modules and libraries are sometimes used interchangeably, but in Python, they are different concepts. 

Modules are relatively small collections of code, classes and functions. They are files that end with a .py and we will often be creating our own modules to make our code more modular and easier to understand and change.

Libraries are collections of related modules that all serve some common purpose, and make it easier for developers
to make use of functions that other developers have created, and might not be offered by the standard libraries that
come with python!

Here, we will go over 3 libraries, which we use for math (NumPy), image processing (OpenCV2) and graphing (PyPlot). Later, we will explain PyTorch, another library that handles machine learning.

Here is the documentation for these libraries, it's the place to find new functions or double check what one does
- [NumPy](https://numpy.org/doc/stable/reference/index.html)
- [OpenCV2](https://docs.opencv.org/3.4/d6/d00/tutorial_py_root.html)
- [PyPlot](https://matplotlib.org/3.5.3/api/_as_gen/matplotlib.pyplot.html)

# A Brief Overview of NumPy, OpenCV2, & PyPlot

As with all libraries, make sure you are importing them in whichever code files need them!  If you don't know how to
do this, revisit the Code Quality and Documentation Page.

Numpy provides us with data structures such as arrays and matrices, as well as functionality that allows us to manipulate these data structures. 
OpenCV allows us to read, write and manipulate images. PyPlot includes lots of functions that make it easy to generate data visualizations and plot images.

Feel free to try out any of the functions on your own in Jupyter Notebook!  Playing around with them is the best way
to learn more about what they can do as well as any limitations.

## NumPy
### Numpy Arrays
The basic unit of Numpy is the array, think of it like a list of numbers. While Numpy arrays can store nonnumerical values, I've never had to. Numpy can store vectors (as arrays of numbers), matrices (as arrays of arrays) and higher dimensional versions of matrices called tensors (arrays of arrays of...). So far, this is no different from vanilla Python, and in fact, we can create Numpy arrays from lists or lists of lists (etc.) using
```python
np.array(array_values)
```
For example,
```python
vector = np.array([1,2,3])
matrix = np.array([[1,2,3],[4,5,6],[7,8,9]])
tensor = np.array([[[[1, 2],
                     [3, 4]],
                    [[1, 2],
                     [3, 4]]],
                   [[[1, 2],
                     [3, 4]],
                    [[1, 2],
                     [3, 4]]]])
```
$$
\text{vector} = \begin{bmatrix}
   1\\2\\3
\end{bmatrix} \text{  matrix} = 
\begin{bmatrix}
   1&2&3\\4&5&6\\7&8&9\\
\end{bmatrix} \text{  tensor} = 
\begin{bmatrix}
   \begin{bmatrix}
   1&2\\3&4
\end{bmatrix}&\begin{bmatrix}
   1&2\\3&4
\end{bmatrix}\\\\\begin{bmatrix}
   1&2\\3&4
\end{bmatrix}&\begin{bmatrix}
   1&2\\3&4
\end{bmatrix}
\end{bmatrix}
$$
This 4d tensor can be thought of as a 2x2 matrix where each entry is a 2x2 matrix. One thing to note is that Numpy vectors aren't exactly column vectors or row vectors, in other words, they act differently than both nx1 matrices and 1xn matrices.

You can also create Numpy arrays of specific dimensions using
```python
np.zeros(2) # creates a length 2 vector of 0s
np.zeros((3,4)) # creates a 3x4 matrix of 0s
np.zeros((2,3,2)) # creates a 2x3x2 tensor of 0s

np.ones(2) # creates a length 2 vector of 1s
np.ones((3,4)) # creates a 3x4 matrix of 1s
np.ones((2,3,2)) # creates a 2x3x2 tensor of 1s
```
Numpy arrays should not be "ragged" which means that everything should have the same dimension, Numpy will let you make these arrays but it gives you a warning and its generally bad practice, essentially, you want it to be a valid matrix
```python
np.array([[1,2],[1,2,3]]) # bad practice
```
### Dimensions, Shape and Indexing

There are a few properties of Numpy arrays that are important. The first is the datatype, this is what kind of value is stored in the array, the default is either `int64` or `float64` depending on the kind of values you put in the array. You can manually set it using the optional `dtype` parameter to the np.array function. You can find the type of an existing array by doing `.dtype`.
```python
float_arr = np.array([1,2], dtype='float64')
float_arr.dtype # dtype(float64)
```

Another property is the shape of an array, this is the tuple that contains the size of each dimension. So a 2x3 matrix will have a shape of (2,3), and a length 4 vector will have a shape of (4,). This can be accessed using the `.shape` property on an array. Additionally, you can get the size of the array (the total number of elements, essentially just all the values of the shape multiplied together) and the number of dimensions (the length of the shape tuple).

```python
vector = np.array([1,2,3])
matrix = np.array([[1,2,3],[4,5,6]])
tensor = np.array([[[[1, 2],
                     [3, 4]],
                    [[1, 2],
                     [3, 4]]],
                   [[[1, 2],
                     [3, 4]],
                    [[1, 2],
                     [3, 4]]]])

vector.shape # (3,)
vector.ndim # 1
vector.size # 3

matrix.shape # (2,3)
matrix.ndim # 2
matrix.size # 6

tensor.shape # (2,2,2,2)
tensor.ndim # 4
tensor.size # 16

```
Each element of the shape tuple is an "axis". For the matrix, the rows are axis 0 (of size 2) and the columns are axis 1 (of size 3).

Once, we have a Numpy array, we can access its values using indexing. This works essentially like how you would access elements in nested lists, starting from the outermost lists and working inward.
To access the element in the 3rd row and 2nd column of a matrix, you would do
```python
matrix = np.array([[1,2],[3,4],[5,6],[7,8]])
matrix[2,1] # 6
```
You can also use slicing to access parts of an array, just like Python lists.
```python
matrix[2:,1] # [6,8]
matrix[2:,1:] # [[6],[8]]
# note that one of the above returns 
# a 2d vector while the other returns a 2x1 matrix

matrix[:,0] # [1,3,5,7]
```

One way to think of this shape is in the order that you narrow down the array. Essentially, you "pick" from left to right. Say you have an array that represents your image data set. Each of your 10,000 images is 1280 pixels wide and 720 tall, with 3 color channels (RGB). One way to store this is an array with shape (10000, 720, 1080, 3). To pick out the nth image you would use `array[n]` which would give you an array of shape (720, 1080, 3).


### Basic Operations
So what is the advantage of Numpy arrays? Essentially, now that they are in this format, we can do linear algebra much faster and easier. Whenever doing math in Python, we want to avoid loops as much as possible, since they are really slow. If we can vectorize the task and perform it using Numpy functions, it will be sped up by orders of magnitude.

One example is simple scalar multiplication, to scale every element of an array (vector, matrix or tensor) by a value, use the normal multiplication symbol.

```python
numpy_array = np.array([1, 2, 3, 4])
array_doubled =  2 * numpy_array # [2, 4, 6, 8]
```
We can also add a value to every entry in the array using the + operator in the same way

```python
numpy_array = np.array([[1, 2], [3, 4]])
array_plus_1 = numpy_array + 1 # [[2, 3], [4, 5]]
```
We can also do vector and matrix addition, as well as pair-wise multiplication using the same syntax. The + - * and / all work in the same way, doing pair-wise operations.
```python
arr_1 = np.array([[1, 2], [3, 4]])
arr_2 = np.array([[2, 4], [6, 8]])

sum_arr = arr_1 + arr_2 # [[3, 6], [9, 12]])
product_arr = arr_1 * arr_2 # [[2, 8], [18, 24]])
subtract_arr =  arr_2 - arr_1 # [[1, 2], [3, 4]])
div_arr =  arr_2 / arr_1 # [[2, 2], [2, 2]])
```
This works as long as the size matches along each axis. However, if the sizes don't match, Numpy will do some work to try to make them match. This is called broadcasting. 

Basically, if there is an axis that doesn't match and one of the arrays has size 1, Numpy will "copy" along that axis to match the size of the other array. The reason Numpy supports this feature is to save on memory, instead of needing an array with lots of duplicated data, Numpy allows for the array to act like its bigger than it actually is. In fact, scalar multiplication and addition can be though of as broadcasting. Essentially, the value is "copied" to fill a array of the same size, then the two are added element wise. 

Broadcasting can be very unintuitive, especially with high dimensional arrays. Numpy has a good [explanation](https://numpy.org/doc/stable/user/basics.broadcasting.html) in their docs that goes over the concept in more depth. The best way to understand it is to practice. Here are a few examples, try to figure out if they will error or what value they will give
```python
np.array([1,2,3]) + np.array([1,2])
np.array([1,2,3]) + np.array([[1,2],[3,4],[5,6]]) 
np.array([1,2,3]) + np.array([[1,2,3],[4,5,6]]) 
np.ones((2,1,3)) + np.ones(2)
np.ones((2,1,3)) + np.ones((2,3,1))
np.ones((5,1)) + np.ones(5)
```

To do matrix multiplication, we use the @ symbol. This works basically how you'd expect, except that Numpy will also broadcast to try to get the dimensions to work out. Numpy will not broadcast to make the core matrix multiplication to work, only the extra dimensions. Essentially, this of "matrix multiplication" as something like scalar addition, then Numpy will follow the same broadcasting rules as for addition, except the core unit is a matrix (whose dimensions have to work for multiplying), instead of scalars.

In other words, Numpy won't broadcast to get the matrix multiplication to be valid, it will only broadcast to try to match unpaired matrices with another matrix.

Again, this can be very unintuitive and the best way to get a feel for it is to practice.

### Numpy Functions

Numpy offers tons of functions that manipulate arrays, it is always preferable to use Numpy's functions when possible, both for speed and readability. Here are a few that you will often find useful, the rest can be found in the documentation.

**Flatten**

Turns an array into a vector, returning a copy of the array but flattened into one dimension. By default this works in the order that you'd expect, the order when you print a vector, except all in one list.
```python
np_array.flatten()

# Ex
tensor = np.array([[[1,2],[3,4]],[[5,6],[7,8]]])
tensor = tensor.flatten()
# tensor = [1, 2, 3, 4, 5, 6, 7, 8]
```

**Reshape**

Reshapes the array into a new shape, defined by a tuple. The size of the reshaped tensor must be the same as the original array. You can specify at most one "unknown" dimension using -1. This will take whatever value is necessary to make sure new array has the same size.
```python
np.reshape(np_array, new_shape_tuple)

# Ex
tensor = np.array([[[1,2],[3,4]],[[5,6],[7,8]]])
tensor = np.reshape(tensor, (4,2))
# tensor = [[1,2],[3,4],[5,6],[7,8]]

tensor = np.reshape(tensor, (2,-1))
# tensor = [[1,2,3,4],[5,6,7,8]]

tensor = np.reshape(tensor, (2,2,2))
# tensor = [[[1,2],[3,4]],[[5,6],[7,8]]]
```

**Transpose**

Returns the transpose of the array, essentially, this keeps the data the same but changes the order of the axis, by default, transpose reverses the order of the axis but you can specify how to reorder the axis with an optional parameter.
```python
np.transpose(np_array, axis_reorder_tuple)
np_array.T # Equivalent to np.transpose(np_array)

# Ex
tensor = np.array([[[1,2,3,4]],[[5,6,7,8]]])
tensor.shape # 2,1,4
tensor.T # [[[1 5]], [[2, 6]], [[3, 7]], [[4, 8]]]
np.transpose(tensor).shape # 4,1,2

np.transpose(tensor, (0,2,1)) # [[[1],[2],[3],[4]],[[5],[6],[7],[8]]]
np.transpose(tensor, (0,2,1)).shape # 2,4,1
```
This basically changes in which order you narrow down your array, if we go back to the image example (where the array has shape (10000, 720, 1080, 3)), maybe we want to have it so that you pick a data point and then you pick the channel and then height then width (this will end up being good for CNNs since you essentially turn your image into three black and white images). If so you would use
```python
np.transpose(dataset, (0,3,1,2))
```
Since that reorder the axis so that you can easily pick out a specific image and then one of its channels.

**Mean, Sum, Max and Min**
 
These functions behave very similarly, essentially they compute some "summary" value for a group of numbers. Unsurprisingly, that summary value is the average, sum, max or min depending on the function you call. By default, these find their summary value for all the numbers in the array. However, they all take an optional argument for which axis to act along, this gives you finer control over which values to find the summary value for.

When you specify an axis (or multiple axises as a tuple) for any Numpy function to act on, this basically tells Numpy which axis to "collapse". This means that the operation will act along that axis, turn it into one number and remove its dimension. You can also use negative numbers to index the axis in reverse order, ie -1 is the last axis, -2 is second to last etc.

```python
np.mean(np_array, axis=optional_axis)
np.sum(np_array, axis=optional_axis)
np.max(np_array, axis=optional_axis)
np.min(np_array, axis=optional_axis)

# Ex
tensor = np.array([[[1,2],[3,4]],[[5,6],[7,8]]])
np.mean(tensor) # 4.5
np.sum(tensor) # 36
np.max(tensor) # 8
np.min(tensor) # 1

np.sum(tensor, axis=-1) # [[3,7],[11,15]]
np.sum(tensor, axis=(0,2)) # [14, 22]
```
___

These are just a tiny sample of numpy's many functions that have to do with arrays.  For more specifics on how to use
these functions and what their arguments mean, the numpy documentation is a great resource that contains examples as well.

## OpenCV2
OpenCV is an image handling library that has lots of computer vision functionality. Here we will go over the very basics of how to use OpenCV to save and load images, and make some common modifications.

### Saving and Loading Images
To load an image using OpenCV, use the cv2.imread method. This takes the file path (relative to wherever you are running the python script) and returns a Numpy array representing the image. The shape of this array is (height, width, channel). The channels for a color image will be BGR (blue, green, red) rather than the more familiar RGB. All cv2 functions expect color images to be BGR. The imread method also accepts optional flags. The three possible values for this flag are cv2.IMREAD_COLOR (this is the default), cv2.IMREAD_GRAYSCALE (this returns a (height, width) shaped grey-scale image) or cv2.IMREAD_UNCHANGED (this potentially returns the image with alpha values if the image format supports it, which would make the channel dimension sized 4).

To display an image, you can use the cv2.imshow method. This will display the image in a window. It takes in the name of the window and the image as a Numpy array. However, if you use this method, you will have to include the line `cv2.waitKey(0)` afterwards, which keeps the window open until closed. This is kind of annoying, so typically it will be better to display images using PyPlot, which we will talk about later. However, when working only in OpenCV, this method is useful since it expects BGR alongside the other OpenCV methods.

Often you will want to convert the image into the RGB format, basically every other library assumes RGB, to do this, use the cv2.cvtColor method, which takes the image array and the type of conversion as a parameter. These will be of the form cv2.RGB2BGR or cv2.BGR2RGB. [Here](https://docs.opencv.org/3.4/d8/d01/group__imgproc__color__conversions.html) is the full list of color conversion flags from the OpenCV documentation.

Finally, to save images, you can use the cv2.imwrite method, this takes in the the filepath (relative to where the script is executing) and  image as a Numpy array and writes the image. The filepath should contain the filetype like .png or .jpg. The Numpy array is expected to be (height, width, channel) in BGR.

```python
img_array = cv2.imread("path/to/file.png")
img_array.shape # (height, width, 3)

# The image will automatically be converted to grey-scale
# when using this flag, even if the image is color
img_array = cv2.imread("path/to/file.png", cv2.IMREAD_GRAYSCALE)
img_array.shape # (height, width)

cv2.imshow("Our Image", img_array)
cv2.waitKey(0) # This keeps the window open until manually closed

# This would be better for other libraries but 
# will look weird if used with OpenCV methods (try it out!)
RGB_img_array = cv2.cvtColor(img_array, cv2.BGR2RGB)

cv2.imwrite("path/file.jpg", img_array)
```

### Image Transformations
Once we have images to work with, OpenCV has lots of built in methods to do common image transformations. 

**Resize**

Resizes the image to a new width and height taken as a tuple. Takes an optional parameter of what kind of interpolation to do. Documentation [here](https://docs.opencv.org/3.4/da/d54/group__imgproc__transform.html#ga47a974309e9102f5f08231edc7e7529d).
```python
img = cv2.imread("file.jpg")

resize_tuple = (new_width, new_height)
cv2.resize(img, resize_tuple)

# Ex
cv2.resize(img, (200, 200))
```

**Filters**

The filter2D method applies the given kernel to the image using a convolution. This can be used to get a wide variety of effects like edge detection, gaussian blurs, motion blurs, sharpening and more. The method takes in the image, the ddepth (the depth of the output image) which you can pretty much always set to -1 and the kernel.

```python
img = cv2.imread("file.jpg")

# Ex
cv2.filter2D(img, -1, kernel)
```


## PyPlot
PyPlot is a Matplotlib module that supports graphing. 

Matplotlib enables us to visualize our data through various graphs, and can even display images in the form of numpy arrays!  For example:

```python
np_img = np.asarray(image here)
img_plt = plt.imshow(np_img)
```

The most useful graphs are typically line graphs and scatter plots, although occasionally you'll use histograms. You can find a full list of the supported graph types in the PyPlot documentation.
A few of the supported graph types are:
```python
# The x and y values are a list of all of the datapoint's x and y
plt.plot(x, y, ...) # line graph
plt.scatter(x, y, ... ) #scatterplot


plt.hist(x, bins, range, weights, ... ) #histogram
```