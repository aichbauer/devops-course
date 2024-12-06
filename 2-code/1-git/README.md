## What Is Git?

Git is a distributed version control system used for tracking changes in source code during software development. It was created by Linus Torvalds in 2005 for the development of the Linux kernel. Git allows multiple developers to work on the same project simultaneously, providing tools for merging changes and tracking history.

### What Is A Distributed Version Control System (DVCS)?

Distributed means that every person that works with this version control system can have its own copy of all versions. This means that a developer, has a complete copy of all source code versions that exists, on the development machine. A developer can easily create changes locally. Local changes do not have to be merged to a central repository. So a developer can check something locally or experiment without the need to share it with everyone else.

## What Is A Centralized Version Control System (CVCS)?

A centralized version control system uses a single place for storing all changes, usually on a server. This is due to the fact that multiple developers need to work on the same source code. Everyone who has access to it can check out files from this server. An advantage of those systems are that everyone has a good overview of who is working on what and administrators have a fine grained control of who has access to what. The biggest downside with those systems are that they have a single point of failure. Nobody can collaborate or save new versions if the connection to the central server cannot be established or the server goes down. Also if the hard drive of the server is corrupted and you do not have proper backups you loose absolutely everything, except the single snapshots that people have on their development machines.

## What Is The Difference Between A Distirbuted And A Centralized Version Control System?

With a DVCS you have a complete mirror of all versions on your development machine (the complete history of the source code). So there is no single point of failure anymore. Any developer working on the same source code can work offline, even if the server goes down. Every local copy could restore the server if the hard drive corrupts.

### Why Should You Choose Git Over Other Version Control Systems?

Git has by far the largest community and has the broadest adaption, and fits most software projects. This is by far the greatest benefit, as there are multiple competitors in the DVCS field.

Besides that, a most operations are performed locally it could also be faster in most scenarios than CVCS. The offline access and the possibility to create local changes that you do not have to share with a remote repository, could be an advantage over an CVCS.

## Set Up Git CLI

When you installed git the first thing to do is to configure the user. This information is displayed on a version of your source code, indicating who has created that version.

```bash
# set a --global user name
$ git config --global user.name "<username>"
# set a --global user email
$ git config --global user.email <email-address>
```

## What Is A Repository?

A repository in version control systems like Git is a storage location for your project. It is basically a directory. It contains all of the project's files and each file's revision history. Repositories can be local (on your computer) or remote (stored on a server). Every Git repository can be identified by a hidden folder called `.git`, which is located at the root of your project.

### How Do You Create Initialize A Local Repository With Git CLI?

To initialize a local Git repository, use the command line interface (CLI) of Git:

```bash
# navigate to your project directory
$ cd /path/to/your/project
# initialize a new Git repository
$ git init
# check the new .git folder
# list the content of the directory including hidden files, and folders
# .git is a hidden folder
# hidden folders are prefixed with a dot (.)
% ls -la
```

This command creates a new subdirectory named **`.git`** that holds the necessary repository files.

### Local Vs. Remote Repository?

A **local repository** is on your personal computer, managing your individual changes. A **remote repository** is typically hosted on a server, allowing multiple people to collaborate on the same project. Changes are pushed from local to remote repositories to share with others. Other people can then pull the changes from the remote repository to get the changes from another person.

It can be complex to host your own remote Git repository. Fortunately, there are multiple Projects that allows you to easily host a repository in the cloud (GitHub, GitLab, BitBucket, …) or on your own server (GitLab CE, …).

### How Do You Create a Remote Repository?

For this article we will use the online service GitHub for our remote repository. When you are logged into the your Account you can click on the plus (+) symbol in the top right of the navigation bar. Select new repository, and on the next screen you can give your repository a name and click the button `Create Repository`. Now you have successfully created a remote repository.

### How Do You Connect A Local With A Remote Repository with Git CLI?

If you followed the last step you should see a site that has a heading that goes like “**Quick setup — if you’ve done this kind of thing before**”, underneath this line you can copy the HTTPS or SSH link to your repository. Use the HTTPS, since you need additional setup to use the SSH link.

On your local development machine you can now add the remote repository by executing the following command:

