# Machine Learning
Machine learning has lots of different definitions from lots of different people, for us, we'll stick with a very broad definition of machine learning. Machine learning is any process where a computer uses data to come up with rules. This is an incredibly broad definition, but I think it helps to demystify some more advanced machine learning techniques if we think of ML like this. One of the most simple techniques that fits this definition is finding a line of best fit (called linear regression). All this does is determine the slope and y-intercept (which in this case is the "rule") from the data. This assumes that your data follows a line. Now that you have the rule, you can apply it to something where you don't know the answer.

Say, for example, you had a bunch of data that included house prices and square footage from a neighborhood. It might be reasonable to expect that this data follows a linear trend. Once you used to data to find a line of best fit, you could estimate how much a new house is worth given its square footage. This, fundamentally, is all ML is, using data to determine rules that you can apply to something unknown.

## More Advanced Techniques
Finding the line of best fit is a very narrow skill. It's not going to work to tell if a dog is in a picture or write a poem. That's why we use more advanced machine learning techniques, to find more complicated rules when the data is more complicated. What we want is one system that can learn a wide range of skills so we can reuse the underlying system and use new data to learn new things (this underlying system is called a model, although often a model also refers to the program after it has learned the rules).

What we'll be using as the basis for most of the machine learning we do is neural networks, which you'll learn more about later. For now, all you need to know is that neural networks in principle are able to learn just about anything as long as it's big enough (this is called the universal approximation theorem). This means that for pretty much any "rule" that exists, a neural network can learn it. The way that a neural network encodes its rules is through model weights, essentially, just a bunch of numbers. In this way, you can think of training a neural network as an optimization problem, what model weights give me the best answer? Solving this exactly (like you might in calculus using where the derivative = 0) is impractical, so we use optimization techniques that find approximations to the optimal result. One important thing to note is that "the best answer" in our optimization needs to be rigorously defined. Basically, we need a way to tell the computer how well it's doing. This is called a loss function, think of it like a grade on a test. Basically, this loss function takes in the model and some data and returns one number, how "bad" the model is on that data, lower means less bad. Now we can optimize the loss function and everything becomes a giant math problem (how this is actually solved will be explained later). There are a few common examples of loss functions that we'll go over when we cover neural networks, but just know, even if you see some complicated loss function that you don't understand, all it's doing is quantifying how bad the model is on the data.

## Training
When we "train" these models we are essentially using the data we have to teach it the rules, for neural networks, this process is done iteratively in stages called epochs. During each epoch, the model is trained and then tested. Testing helps us to understand how the model will work on data that it has never seen before.

### Training, Testing, and Validation
Before we start training, we split our data into a few sections, training, testing, and (sometimes) validation. Training data is simple, this is the data we use to train the model, whenever we give this data to the model, it learns from it and updates it's weights to do better on that data. Testing and validation data are different. We don't want the model to use that data to learn. This way, we can use that data to test how good our model is. The testing set is used to answer the question: on new data (like in the real world) how good is our model? The reason that we don't want to let the model learn from the test data is the same reason your professors don't show you the final before you take it, so it's impossible to memorize. While testing and validation are terms often used interchangeably, we will make a distinction. In many machine learning techniques, there are things other than the model weights that can affect the performance of the model, these are the hyperparameters. We can use the validation set to test out lots of different hyperparameters and pick which one is the best. We still want to keep the testing data fully separate though, it's more subtle, but using the testing data to choose hyperparameters and then testing with the same data doesn't give an accurate representation of how the model will do in the real world, which is what we are trying to use the testing data to find out. We want to make sure the testing data will have no effect on the model at all, just like real data.

