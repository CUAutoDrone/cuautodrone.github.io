# Preprocessing
Since data is so important to making sure our machine learning models perform well, there are a variety of techniques we can use to make our data better. This is called preprocessing because we are processing our data *before* training. Preprocessing is usually made up of a few different things. First, we need to get the data in a "usable" format, something we talked about in the last section. We want the data to be all numberic (so the computer can understand it), ideally with some meaning to the encoding (like word embeddings). Additionally, we want the data to be normalized so that artificial differences are removed. It's worth noting that when you do this part of preprocessing, this is something you will have to do with real data in order to feed it into the model.

The other part of preprocessing is data augmentation. This is where you create artificial data from your existing data. Consider the following two images

![Training example rotated image](imgs/preprocessing/image_2120croppedperspective.jpg)

![Training example cropped image](imgs/preprocessing/image_2120cropped.jpg)

Both are examples of something that the model might find in the real world and we would hope that the model could locate the mast in either case. To make sure the model learns how to spot the object in both senarios, we need data that represents both senarios. So, to get that data, we could either take more pictures, or we can try to make the pictures we have cover more cases. In practice, data augmentation allows us to multiply the amount of high quality data we have and thus train better models on the same underlying data. While it might be ideal to just get more data, that can be much more time consuming. Labeling another thousand images takes much longer than running a script that modifies the data. Additionally, data augmentation can make it easier to get representative data, changing the camera settings lots of time to get a wide range of exposures, blurriness and noise is much more difficult than adding noise, blurring the image or changin the exposure. Of course, doing these things afterwards is going to be less acurate than collecting real data and that is something worth considering. If the augmented data is not similar to something the model might encounter in deployment, it's usefulness is diminished.

There are a few important things to keep in mind when augmenting the data. First, when you augment the input, you also have to augment the output. For example, with the bounding box, you will have to change the box so that it still surround the object after changing the image. Second, you need to make sure the augmentation produces data that is representative of the enviroment the model is deployed in. If the image are hue shifted so that green is red or the image is cropped to a few pixels, that is only making bad data is is more likely to hurt the model than help it. Finally, dat augmentaion is not a replacement for good data, it's a supplement to good data.

## Some Common Data Augmentation Techniques for Images
These different techniques can also be combined together to make even more data.
- *Mirroring* Often, the data is still resonable if it's flipped horizontally. More rarely it's also good flipped vertically.
- *Cropping* When cropping, it's important to make sure the resolution stays the same by rescaling. Also, if you crop too far, the image can become pixelated and a bad representation of real data.
- *Exposure* Changing the exposure means making the image brighter or darker.
- *Contrast* Increasing the difference between the dark and light parts of the image.
- *Saturation* This changes how strong the colors are, 0 saturation is black and white.
- *Perspective* If done correctly, this can make it look like the camera has moved.
- *Rotation* This also involves cropping to make sure there are no blank spots.
- *Noise* Adding noise is when you add random values to some pixels, something tha happends naturally in dark parts of most images.
- *Blur* Bluring the photo can replicate when the camera is not properly focused, it usually involves averaging neighboring pixels in some way, typically either Gaussian or Box.
- *Motion Blur* This replicates what happens when you take a picture and the camera is moving, it makes blurs that have a direction.
- *Hue* Sometimes, small changes in the color of an image can represent the data with changing camera settings or different times of day.
- *White Balance* This is essentially how blue or orange the image is, since the camera will automatically change this setting, it may change and so worth augmenting.