```bash
# navigate to your project directory
$ cd /path/to/your/project

# Add a remote repository
# git remote add <remote-name> <remote-repository-URL>
# in our case we give our remote repository the name "origin"
$ git remote add origin https://github.com/<your-github-username>/<your-repository-name>.git

# but we could name it differently
# we could even add multiple different remotes
$ git remote add my-variable-name https://github.com/<your-github-username>/<your-repository-name>.git

# Verify the new remote URL
# git remote --version (shorthand: -v)
$ git remote --version
```

Replace **`<remote-repository-URL>`** with the URL of your remote repository.

### How Do You Clone A Remote Repository with Git CLI?

Cloning a repository in Git involves creating a copy of an existing Git repository on your local machine. This is commonly used to get a local copy of a remote repository from a server like GitHub, GitLab, or Bitbucket. Here's how you do it:

```bash
# make sure you are in a directory
# where you want to create a new folder
# with your repository
$ git clone <remote-repository-URL>
# if your <remote-repository-URL> looks like
# https://github.com/user/repo.git
# this command will create a folder called repo
# in your current working directory

# if you want to clone in to a special location
# you can specify the path
git clone <repository-URL> <path-to-store-repo-on-local-machine>
```

### How Do You Get The Current Status Of Your Repository With Git CLI?

To get an overview of what files of your source code are in what stage (untracked, staged, commited), you can use the `git status` command.

```bash
# display the stage of your files in your repository
$ git status
# this command can output one of the following messages (sometimes mixed)
# for this article we use the most common messages

# >>>>>> 1: (this line is not part of the output)
# On branch <branch-name>
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#	 <file-name>

## >>>>>> 2: (this line is not part of the output)
## On branch <branch-name>
## Changes not staged for commit:
##  (use "git add <file>..." to update what will be committed)
##  (use "git restore <file>..." to discard changes in working directory)
##	<status>:   <file-name>
##
## no changes added to commit (use "git add" and/or "git commit -a")

### >>>>>> 3: (this line is not part of the output)
### On branch <branch-name>
### Changes to be committed:
###  (use "git restore --staged <file>..." to unstage)
###	<status>:   <file-name>

#### >>>>>> 4: (this line is not part of the output)
#### On branch main
#### nothing to commit, working tree clean
```

- **Untracked files:** You have added a new file in your source code, that does not exist in the previous version of git.
- **Changes not staged for commit:** This means you have modified the current version. You either modified, deleted, or renamed a file. You will see the `<status>` of the file in the message.
- **Changes to be committed:** You have already staged your file for the next version (commit) source code.
- **Nothing to commit, working tree clean:** There are no changes to the current version of your source code.

### How Can You Get The History Of Your Source Code?

Sometimes it can be good to take a look at the history of your source code. For example, if you want to go back in time. You can print the history of your source code with the following command:

```bash
# print the history
$ git log
# you can exit this command with q (for quit)
# this command can output one of the following messages
# for this article we use the most common messages

# >>>>>> 1: (this line is not part of the output)
# fatal: your current branch 'main' does not have any commits yet

## >>>>>> 2:
## commit 29d5e128d9995e2be1f8f20ffe0e43d86a58deb1 (HEAD -> main)
## Author: <author-name> <author-email>
## Date:   Sat Dec 16 10:32:11 2023 +0100
##
##    Initial Commit

# if you only need the commit hash and the message you can use
$ git log --oneline
# you can exit this command with q (for quit)

# if you want the commit hash, the message and the graph you can use
$ git log --oneline --graph
# you can exit this command with q (for quit)

# if you want to get a visual representation of all branches
$ git log --oneline --graph --decorate --all
```

## Untracked Files Vs. Stages Files Vs. Commited Files?

Files in your source code can be in three different stages.

- **Untracked Files:** These are files in your working directory not yet tracked by Git. If you create or edit a file this changes will not be automatically added to a version, thus they are untracked by Git.
- **Staged Files:** These files have been marked in their current version to be included in the next commit. If you want to add a file you need to use the `git add` command.
- **Committed Files:** These files have been securely stored in your local repository. To finally create a new version of your source code you need to commit the staged files to the source control. You do this by utilizing the `git commit` command.

