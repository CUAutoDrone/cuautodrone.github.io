# Practicing with Libraries

We've already mentioned the terms 'libraries' and 'modules' a few times.  But what are they and how will we use them?

In essence, modules are collections of code and/or functions.  Since we will be using python, our modules will have
the extension '.py'.

Libraries are just collections of related modules that all serve some common purpose, and make it easier for developers
to make use of functions that other developers have created, and might not be offered by the standard libraries that
come with python!

Some of the libraries that we will use most frequently are:
- NumPy
- Pandas
- MatPlotLib

# A Brief Overview of NumPy, Pandas, & Matplotlib

As with all libraries, make sure you are importing them in whichever code files need them!  If you don't know how to
do this, revisit the Code Quality and Documentation Page.

Numpy provides us with data structures such as arrays and matrices, as well as functionality that allows us to manipulate these data structures.
Matplotlib includes lots of functions that make it easy to generate data visualizations and plot images!
Pandas is a great tool for data analysis and manipulation.

Feel free to try out any of the functions on your own in Jupyter Notebook!  Playing around with them is the best way
to learn more about what they can do as well as any limitations.
___

```python
np.array(array_values)
```
- This function turns the python array that is passed in as an argument into an n-dimensional numpy array! Compared to
normal arrays, numpy arrays are much easier to manipulate.  For example, you are able to apply a mathematical function to all values in a numpy array without having to use a for loop, which tradtional python would require.

```python
normal_array = [1, 2, 3, 4];
numpy_array = np.array(normal_array);
array_doubled = numpy_array * 2;
```
___

Numpy offers various ways to view information about and manipulate arrays as well:

```python
np.shape(np_array) #returns the shape of the array in the form (num_rows, num_cols)
np.flatten(np_array) # returns a copy of the array flattened into one dimension
np.transpose(np_array) #returns the transpose of the array
np.concatenate((arr_1, arr_2, ...), axis) #joins two arrays along a certain axis
np.insert(np_array, index, values, axis) #allows insertion of specified values into an array at a certain index
```
___

These are just a tiny sample of numpy's many functions that have to do with arrays.  For more specifics on how to use
these functions and what their arguments mean, the numpy documentation is a great resource that contains examples as well.

___

While numpy arrays are useful and will most likely suffice for most applications, pandas provides another way to structure our data, called dataframes.

```python
numpy_array = np.array([[1,2,3],[4,5,6]])
df = pd.DataFrame(numpy_array, columns = ['A','B','C']) #convert numpy array to pandas dataframe
print(df) #print the dataframe
```
___

With a dataframe, you can access a number of statistics and parts of the data. Try:

```python
df.head(number) #displays the number of specified rows from the top of the dataframe
df.tail(number) #same as above for the bottom of the dataframe
df.columns #accesses info about df columns
df.dtypes #access the datatypes of the columns in the dataframe
df.describe() #access the data's summary statistics
```
___

As always, this is a very small sample of pandas' functionality.  For more information on using these and 
any other functions, visit the pandas documentation!

___

Matplotlib enables us to visualize our data through various graphs, and can even display images in the form of numpy arrays!  For example:

```python
np_img = np.asarray(image here)
img_plt = plt.imshow(np_img)
```
A few of the supported graph types are:
```python
plt.scatter(x, y, ... ) #scatterplot
plt.hist(x, bins, range, weights, ... ) #histogram
plt.boxplot(x, ... ) #boxplot
```

___

Y'all know the drill by now -- visit the matplotlib documentation for more in-depth info.
___

# Useful Tutorials

[Pandas, Numpy, & Matplotlib](https://www.youtube.com/watch?v=NZ0laizc4ug)









