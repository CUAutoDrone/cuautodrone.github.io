# Anaconda + Python Setup

In essence, Anaconda is just an open-source distribution of the programming language Python.  It is extremely useful for tasks related to data science and machine learning, which apply to our team!

The work you will do on this team will often require you to install multiple Python packages and libraries.  While these are amazing and simplify many of our tasks, installing these packages and libraries locally can cause problems for your computer, and different programs might require different versions of them.

This is another reason Anaconda is crucial — it lets you make environments, which are isolated from each other and your local installations.  In these environments, you can install different versions of different libraries!

## Install Anaconda

Go [Here](https://www.anaconda.com/download/) to download the Anaconda installer for your operating system

Go [Here](https://docs.anaconda.com/free/anaconda/install/index.html) for instructions on the installation process for your operating system

## Conda Commands

The Anaconda command prompt can be launched from your Anaconda Navigator

The commands for Anaconda differ from ones you might use in your OS’s command shell, and a cheat sheet for them can be found [Here](https://docs.conda.io/projects/conda/en/4.6.0/_downloads/52a95608c49671267e40c689e0bc00ca/conda-cheatsheet.pdf)

## Creating a Conda Environment & Using it in VSCode

To create a new conda environment using VSCode:

- Navigate to your desired folder/file in VSCode
- Press *View* in the top menu
- Press *Command Palette*
- In the Command Palette Search Bar that appears, type "python"
- Select the option that says "Python: Create Environment"
- Select "Conda"
- This will create and activate a `.conda` virtual environment in the current workspace
- This environment should be able to be activated later if needed by typing:
```shell
conda activate <filepath-to-your-file-or-folder>\.conda
```

If the conda environment created through VSCode did not work, you can also execute the following command in the Anaconda Prompt
```shell
conda create -name <your-environment-name>
```

Many times when installing packages/libraries in your VSCode projects, you will do so through the terminal.  When running your code or installing libraries, make sure that your environment name appears in parentheses next to the working directory.

If this is not the case, run the following command to activate your environment
```shell
conda activate <your-environment-name>
```

You can also deactivate your environment if necessary
```shell
conda deactivate
```

If something goes seriously wrong, you can remove an environment and all of its packages using
```shell
conda remove -n <your-environment-name> --all
```