```bash
# make sure you are in your local repository
# create a new file and write "Hello World" to it
$ touch test.txt && echo "Hello World" >> test.txt
# now this file is untracked by Git

# verify this file
$ cat test.txt
# Output =>
# Hello World

# check the status of your file in the repository
$ git status

# add your file to Git
# after this command your file ist tracked on the so called staging area
$ git add test.txt
# you can use: `git add .` with a dot (.) instead of the file name
# to add all untracked files to the staging area

# check the status of your file in the repository
$ git status

# undo the last action
# remove the file from the staging area
# but keep the copy in the working directory
$ git rm --cached test.txt

# commit your files to Git
# after this command you have created a new version of your source code
# git commit --message "<your message>" (shorthand: -m "<your message>")
$ git commit --message "<your message>"

# check the status of your file in the repository
$ git status

# check the history of your source code
$ git log

# if you want to reset the inital commit
# you can delete the pointer to the current version
# which is called HEAD in git
# -d stands for delete
$ git update-ref -d HEAD

# check the status of your file in the repository
$ git status
# you will see that the file is staged again

# check the history of your source code
$ git log
# you can exit this command with q (for quit)

# commit again
# after this command you have created a new version of your source code
$ git commit --message "<your message>"

# edit the test.txt file by adding another line
$ echo "Hello World" >> test.txt

# verify this file
$ cat test.txt
# Output =>
# Hello World
# Hello World

# add this file to Git and make a second commit
$ git add . && git commit --message "second commit"

# check the status of your file in the repository
$ git status

# check the history of your source code
$ git log
# you can exit this command with q (for quit)

# now that you have two commits you can revert the current commit by 1
# you do this by setting the pointer called HEAD to the previous commit
# git commit --soft HEAD~<number-of-commits-you-want-to-revert>
# --soft ensures that you keep the changes in your working directory
# on your staging area
$ git reset --soft HEAD~1

# check the status of your file in the repository
$ git status

# check the history of your source code
$ git log
# you can exit this command with q (for quit)

# verify this file
$ cat test.txt
# Output =>
# Hello World
# Hello World

# make a second commit again
$ git commit --message "second commit 2"

# now that you have two commits again you can delete commits
# you do this by setting the pointer called HEAD to the previous commit
# git commit --hard HEAD~<number-of-commits-you-want-to-revert>
# --hard deletes every changes that you made in the prvious commit
# so make sure to only use this command when you want to delete stuff
$ git reset --hard HEAD~1

# check the status of your file in the repository
$ git status

# check the history of your source code
$ git log
# you can exit this command with q (for quit)

# verify this file
$ cat test.txt
# Output =>
# Hello World
```

## How To Push To A Remote Repository With Git CLI?

If you successfully added your remote repository we can now push our source code to GitHub.

```bash
# if you have connected your local repository with your remote repository
# you can push your changes that you made to your source code to the remote
# the default name is main
# git push <remote-name> <branch-name>
$ git push origin main
```

If you want to use just `git push` without the `<remote-name> <branch-name>` part, you can set an upstream. This has to be done once per branch. Setting an upstream connects your local branch with a branch in your remote repository.

```bash
# try to use git push
$ git push
# Output =>
# fatal: The current branch main has no upstream branch.
# To push the current branch and set the remote as upstream, use
#
#     git push --set-upstream origin main
#
# To have this happen automatically for branches without a tracking
# upstream, see 'push.autoSetupRemote' in 'git help config'.

# if you want to connect your local branch with a remote branch
# you can use --set-upstream (shorthand: -u)
$ git push --set-upstream origin main

# now if we do some change
$ echo "Hello World" >> test.txt
$ git add .
$ git commit --message "<your-message>"

# now we can push our changes without specifing the remote and branch name
$ git push
```

### How To Pull Changes From A Remote Repository?

Sometimes you have to pull changes from the remote repository, e.g. when a collegue has pushed changes. To get those changes to your local repository use:

```bash
# to pull changes from a remote repository into the current branch
$ git pull
```

## What Is A Branch In Git?

In Git, a branch is an independent line of development. You can see it as a new version of your source code that can co-exist with another version of your source code.

Let’s say, you use the `main` branch for your base version of your source code. Now you can create a copy from any point of time from this `main` branch, and develop your source code independently from the other branch.

The branching concept is not limited to the main branch, you ca actually create a new branch from any commit (aka. version of your source code). This allows you to develop features, fix bugs, or experiment in a contained area of your repository.

