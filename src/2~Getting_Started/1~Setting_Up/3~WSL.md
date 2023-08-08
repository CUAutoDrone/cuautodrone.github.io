# Installing Windows Subsystem for Linux
If you want, you can install Windows Subsystem for Linux (WSL) as your development environment. Obviously, this is Windows only and it requires Windows 10 or 11. WSL is essentially a separate Linux OS that is partially integrated into your normal Windows install. The files you create in WSL are accessible from the normal File Explorer and your normal files are accessible from WSL.

The instructions for installing WSL can be found [here](https://learn.microsoft.com/en-us/windows/wsl/install), but I have included a down version with all the necessary steps.

First, open PowerShell and type
```PowerShell
wsl --install
```
Now you will need to enter a new username and password to be used by Linux, it doesn't have to be the same as your Windows username but it can be. Also, note that when you type your password (and when you type any password in Linux) nothing will show up but the typing is working, backspace is also still working.

You likely have to restart your computer once it's done installing but once you do, type "Ubuntu" into the search box and you should see it installed. Open Ubuntu and you will see the Linux terminal. This is how you will interact with WSL. You should see the Bash prompt, which looks like this:
```bash
user@machine:~$
```
If you see something else, like ***root@...#***, something went wrong. Uninstall Ubuntu (using add or remove programs), restart your computer, and try again.

Once you have Ubuntu working, the first thing you should do is type
```bash
sudo apt update && sudo apt upgrade
```
"sudo" means super user do, you can put it before another command to perform the action as a superuser, essentially equivalent to an admin in Windows. You should be careful of the commands you run with sudo, which is why it will require you to enter your password. The next part of the command is "apt", the advanced packaging tool and it is the package manager on Linux. Essentially, it takes care of installing and updating other programs. So this command will make sure that all of your packages are updated and upgraded.


## Using Linux
If you are completely unfamiliar with Linux, I'd recommend looking up a [Linux terminal cheatsheet](https://www.stationx.net/linux-command-line-cheat-sheet/) and familiarizing yourself with some of the commands, the most important ones I'll explain here. Alternatively, if you have the time, I highly recommend [Ubuntu's Linux Terminal for Beginners](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview), section 3 (ignoring the first 3 paragraphs) and on are the most applicable. It explains more than I've included here and it's very beginner friendly.

All commands and arguments are case-sensitive. The general format of a Linux command is\
[command] [arguments]\
separated by spaces, sometimes there are no arguments or multiple arguments. You can press **Tab** and Linux will attempt to auto-complete commands (if nothing happens, it doesn't know what you want).

- *ls* this lists all of the directories and files that are in your current folder (called the working directory). For example, if you were to call this command on a typical Windows user folder you would see Desktop, Documents, Downloads, Pictures, Videos, etc. You can also supply arguments to the *ls* command to limit or expand its scope, but that is not necessary.
- *cd [directory]* change directory, this will change your working directory and allows you to move around the file system. Type cd followed by the name of the folder you want to move to. To move back in a folder type *cd ..* to up one directory or *cd ../..* to move up two, you can chain as many as you like. For more detail on navigating terminal, look at [this](https://gomakethings.com/navigating-the-file-system-with-terminal/) guide. Finally, cd with no arguments will bring you back to the home directory */home*\
Example to move into the Documents folder
```bash
cd Documents
```
- *pwd* This outputs your current working directory (print working directory). This is useful if you've lost track of where you are.
- *mkdir [directory]* this is how you make a directory. This will make a folder in your current working directory after running this command if you *ls* then you should see the new folder show up.
- *touch [filename]* this is how you create files. It will make the file in your current working directory. After running this command *ls* will show the new file. If the file already exists then the file will remain unchanged.\
Example to make a file called **example.txt**
```bash
touch example.txt
```
- *sudo apt install [program]* this is how to install a program. It will require you to enter your password.
- *code .* this will open VS Code in your current directory. This can be an easier way to make files and you can run programs by clicking the play button in the top-right corner and the script will run in WSL.
- *Ctrl+C* this is how you end a process in Linux, basically if something is happening in the terminal and you want it to stop, type this. To copy and paste stuff, use the right-click window or Ctrl+Shift+C/V.

## Getting Python Working
Python should already be installed in WSL which you can check by running
```bash
python3 --version
```
which should return a version number, like **Python 3.10.6**, if you get **python3: command not found** then install Python like this
```bash
sudo apt install python3
```
you should update Python (whether it was installed originally or not) and install pip3, Python package manager which is like apt but for Python libraries.
```bash
sudo apt upgrade python3
sudo apt install python-pip3
```
to get Python libraries you can now type **pip3 install [packagename]**, we'll install numpy to check everything is working
```bash
pip3 install numpy
```
Now, open Python by typing
```bash
python3
```
you should now have **>>>** before everything you type. Type
```Python
import numpy as np
np.add(1,1)
```
and you should get 2. You can either press **Ctrl+D** or type **quit()** to quit.

Congrats! You now have Python working on WSL!