Luckily, the MNIST dataset is already split into 60,000 training samples and 10,000 testing samples. If you want, you can take some of the training samples and use them for validation (don't use the test ones, we want to make sure those are totally separate) but that's up to you.

### Hyperparameters
Hyperparameters are the values that we have to set ourselves, choosing the correct hyperparameters is a skill and can have a significant effect on the quality of the trained model. Here's a list of hyperparameters that you'll find in just about every neural network based model
- *Learning rate* is essentially the size of the step that the model takes each time it goes through an epoch. We want this value to be as high as possible since it means faster training. But there's a tradeoff, if the learning rate is too big then the model can't get to the local minimum and won't be able to learn well. Imagine how hard it would be to walk across your room if you could only take steps the size of a city. At the same time, if the learning rate is too slow, the model will take a very long time to train.
- *Learning rate decay* this is a measure of how much the learning rate changes over the course of learning, having a decay on the value of the learning rate can help to get close to the optimal result early, when the model is still bad, and then take smaller and smaller steps as the model gets close to optimal.
- *Number of Epochs* this is how many epochs your model will train for. Typically, you want this to be as high as possible (if you have the time), usually, the more learning the better. Sometimes though, training for too many epochs can lead to overfitting, which we'll talk more later.
- *Batch size* this is the number of training examples that you give to the model at once. Usually, this value will be limited by memory so you will want it as high as possible. Generally, the larger the batch size, the more accurate a representation the batch will be to the whole training set, but the slower it will run.
- *Loss function* is the function used to quantify how bad the model is doing, changing this can change how the model learns and where it "prioritizes," is it focusing on where it's doing worse? We might also want a simple loss function that is fast to compute.
- *Optimizer* this is the mechanics of how that giant optimization problem is actually solved, there are a few common techniques that each have their own pros and cons.
- *Model Architecture* this is how the model is laid out. How many hidden layers, what size are the hidden layers, what kinds of layers, and what kinds of activation functions? Of all the hyperparameters this is definitely the most consequential, so much so that it's often talked about entirely separately from other hyperparameters. You'll learn more about this in the neural network section.

### Transfer learning/Fine-tuning
Transfer learning, also commonly called fine-tuning, is when you start your training process with weights from another model, rather than randomly assigned ones. This can drastically speed up training and provide a better end result. It turns out that many models that perform similar tasks (like finding things in images) have very similar model weights for much of the model (early layers tend to look for edges, for example). This means that when we use a pretrained model, we get those weights for free, thus most of the training time goes into learning the specifics of the task at hand.

## Data
Data is one of the biggest limiting factors in how good your model will be. This is true for the relatively simple models we train here and it's true for OpenAI and Google. Therefore, it's worth explaining what makes data good or bad and how we use it. The first step in using any data is to convert it into a useful format, something that the computer can understand. Typically, this means turning your data into a vector or a matrix, ideally, this process with preserve everything important about your data and may even encode some additional information. For example, when vectorizing words, it's possible to make it so that vectors that are close together have similar meanings, this is called [word embeddings](https://www.tensorflow.org/text/guide/word_embeddings). For the images we use in computer vision, we usually just use a matrix that encodes the RGB values for each pixel (technically a tensor since there's a matrix for each channel), this also preserves important information, pixels that are close together in the image are close in the matrix. The lesson of word embeddings is still important though, if you can encode useful information in the data vectorization, model training will be faster and better.

For classifying digits, what data format should we use? A reasonable first attempt would be to just have the algorithm output a value from 0 to 9 and it's selection is the closest integer, but this has a few problems. If the models sees a 1 and guessing it's a 5, that is not any better than it seeing a 1 and guessing it's a 7. We want this fact to be encapsulated in our encoding. For classification tasks, we usually want our different classification vectors to be orthogonal, since they are distinct. This might not always be the case, but it is for recognizing digits. So how do we encode digits? The most common method is called one-hot encoding. If we have n classes, then our encoding is an n-dimensional vector where one of the components is 1 and the rest are 0. The "one-hot" component marks the class. For example, for digits we'd have the first component of the vector represent 0, the second 1, etc. 