One important thing to mention is, that you do not need to share a local branch with your remote. This means you can experiment in your local repository without sharing it with colleagues. This can be handy if you just want to try something.

### How To Create A New Branch With Git CLI?

You can use the `git branch` command to create a new branch with the Git CLI.

```bash
# create a new branch
# git branch <branch-name>
$ git branch feature
```

### How To Check On Which Branch We Are Currently With Git CLI?

We also check the current branch with the `git branch` command.

```bash
# check the current branch
# the asterisk (*) is indicating the current branch
# in our case we are currently on branch main
$ git branch
# Output =>
#   feature
# * main

# you can exit this command with q (for quit)
```

### How Do You Switch Between Branches With Git CLI?

To switch branches we can utilize the `git checkout` command.

```bash
# switch branches
# git checkout <branch-name>
$ git checkout feature

# verify that we have switched branches
# the asterisk (*) is indicating the current branch
# in our case we are currently on branch feature
$ git branch
# Output =>
# * feature
#   main

# you can exit this command with q (for quit)
```

### How To Merge Two Branches With Git CLI?

If you develop on two different branches your source code can contain different changes on each branch. If you want to get changes from one branch to another you can use `git merge`.

```bash
# to merge two branches you can use
# git merge <branch-name>
# this will merge the branch <branch-name> into the current branch
# if there are no changes nothing will happen
# in our case we merge the main branch into the feature branch
# both branches point to the same commit
$ git merge main
# Output =>
# Already up to date.

# verify that they share the same history
# in the parenthesis (()) you can read the branch names
# and to which commit they point
# in our case main and feature point to the same commit c262aca
$ git log --oneline --graph
# Output =>
# * c262aca (main, feature) <your-message>
# * 351b716 <your message>
```

### What Is A Fast Forward Merge In Git?

If just one of the branches have changed, Git simplifies the merging process by doing a `fast forward` operation. This means git will simply move the pointer to the new commit.

```bash
# make sure ou are on branch feature
$ git checkout feature

# lets create changes in this new branch
$ touch test2.txt && echo "Hello World" >> test2.txt

# stage and commit changes
$ git add test2.txt && git commit --message "Feature commit"

# check the status of your file in the repository
$ git status

# check the history of your source code
# in our case main has not changed and points to c262aca
# feature points to d773446
# what Git does is it will set the main branch to point to d773446
# as there are no changes between those two branches git can do this
$ git log --oneline --graph
# Output =>
# * d773446 (HEAD -> feature) Feature commit
# * c262aca (main) <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# checkout to the main branch
$ git checkout main

# verify
$ git branch -v

# merge
$ git merge feature
# Output =>
# Updating c262aca..d773446
# Fast-forward
#  test2.txt | 1 +
#  1 file changed, 1 insertion(+)
#  create mode 100644 test2.txt

# check the history of your source code
# now bothe branches point to the same commit
$ git log --oneline --graph
# Output =>
# * d773446 (HEAD -> main, feature) Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
```

### What Is A Merge Commit (Three-Way Merge) In Git?

To understand what a three-way merge is we first need to understand what a two-way merge is.

Lets assume you have a one document called main and you create a new version of it by removing a paragraph at the top. Your friend creates a new version by removing another paragraph but at the end of the document. When it is time to merge them both the version control system needs to find out which changes to keep. What should we do?

```bash
Original Document (main):
+---------------------+
| Paragraph 1         |
| Paragraph 2         |
| Paragraph 3         |
| Paragraph 4         |
+---------------------+

Your Version (removed top paragraph):
+---------------------+
| Paragraph 2         |
| Paragraph 3         |
| Paragraph 4         |
+---------------------+

Your Friend's Version (removed bottom paragraph):
+---------------------+
| Paragraph 1         |
| Paragraph 2         |
| Paragraph 3         |
+---------------------+
```

**An intersection:** in our example this would create the correct new version, but just by chance. Think of an example where the second person did not remove something but added something. In that case we would create a wrong new version with an intersection.

```bash
1. Intersection:
+---------------------+
| Paragraph 2         |
| Paragraph 3         |
+---------------------+
```

**A combination:** if we would perform an combination of both changes we would end up with the same document as before, because we would add the top paragraph from the changes of your friend, since that document actually has that paragraph. And the bottom paragraph from your document, since you left this paragraph in your version. This would clearly create a wrong new version of the document.

