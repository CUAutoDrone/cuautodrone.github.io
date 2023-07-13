# Visual Studio Code
This guide will go over how to install and use VS Code. Since you'll be spending quite a bit of time using your code editor, it can be worth learning a bit about its many features. Also, keyboard shortcuts are included wherever possible, learning them can drastically speed up how fast you can move around and edit your code.

First, download VS Code from [their website](https://code.visualstudio.com/Download), and follow the installation instructions. When you open VS Code, you should see a welcome page and some icons on the left side.

![VS Code Welcome](imgs/vscode/VSC_Welcome.png)

First, we'll look at the sidebar in more detail, if you don't see the icons on the sidebar (or accidentally closed it) you can go to *View* -> *Appearance* -> *Activity Bar* and make sure it's checked.

The first icon is the **Explorer** (which you can get to with Ctrl/Cmd+Shift+X), it shows the local file system and allows you to make changes to it. It should have a button that says Open Folder. 

![VS Code Activity Bar](imgs/vscode/VSC_Activity_Bar.png)

VS Code is designed to work in a directory, so you need to tell it where it should be working. Typically, it's easier to open Code where you want to work rather than telling it afterward, how you do this depends a bit on your OS. 
- In Linux (and WSL) you can use the command 'code .' which opens Code in the current working directory.
- In Windows, you can rick-click in/on a folder then, in Windows 10, there will be an option to 'Open with Code', in Windows 11, you have to click 'Show more options' first.
- In MacOS, you need to open the Command Palette (Cmd+Shift+P) in VS Code and type 'shell command' to find **Shell Command: Install 'code' command in PATH**, select it then restart the terminal and you can use 'code .' just like in Linux.

Before continuing, open VS Code in the directory you want to work on (you might want to make one just for CUAD things). Now, in Explorer, you should see the folder name at the top in bold with the contents listed below.

![VS Code New Folder](imgs/vscode/VSC_New_Folder.png)

You can create a file or folder by clicking on the *New File* or *New Folder* icons at the top, next to the folder name. When you create a file you need to give it both a name and a file extension (like .txt or .py). You can put files/folders into a folder by dragging them in or create them inside by clicking on the folder before clicking the create icon. When you open a file, it will display in the center editor area.

![VS Code New File Creating](imgs/vscode/VSC_New_File&Folder.png)

At the top of the editor is your open tabs. Each tab has the file's name and type (as an icon) along with some additional information. When a file is unsaved, a grey dot will appear over the close button. When a name is in *italics* it means that you're just scanning the file and when you click a different file the tab will be replaced. If a tab is not italicized, it will stick around until you close it. To unitalicize a tab, you can make an edit, save it or drag it from the sidebar into the editor. To open multiple tabs you can drag files from the sidebar or, if there is no italicized tab, just click on it. Finally, these tabs have many of the same keyboard shortcuts as Chrome or Safari (Ctrl/Cmd+Tab to move between tabs, Ctrl/Cmd+W to close, Ctrl/Cmd+Shift+T to reopen, etc).

Below the tabs are what VS Code calls 'breadcrumbs' which show the path of whatever file you're looking at. You can click on parts of the path to see their siblings and open files in new tabs.

![VS Code Breadcrumbs](imgs/vscode/VSC_Breadcrumbs.png)

On the top right of the editor, there are a few context-dependent buttons. Depending on the type of file you have open (among other things) there will be a few useful options, you can hover over them to see what they do. For example, when you have a Python file open, there will be a Play button that you can click to run the script. Create a Python script that prints something out and run it using the Play button. You will notice that a new panel opens at the bottom of your editor, this includes the terminal and a few other tabs.

![VS Code Run Python Script](imgs/vscode/VSC_Run.png)

This built-in terminal is specific to your operating system and will already be in the same directory as VS Code. You should notice it contains the output of your program. You can open a new terminal by clicking the plus icon on the top right of the panel (Ctrl/Cmd+Shift+\`). 

![VS Code New Terminal](imgs/vscode/VSC_New_Terminal.png)

You can have as many terminals open as you like and see a list of all open terminals on the left. To close a specific terminal, click its trashcan icon.

![VS Code New Terminal](imgs/vscode/VSC_Trash.png)

Finally, you can fullscreen and unfullscreen the terminal with the up/down arrow icon. To open/close the bottom panel, use Ctrl/Cmd+\` (this is the backtick, right below the escape key).

The next icon on the sidebar is **Search** (Ctrl/Cmd+Shift+F), this allows you to search for things in multiple files, you can find and replace as well as specify the files to include or exclude.

Next is **Source Control** (Ctrl/Cmd+Shift+G). This allows you to clone a repository and, if your folder has a git repository, this will offer an interface to perform git commands and track changes. 

![VS Code Source Control Example](imgs/vscode/VSC_Git.png)

While you can use this UI instead of the terminal, I suggest that you learn the terminal commands. If something goes wrong, it's usually easier to fix in the terminal than in a UI. That being said, GitHub and VS Code are both owned by Microsoft, so the integration is about as good as it gets for UIs, it's up to you.

Then there's **Run and Debug** (Ctrl/Cmd+Shift+D), this can be one of the most helpful parts of VS Code, it allows you to debug code by looking at variable values and evaluate expressions in the environment during runtime. There will be more information on how to use VS Code's debugger in the Debugging section.

Finally, there are **Extensions** (Ctrl/Cmd+Shift+X). This is a section that allows you to add custom additions to VS Code. There are tons of useful extensions but for now, we'll just have you install one, to get the hang of it. In Extensions, search 'Python'. Then, pick the option with the verification checkmark made by Microsoft and click Install. This extension adds some extra features like [autocomplete](https://code.visualstudio.com/docs/languages/python#_autocomplete-and-intellisense) and [linting](https://code.visualstudio.com/docs/python/linting).

![VS Code Python Extension](imgs/vscode/VSC_Extension.png)

Technically, there are sometimes more icons, but it's context-dependent. For Python there's Testing, for C/C++ there's CMake, etc. Depending on what your doing it might be helpful, so check it out if you see it!


## Some Useful Keyboard Shortcuts
- Ctrl/Cmd+/ Comments/uncomments all highlighted lines, works for any language
- Ctrl/Cmd+F5 Run without debugging, this one is worth changing to something else, since you'll be doing it a lot
- Tab Adds an indent to all highlighted lines
- Shift+Tab Removes an indent from all highlighted lines
- Alt/Opt+Click Creates additional cursors wherever you click, then when you type or paste, it will appear at all cursor points
- Alt/Opt+↑/↓ Move line(s) up or down
- Ctrl/Cmd+Y Redo, for when you're overzealous with the undos
- Ctrl/Cmd+D Select next instance, this highlights the next instance of whatever word your cursor is on
- Alt/Opt+Shift+↑/↓ Creates cursor above/below
- Ctrl/Cmd+L Selects the whole line
- Alt/Opt+Shift+I Puts cursors on the end of all selected lines
- Ctrl/Cmd+, Opens settings
- Ctrl/Cmd+Shift+P Opens the Command Palette, where you can search for commands

Also, while in the editor, you can right-click on a variable to bring up a menu with some very helpful options. The most useful are
- F12 Go to definition, this will bring your screen to where this variable is defined, it will adhere to scope and open the necessary file in a new tab if needed.
- Shift+F12 Go to references, this will show all the places this variable is used in your code.
- F2 Rename Symbol, this will rename the variable (again respecting scope) to something new, use this instead of a find and replace as it's almost impossible to make a mistake.