$$
2 \mapsto \begin{bmatrix}
0 \\
0 \\
1 \\
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
\end{bmatrix} \hspace{0.2cm}
5 \mapsto \begin{bmatrix}
0 \\
0 \\
0 \\
0 \\
0 \\
1 \\
0 \\
0 \\
0 \\
0 \\
\end{bmatrix} \hspace{0.2cm} 
9 \mapsto \begin{bmatrix}
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
0 \\
1 \\
\end{bmatrix}
$$

Its important to note that which class goes to which component is arbitrary, as long as it's consistent. You can think of each component as the probability that the image is of a certain class, since we know the answer with certainty, the values are either 1 or 0.

### Normalization
Normalization is the process of changing our data so that it all has similar vector amplitudes. This is not always necessary but is useful for standardizing the data, sort of like making sure all the units are in meters and seconds when doing a physics problem. If you were, for example, considering how age and annual income affect a person's net worth, the values for income and net worth are likely to be at least in the thousands (and for net worth it might be negative), while age is likely in the range 0-100. Thus, the model, when seeing only numbers devoid of context, will likely learn that age is more impactful than income because small changes to age make big changes to net worth, even if this is not actually true. To see why this is the case, consider the fact that a difference of 30 in age makes a huge difference to net worth but a difference of 30 in someone's annual income is insignificant. Therefore, it makes sense to normalize the data so that the range of values is similar, this can help the model to learn faster. Then when you feed in new data, you have to normalize it too using the same process. A typical normalization procedure is to move all of your data between 0 and 1 (or -1 and 1) using multiplication and addition. When using a neural network, this process can also help to prevent values from blowing up towards infinity.

### Bad Data
Even when we have a lot of data, if the data is of low quality, then it may still be useless. Good data correctly represents the real world, where the model is deployed. If the training data doesn't match the real world, this is called a distributional shift. If you studied all year for your computer science class and then the final was on Greek poetry, you wouldn't do so great. But distributional shifts can be more subtle. Even small changes can have significant effects on model performance. For the MNIST digit classification problem, all the training data is centered, however, if you were to use the model on actual handwritten digits, that's not a guarantee. Specific to us, if we train the model on images taken in summer, it might not do as well in fall or winter. There are ways to make bad data better, called data augmentation or preprocessing which you will learn more about later. The best way to fix bad data however is to get good data in the first place. This means that the data should be varied and accurately reflect the environment the model might be deployed into. Combatting bad data is an active area of research, just recently, [liquid neural networks](https://news.mit.edu/2021/machine-learning-adapts-0128) were invented and seem to be resilient to distributional shift.

### Missing Data
Sometimes we have missing data. In the case of computer vision, this may be a corrupted file or an accidentally all-black image. In our case, we can just remove that data, in some applications missing data is the norm and there are techniques to fill in the missing data or use a special value to mark missing data.

## Fitting
Fit is basically how well the model does on actual data. If the model is a bad fit for the data, then it's probably for one of two reasons.
### Overfitting
This is what happens when the rule that the model learns is too specific for the data. For example, the "rule" might just be the data perfectly memorized, this will give a good result (perfect even) on the existing data but is useless to interpret new data. This generally happens when the model is too complicated and there is not enough data. Here is an example of a function that is overfit to the data (blue), and a function that is well fit (black).

![An overfitted function for the data](imgs/nns/Overfitted_Data.png)

### Underfitting
This is, predictably, the opposite of overfitting. Basically, when the rule is too simple for the data you gave it. For example, consider the line of best-fit example, if the data actually followed a quadratic, then any line would be a poor fit to the data and we would say it has been underfit. Typically, underfitting happens when the model is too simple or has not been trained for long enough (essentially the opposite of the reasons for overfitting). Here is an example of a function that is underfit to the data, we probably want something more parabolic to represent this data.

![An underfitted function for the data](imgs/nns/Underfitted_Model.png)