```bash
2. Combination:
+---------------------+
| Paragraph 1         | # Paragraph 1 exists in your friends changes
| Paragraph 2         |
| Paragraph 3         |
| Paragraph 4         | # Paragraph 4 exists in your changes
+---------------------+
```

**The difference:** before we do this operation, we would need to decide wich version we want to subtract from the other version. this would clearly create a wrong version.

```bash
3.1. Difference: Your changes without your firends changes
+---------------------+
| Paragraph 1         |
| Paragraph 2         |
| Paragraph 3         |
+---------------------+

3.2. Difference: Your firends changes without your changes
+---------------------+
| Paragraph 2         |
| Paragraph 3         |
| Paragraph 4         |
+---------------------+
```

**A symmetrical difference:** this would create a new version with just the top and bottom paragraph.

```bash
4. Symmetrical Difference: Only the changes that do not appear in both changes
+---------------------+
|                     | # empty cause we only removed something in both changes
+---------------------+
```

As you can see a two-way merge is pretty hard to do without knowing a lot about the history of your document. That is why Git operates a three-way merge.

In this type of merge it does not only look at the changes made by the two new versions, but also by the common ancestor. Lets create two changes in the `main` and the `feature` branch, and then merge the feature into the main branch.

```bash
# make sure ou are on branch main
$ git checkout main

# lets create changes in this branch
$ touch test3.txt && echo "Hello World" >> test3.txt

# stage and commit changes
$ git add test3.txt && git commit --message "Main commit"

# check the status of your file in the repository
$ git status

# check the history of your source code
$ git log --oneline --graph
# Output =>
# * 1a609a0 (HEAD -> main) Main commit
# * d773446 (feature) Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# checkout the feature branch
$ git checkout feature

# check the history of your source code
# see the difference to the main branch?
$ git log --oneline --graph
# Output =>
# * d773446 (HEAD -> feature) Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# lets create changes in this branch
$ touch test4.txt && echo "Hello World" >> test4.txt

# stage and commit changes
$ git add test4.txt && git commit --message "Feature commit 2"

# check the history of all versions
# our branches have diverged
# to merge the feature into the main branch
# it will create a new commit on the main branch
# that takes three commits into account
# d773446 as their common ancestor
# 8e5c144 the latest feature commit
# 1a609a0 the latest main commit
$ git log --oneline --graph --decorate --all
# Output =>
# * 8e5c144 (HEAD -> feature) Feature commit 2
# | * 1a609a0 (main) Main commit
# |/
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# checkout to the main branch
$ git checkout main

# merge the feature branch into the main branch
# git merge <branch-name>
$ git merge feature
# Output => (Opens default editor in terminal)
# Merge branch 'feature'
## Please enter a commit message to explain why this merge is necessary,
## especially if it merges an updated upstream into a topic branch.
##
## Lines starting with '#' will be ignored, and an empty message aborts
## the commit.

# in this editor you can change the commit message
# the default commit message is "Merge branch '<branch-name>'"

# if you are in vi(m):
# click i (insert)
# use the arrow keys to navigate in the text
# change the message to "Three way merge - branch feature into branch main"
# click CTRL + C
# type :wq
# this stands for write and quit

# check the history of all versions
$ git log --oneline --graph --decorate --all
# Output =>
# *   6c20b0f (HEAD -> main) Three way merge - branch feature into branch main
# |\  
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/  
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)
```

As you can see we have a new commit (6c20b0f) on our main branch. 

### What Is A Rebase In Git?

In Git, rebasing means taking the commits from one branch and putting it on top of another branch.

