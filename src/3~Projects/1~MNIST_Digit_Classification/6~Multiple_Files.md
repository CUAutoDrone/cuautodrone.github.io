# Using Multiple Files

When building a more complete machine learning pipeline, it becomes good practice to split the different components of your PyTorch system into different Python files. A typical directory structure is like this

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

When you do this you typically keep your Git localized only to the source directory, this means that you won't store your data and models on Git and won't have to push them to the cloud everytime you sync with GitHub.

Heres an overview of what each file should contain
## config.py
This contains your config, this includes hyperparameters like learning rate, batch size and number of epochs, the names of files, this includes where you'd find the training images, testing images and labels, where you will store your trained models and graphs as well as anything else that is arbitrary and might want to change.
## model.py
This is the file where you will define your model class and the loss function
## preprocess.py
If you have a preprocessing step with custom functions, this is where you should define those functions.
## dataloader.py
This is where you will define your dataset and dataloader, typically it will outline a process for loading files and getting a train/validation split
## engine.py
This is the file that actually trains the model, it runs the training loop for as many epochs as defined in config.
## inference.py
This is where you write the code that uses the model and outputs human readable or otherwise useful information, for example, if you were doing bounding box detection, you might write a script that takes in new images and draws the predicted bounding box.


For this assignment, you should build a file structure with a LeNet-like architecture that does classification on the CIFAR-10 dataset. It will have to load in the images and read their classes from a yaml file, and then train a network to classify the images. The LeNet is a simple convolutional neural network that is designed to handle black and white images like the MNIST digit classification. Your job is to modify the model to work with color images and perhaps make further adjustments to get it to have good performance.
1. Explore the dataset, how are the images stored, how is the yaml file structured? How will I read in the data
2. Decide how your Dataset class is going to work, what do I want the input to the model to look like? The output? What parameters should I pass into the Dataset on initialization
3. Write the Dataset class
4. Build the model, based on the LeNet architecture, you will have to modify it to work with color images. Additionally, you might find that performance with just the LeNet architecture is not great, what changes can you try to make it better?
5. Write the script to train the model, it should take in the DataLoaders from the dataloader file, the model from the model file, etc and train the model using the parameters set out in the config. You also want to make sure to save the best model using `torch.save`. You will use this latter.
6. Create an inference script that allows you to feed new data to the trained neural network and get a useful classification back, either something human readable (probably not a PyTorch tensor)