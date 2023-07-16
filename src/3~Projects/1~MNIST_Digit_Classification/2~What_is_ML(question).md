# Machine Learning
Machine learning has lots of different definitions from lots of differnt people, for us, we'll stick with a very broad definition of machine learning. Machine learning is any process where a computer uses data to come up with rules. This is an incredibaly broad definition but I think it helps to demystify some more advanced machine learning techniques if we think of ML like this. One of the most simple techniques that fits under this definition is finding a line of best fit (called linear regression). All this does is assume that your data follows a line, and then using that data to determine the rule (the slope and y-intercept). Now that you have the rule, you can apply it to something where you don't know the answer.

Say, for example, you had a bunch of data that included house price and square footage from a neighborhood. It might be resonable to expect that this data might follow a linear trend. Once you used to data to find a line of best fit, you could estimate how much a new house is worth given its square footage. This, fundamentally, is all ML is, using data to determine rules that you can apply to something unknown.

But finding the line of best fit is a very narrow skill. Its not going to work to tell if a dog is in a picture or write a poem. That's why we use more advanced machine learning techniques, to find more complicated rules when the data is more complicated. What we want is one system that can learn a wide range of skills so we can reuse the underlying system and use new data to learn new things (this underlying system is called a model, although often model also refers to it after its learned the rules).

What we'll be using as the basis for most of the machine learning we do is neural networks, which you'll learn more about later. For now, all you need to know is that neural newtworks in principle are able to learn just about anything as long as it's the right size (this is called the universal approximation theorem). This means that for pretty much any "rule" that exists, a neural network can learn it.


## Data
### Training, Testing, and Validation
### Normalization
### Bad Data (biased, narrow)
### Missing Data

## Training
When we "train" these models we are essentially using the data we have to teach it the rules, for neural networks, this process is done iteratively in stages called epochs. During each epoch, the model is trained and then tested. Testing helps us to understand how the model will work on data that its never seen before. Before we start training, we split the data into training and testing 
### Hyperparameters

### Transfer learning/Finetuning


## Common Problems

### Overfitting
This is what happens when the rule that the model learns is too specific for the data. For example, the "rule" might just be the data perfectly memorized, this will give a good result (perfect even) on the existing data but is useless to interpret new data. This generally happens when the model is too complicated and there is not enough data.
### Underfitting