```bash
# make sure ou are on branch main
$ git checkout main

# create a new branch
$ git branch rebase-test

# make some changes on main
$ touch test5.txt && echo "Hello World" >> test5.txt

# stage and commit changes on main
$ git add test5.txt && git commit --message "Main commit 2"

# checkout to the new branch
$ git checkout rebase-test

# make some changes on rebase-test
$ touch test6.txt && echo "Hello World" >> test6.txt

# stage and commit changes on rebase-test
$ git add test6.txt && git commit --message "Rebase-test commit"

# check the history of all versions
$ git log --oneline --graph --decorate --all
# Output =>
# * 5221898 (HEAD -> rebase-test) Rebase-test commit
# | * dc6c61c (main) Main commit 2
# |/
# *   6c20b0f Three way merge - branch feature into branch main
# |\
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# now we want to put 5221898 on top of dc6c61c
# to do that we rebase the rebase-test branch on
# top of the main branch
# if you are on the branch that you want to rebase onto
# another you can use
# git rebase <other-branchname>
# in our case we are already in rebase-test so this would look like
# git rebase main
# but if you want to be sure you can use
# git rebase <branch-to-put-the-changes-onto> <branch-to rebase-on-top-of-other>
$ git rebase main rebase-test
# Output =>
# Successfully rebased and updated refs/heads/rebase-test.

# check the history of all versions
# see that there is no diverged history between rebase-test and main anymore
# the commit hash of Rebase-test commit has changed
# from 5221898 to 8c245f1
$ git log --oneline --graph --decorate --all
# Output =>
# * 8c245f1 (HEAD -> rebase-test) Rebase-test commit
# * dc6c61c (main) Main commit 2
# *   6c20b0f Three way merge - branch feature into branch main
# |\
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)
```

## How To Switch To A Specific Commit With Git CLI?

Sometimes you want to go back in your history. To check something out, to experiment, to work with deleted code, …

```bash
# checkout to a specific commit
# git checkout <commit-hash>
$ git checkout d773446
# Output =>
# Note: switching to 'd773446'.
#
# You are in 'detached HEAD' state. You can look around, make experimental
# changes and commit them, and you can discard any commits you make in this
# state without impacting any branches by switching back to a branch.
#
# If you want to create a new branch to retain commits you create, you may
# do so (now or later) by using -c with the switch command. Example:
#
#  git switch -c <new-branch-name>
#
# Or undo this operation with:
#
#  git switch -
#
# Turn off this advice by setting config variable advice.detachedHead to false
#
# HEAD is now at d773446 Feature commit

# create a branch with this commit
$ git branch test-from-old-commit

# switch to this branch
$ git checkout test-from-old-commit

# check the history of all versions
$ git log --oneline --graph --decorate --all
# Output =>
# * 8c245f1 (rebase-test) Rebase-test commit
# * dc6c61c (main) Main commit 2
# *   6c20b0f Three way merge - branch feature into branch main
# |\
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/
# * d773446 (HEAD -> test-from-old-commit) Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)
```

## What Is A Merge Conflict?

A merge conflict arises when Git can not automatically resolve differences in code between two commits. It commonly occurs when two branches have altered the same part of the same file differently.

Lets create a merge conflict, by altering the same line in the same file in two different branches:

```bash
# checkout to main branch
$ git checkout main

# create a new branch
$ git branch test-merge-conflict

# alter a file
echo "MAIN CHANGE" > test.txt

# confirm changes
$ cat test.txt

# stage and commit changes on rebase-test
$ git add test.txt && git commit --message "Main change for testing merge conflicts"

# cheange branch
$ git checkout test-merge-conflict

# alter a file
echo "TEST MERGE CONFLICT CHANGE" > test.txt

# confirm changes
$ cat test.txt

# stage and commit changes on rebase-test
$ git add test.txt && git commit --message "Test merge conflict change for testing merge conflicts"

# change to main
$ git checkout main

# check the history of all versions
$ git log --oneline --graph --decorate --all
# Output =>
# * 1f6921c (test-merge-conflict) Test merge conflict change for testing merge conflicts
# | * 7e3f1bc (HEAD -> main) Main change for testing merge conflicts
# |/
# | * 8c245f1 (rebase-test) Rebase-test commit
# |/
# * dc6c61c (test-from-old-commit) Main commit 2
# *   6c20b0f Three way merge - branch feature into branch main
# |\
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
# you can exit this command with q (for quit)

# merge test-merge-conflict into main
$ git merge test-merge-conflict
# Output =>
# Auto-merging test.txt
# CONFLICT (content): Merge conflict in test.txt
# Automatic merge failed; fix conflicts and then commit the result.

# check the status of your source code
$ git status
# Output =>
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
#
# Unmerged paths:
#  (use "git add <file>..." to mark resolution)
#	both modified:   test.txt
#
# no changes added to commit (use "git add" and/or "git commit -a")

# verify the files content
$ cat test.txt
# Output =>
# <<<<<<< HEAD
# MAIN CHANGE
# =======
# TEST MERGE CONFLICT CHANGE
# >>>>>>> test-merge-conflict
```

