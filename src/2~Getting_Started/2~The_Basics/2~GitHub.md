# Intro to Git

Git is a version control system that allows you to manage your source code and make changes to it while still retaining previous history.  Git also makes it easier for multiple developers to work together and make changes to the code while accounting for conflicting additions and deletions.  A quick tutorial on Git is included below!

[Github Tutorial For Beginners](https://youtu.be/0fKg7e37bQE)

## Installation & Git Bash

Git Bash is like your operating system's command prompt, but with added functionality and integration with git!  It still allows you to
navigate your files, but makes it easy to view the branches your different repositories are on, and perform git commands.  Various IDEs
do offer git integration as well, and at first glance this may seem like all you need.  After all, who would rather type commands over
pressing a button to push or pull?  Git bash is still extremely useful to have and know how to use, though, since git integration in IDEs can
often be buggy.

If you don’t already have one, go to GitHub and create an account using your Cornell email.

Install Git + Git Bash [Here](https://git-scm.com/downloads)

If you are using WSL, you can run the command
```shell
sudo apt install git
```

After installing, make sure you set your global username and email!  This can be done by entering the following commands in Git Bash:

```shell
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

## Authentication 

The two main methods of cloning into a repository are HTTPS and SSH.  

With HTTPS, you can simply copy and paste the URL that GitHub provides when you press the Clone button, while calling the clone command.
This method does require you to keep logging into your account over time.

SSH does require extra setup but will not require you to keep logging in, as it will use an SSH key to authenticate pushes, pulls, and checkouts from your computer.  Set this up as follows:

1) In Git Bash, run:

```shell
ssh-keygen
```

2) Follow the instructions and prompts that Git Bash gives you 
    - For most of the prompts, the default should be fine.  But pay attention to the following:
    - When prompted for the name of your ssh key, you can enter whatever you want (make sure it's not long and hard to remember, though)
    - Make sure you will remember the passphrase that you set! It will be needed when pushing, pulling, cloning, etc.

3) Copy your .pub file’s contents by running the following command and then copying the contents to your clipboard

```shell
cat ~/.ssh/<your-sshkey-name>.pub
```
	
4) Add your SSH key to your account by doing the following:
    - Go to your online account at GitHub
    - Click on your profile picture in the top right corner

    ![Profile Pic](imgs/git_tut_imgs/git_profile_pic.png)

    - Click *Settings*

    ![Settings](imgs/git_tut_imgs/settings_button.png)

    - Click *SSH & GPG Keys* in the left menu

    ![SSH GPG](imgs/git_tut_imgs/ssh_button.png)

    - Click *New SSH Key*

    ![New SSH](imgs/git_tut_imgs/new_ssh_button.png)

    - Paste the .pub file contents (the text you copied to your clipboard in step 3) into the key field and save! You should just be able to press Ctrl+V to paste the .pub file contents

&nbsp;  

## Cloning
Once you have authentication setup you can clone a repository. Near the top of the repository you want to clone there is a green button that says **Code** when you click on it, there is an option for HTTPS and SSH choose the one that matches your authentication. Copy the provided text which will be the **\<repository\>** you use to clone.

## Common Git Commands

GitHub does provide [documentation](https://git-scm.com/docs/git) for all of its commands, but here are some quick overviews!
___
```shell
git clone <repository>
```
This command gets the repository that is stored at the url you provide and puts it in your current working directory.  This shouldn’t need to be done multiple times for a repository.
___
```shell
git pull
```
This command will sync the repository on your computer with the one in GitHub.  Any changes on the branch you are on will be pulled to your computer!
___
```shell
git add <file>
```
This command "stages" your files essentially getting them ready to be moved to GitHub.  It will stage the specified file for commit — you usually stage files that you have made changes to, and want to push to GitHub. If you want to stage all the changed files, put a . instead of a filename.
___
```shell
git commit
```
This command will take your staged changes (from running git add) and confirm them on the branch you are working on.  See the section on commit messages for guidelines on how to make a descriptive commit!
___
```shell
git push
```
This command is kind of like the opposite of pull.  If you have any committed changes on the local branch, you can use the push command to publish them to GitHub.
___
```shell
git branch <NewBranch> <BaseBranch>
```
This command will create a new branch named NewBranch of the BaseBranch of the repository, that you can make changes to.  This branch will initially be a “copy” of the original branch but as you make changes, the original branch will not reflect them (until you merge).
___
```shell
git status
```
This command is a great way to view which files in your repository have changed since the last commit.
___
```shell
git checkout <BranchName>
```
Sometimes you might want to change to a different branch to work on it or conduct testing.  This command will swap you to the branch specified by BranchName.
___
```shell
git checkout -b <BranchName>
```
This is almost the same as the previous checkout command, but should be used when you want to make a new branch AND swap to it.
___
```shell
git stash
```
When trying to change to a new branch or pull from GitHub, you can’t have any uncommitted changes.  If you are not ready to commit, you can use this command to temporarily remove any changes you have made.  These changes are saved!
___
```shell
git stash pop
```
This command restores any stashed changes on your repository.
___

&nbsp;

## Commit Messages

Whenever you make a commit, git will prompt you for a commit message. It will open a text editor (by default GNU nano on both MacOS and Windows), once you type your message use Ctrl/Cmd+O and then Enter/Return to confirm your message and Ctrl/Cmd+X to exit nano and return to the terminal.

Your commit message is very important, as it helps you (and others) keep track of what was accomplished in each commit over the course of your project.

A good commit message usually includes:
- A short but descriptive title followed by a blank line
- A brief description of any changes you’ve made
- An issue number/id if tasks are organized in this way

Example:
	
Implements and Tests XYZ
	
Implemented the XYZ class  
Implemented the methods XYZ.a and XYZ.b  
Added unit tests for XYZ.a and XYZ.b  

Issue 123

___
If your commit is very simple, you can also commit with a one line message, only use this for commits like "Initial commit".
```shell
git commit -m "Your message"
```

## Other Git features to know about
- [Pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) this is a better way to merge code and generally good practice when working on the same repo as someone else. Essentially, a pull request is a way to request a merge two branches. When creating the pull request in GitHub, you will select both branches, the "source" and "destination" branches. When you do this, GitHub will tell you if there are any potential merge conflicts (which you may or may not want to fix). Then, when everyone is happy to merge, you can decide how to handle conflicts and merge the branches. [Here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) is the GitHub page explaining how to create a pull request
- [Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues), this is a place specific to a repo where you can write a description of a bug or a feature that you want implemented. Its essentially just a place to write some text, images or links.
- [Wiki](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis), this is a page specific to a repo where you can keep documentation. This is where you should keep any research you do and higher level documentation about how to use your code. If there are build instructions for example, this is one good place to put them. For smaller projects, you can put this info in the repos README. Basically, treat the wiki as an extended README where you can keep additional info in a well organized way. [Here](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages) is details on how to edit wikis
- [Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects), this is where we will keep track of tasks. Essentially this is just checklist where you can update the status of tasks, link repositories and assign task to people. You can see this information under the Projects page of the Organization.