As you can see the content of the file looks like this:

```bash
<<<<<<< HEAD
MAIN CHANGE
=======
TEST MERGE CONFLICT CHANGE
>>>>>>> test-merge-conflict
```

This indicates that the change under  `<<<<<<< HEAD` comes from the currently checked out branch. In our case `main`, and the change bewteen `=======` and `>>>>>>> test-merge-conflict` comes from the branch `test-merge-conflict`.

### How To Resolve A Merge Conflict?

To resolve this we need to open a code editor and remove the meta data added by git `<<<<<<< HEAD`, `=======`, and `>>>>>>> test-merge-conflict`. Keep the changes that we want, either HEAD, incoming branch or both.

We will keep both, so edit your file that it looks like this:

```bash
MAIN CHANGE
TEST MERGE CONFLICT CHANGE
```

Next we need to add our files to the next commit and finalize the merge with a new commit.

```bash
# stage and commit changes
$ git add . && git commit
# Outputs =>
# Merge branch 'test-merge-conflict'
#
## Conflicts:
##       test.txt
##
## It looks like you may be committing a merge.
## If this is not correct, please run
##       git update-ref -d MERGE_HEAD
## and try again.
##
##
## Please enter the commit message for your changes. Lines starting
## with '#' will be ignored, and an empty message aborts the commit.
##
## On branch main
## All conflicts fixed but you are still merging.
##
## Changes to be committed:
##       modified:   test.txt

# if you edit this in vi(m)
# click CTRL + C
# enter :wq
# this stands for write and quit
# and hit enter

# check the history of all versions
$ git log --oneline --graph --decorate --all
# Output =>
# *   f6e9e12 (HEAD -> main) Merge branch 'test-merge-conflict'
# |\
# | * 1f6921c (test-merge-conflict) Test merge conflict change for testing merge conflicts
# * | 7e3f1bc Main change for testing merge conflicts
# |/
# | * 8c245f1 (rebase-test) Rebase-test commit
# |/
# * dc6c61c (test-from-old-commit) Main commit 2
# *   6c20b0f Three way merge - branch feature into branch main
# |\
# | * 8e5c144 (feature) Feature commit 2
# * | 1a609a0 Main commit
# |/
# * d773446 Feature commit
# * c262aca <your-message>
# * 351b716 <your message>
```

## How Do You Ignore Files in Git?

To ignore files in Git, you can create a **`.gitignore`** file in your repository (usually at the root of your project) and list the files or patterns to be ignored.

### What Is A .gitignore File?

The `.gitignore` file is a file that is used to automatically ignore files or directories that may exist at your local repository, but you do not want them to end up in your remote repository.

```bash
# create a .gitignore file
$ touch .gitignore

# write .env into .gitignore
# we want to have environment variables
# with API KEYS, URLs, ...
# but we do not want to commit them into our remote repository
$ echo ".env" >> .gitignore

# validate your .gitignore file
$ cat .gitignore
# Output =>
# .env

# now lets creat a .env file
$ touch .env

# check the status of our source code
# you will see that no .env file appears as untracked
# since git will ignore this file as it is in the .gitignore
$ git status
# Output =>
# On branch main
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
# 	.gitignore
#
# nothing added to commit but untracked files present (use "git add" to track)

```

## How Do You Handle Sensitive Data In Git?

Sensitive data should never be committed to a Git repository. Instead, use environment variables or separate configuration files not tracked by Git. You can use the `.gitignore` file to make sure your sensitive data is not committed to the remote repository.

## What Is A Tag in Git?

A tag in Git is a marker for a specific point in a repository's history, typically used to mark version releases.

### How Do You Tag A Git Commit?

To tag a Git commit:

```bash
$ git tag -a v1.0 -m "Version 1.0 release"
```

## Conclusion

In this article we learned the difference between a distributed  and a centralized version control system. You got introduced to Git, and can now use it to manage your source code. You know the three stages of a file - untracked, staged, and committed - and how to share this code with others via remote repositories. You learned about branching, merging and rebasing and can resolve merge conflicts when they occur.