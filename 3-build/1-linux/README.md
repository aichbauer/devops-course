# Linux

## What is Linux?

Linux is an open-source, Unix-like operating system kernel created by Linus Torvalds in 1991. It started as a personal project but quickly evolved into one of the most influential software innovations in history. Today, Linux serves as the backbone for countless devices and systems, from smartphones and servers to supercomputers and smart home devices.

### What is a Kernel?

A kernel is the core component of an operating system that acts as a bridge between hardware and software. It manages system resources like CPU, memory, and I/O devices, ensuring that applications and processes can run smoothly. In short, the kernel is the "brain" of the operating system, enabling it to function effectively.

#### In the Context of Operating Sytems, What is Not Part of the Kernel?

In the context of an operating system, not everything is considered part of the kernel. Here are components and elements typically not part of the kernel:

1. User applications - such as browsers, text editors, games
2. Utilities - such as shell interpreters (Bash, Zsh), or tools like `ls`, `grep`, `top`
3. Graphical User Interfaces
4. Network Applications - such as Webservers (Apache, Nginx)

The kernel is limited to managing system resources and facilitating communication between hardware and software. Anything operating outside this core functionality - typically in user space - is not considered part of the kernel.

### What is a Linux distribution?

A Linux distribution or distro is a complete operating system built around the Linux kernel, bundled with additional software like system tools, package managers, and applications. Think of it as Linux tailored for specific needs.

Each distribution offers a unique flavor of Linux, combining flexibility, security, and customization to suit a variety of users. It is like choosing a car: some of them have the same engine (Linux kernel), but different features, designs, and purposes!

### What are some Linux distributions?

* **Ubuntu**
* **Alpine**
* **CentOS**
* **Debian**

## What are software packages in Linux?

In Linux, a software package is a compressed file archive containing the files required to install a particular application, library, or component on the system.

### How do you manage software packages on Linux?

Linux provides tools for installing, updating, and removing software packages. Management varies slightly depending on the distribution but involves similar principles.

**APT (Advanced Package Tool)** is used in Debian-based distributions (e.g., Ubuntu):

```sh
# update the package list
sudo apt update

# upgrade installed packages
sudo apt upgrade

# search for packages
sudo apt search <keyword>

# install a package
sudo apt install <package_name>

# remove a package
sudo apt remove <package_name>

# clean up unused dependencies
sudo apt autoremove
```

## What are Users and Groups in Linux?

In Linux, users and groups manage permissions and security. Users and groups enforce access control, ensuring resources are secure and shared efficiently in Linux systems.

A user represents a person or process, identified by: `UID`, `Username`, `Home directory`. There are different type of users: `root` (superusers), `systemusers` (services, daemon) and `regular users`.

A group is a collection of users with shared access rights. Users have a primary group and can belong to secondary groups for resource sharing.

### What is a Daemon in Linux?

A daemon is a background process in Linux and other Unix-like systems that runs without direct user interaction. Daemons typically start at boot time and handle essential system or application tasks. Daemons are essential for system functionality, automating processes, and ensuring services run smoothly without requiring constant user input. Many daemon names end with a `d` (e.g., `httpd` for a web server, `sshd` for Secure Shell).

### How do you manage Users and Groups in Linux?

Managing users and groups in Linux is essential for maintaining a secure and organized system. Efficient user and group management ensures proper permissions, enhances security, and streamlines resource sharing in Linux systems.

#### Add a User

```sh
# change <username> to your username you want to add
sudo adduser <username>
```

#### Delete a User

```sh
# change <username> to your username you want to add
sudo deluser <username>
```

#### Modify a User

```sh
# change the password of a user
# change <username> to your username you want to add
# change <new-password> to your password you want to use
sudo usermod -p <new-password> <username>

# get all command options
sudo usermod -h
```

#### Add a Group

```sh
# change <groupname> to your groupname you want to add
sudo groupadd <groupname>
```

#### Delete a Group

```sh
# change <groupname> to your groupname you want to add
sudo groupdel <groupname>
```

#### Add a User to a Group

```sh
# change <username> to your username you want to use
# change <groupname> to your groupname you want to use
sudo usermod --append --groups <groupname> <username>
```

#### Remove a User to a Group

```sh
# change <username> to your username you want to use
# change <groupname> to your groupname you want to use
sudo usermod --remove --groups <groupname> <username>
```

## What is a file and a directory in Linux?

In Linux, a file is a collection of data, treated as anything from text and images to programs or system components - even hardware, directories and processes are represented as files.

A directory is a special type of file that organizes other files and directories into a hierarchical structure, starting from the root (/).

### How do you navigate the Linux File System?

To navigate the file system in Linux you have to know its tree like structure and the essential commmands.

Here is an excerpt of an ubuntu file structure:

```sh
/
├── bin         # Essential command binaries (e.g., ls, cp)
├── boot        # Boot loader files (e.g., GRUB, kernel)
├── dev         # Device files (e.g., /dev/sda)
├── etc         # Configuration files
│   ├── network # Network configurations
│   ├── ssh     # SSH configuration files
│   └── ...
├── home        # User home directories
│   ├── user1   # Home directory for user1
│   ├── user2   # Home directory for user2
│   └── ...
├── lib         # Essential shared libraries
├── media       # Mount points for removable media (e.g., USB drives)
├── mnt         # Temporary mount points
├── opt         # Optional application software
├── proc        # Virtual filesystem for system processes
│   ├── 1       # Process ID 1 information
│   ├── 2       # Process ID 2 information
│   └── ...
├── root        # Home directory for the root user
├── run         # Runtime variable data (e.g., PID files)
├── sbin        # System binaries (e.g., reboot, shutdown)
├── srv         # Data for services (e.g., web servers)
├── sys         # Virtual filesystem for system hardware
├── tmp         # Temporary files (deleted on reboot)
├── usr         # User-installed software and libraries
│   ├── bin     # Non-essential binaries for users
│   ├── lib     # Non-essential libraries
│   └── ...
├── var         # Variable files (e.g., logs, caches, spool)
│   ├── log     # System and application logs
│   ├── cache   # Application cache
│   └── ...
└── ...
```

Here are the most important commands for navigating the filesystem:

```sh
# Check your current location in the file system
# pwd: print working directory
pwd
# => /

# List the contents of a directory
# ls: list
ls
# => bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# Move into the 'etc' directory
# cd: change directory
cd etc
# List the contents of a directory
ls
# => alternatives            dpkg          host.conf     legal          opt         rc2.d        shadow       systemd .....................

# Go back to the parent directory
cd ..
# List the contents of a directory
ls
# => bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# Quickly return to your home directory
cd ~
# List the contents of a directory
ls
# Check your current location in the file system
pwd
# => /root

# OR
cd
# Check your current location in the file system
pwd
# => /root
```

To explore the the contens of files you can use the following commands:

```sh
# Display the contents of a file
# cat: concatenate
cat example.txt

# Show the first 10 lines of a file
head example.txt

# Show the last 10 lines of a file
tail example.txt
```

### How do you manage files and directories in Linux?

To manage files and directories in Linux you have to know a few commmands.

```sh
# Create a new file and a directory
# touch: touching a file
# mkdir: make directory
touch myfile.txt  # Creates an empty file
mkdir myfolder    # Creates a new directory

# Rename or move a file
# mv: move
mv myfile.txt mynewfile.txt  # Renames the file
mv mynewfile.txt myfolder    # Moves the file to the folder

# Copy a file or directory
# cp: copy
cp myfile.txt copyfile.txt         # Copies the file
cp --recursive myfolder newfolder  # Copies a directory (and its contents)

# Delete a file or directory
# rm: remove
rm copyfile.txt           # Deletes the file
rm --recursive newfolder  # Deletes the directory and its contents

```

### How do you search for files in Linux?

To search for files in Linux, you can use a few powerful commands.

```sh
# Search for files in real-time
# find: find files or directories
# Find a file by name
find /home -name file.txt  # Searches for file.txt in the /home directory

# Find a directory by name
find / -type d -name project  # Finds directories (-type d) named project starting from the root

# Find files larger than a specific size
# M: Megabyte, k: kilobyte
find /var -size +10M  # Finds files larger than 10MB in the /var directory

# Find files modified in the last 7 days
# mtime: modification time
find /tmp -mtime -7  # Finds files modified in the last 7 days in the /tmp directory
```

### How do you edit Files in Linux?

Most Linux distributions come with at least one editor (e.g., `nano`, `vi` or `vim`) preinstalled. On docker images you try to minimize the image size, and so these images often come without a preinstalled editor.

Change file content without an editor (`nano`, `vi` or `vim`):

```sh
# if you really need to make a small change you could use cat and sed
# replace <filename> with the actual file you want to change
# cat: concatinate
# sed: stream editor
cat <filename>                                  # get the content of the file, now copy the line you want to change
# the s in 's/oldtext/newtext/' stands for substitute
sed --in-place 's/oldtext/newtest/'<filename>  # replace oldtext with newtext in <filename>
```

Install `nano` or `vim` and edit the files:

```sh
# Update the package list (optional but recommended)
sudo apt update

# Install nano or vim
sudo apt install nano
sudo apt install vim

# Editing a file with nano
nano <filename>  # Replace <filename> with the actual file name

# Editing a file with vim
vim <filename>  # Replace <filename> with the actual file name

# In nano:
# - Make your edits.
# - Press Ctrl+O to save, then Enter.
# - Press Ctrl+X to exit.

# In vim:
# - Press "i" to enter insert mode and make your edits (i: insert)
# - Press Esc to exit insert mode.
# - Type ":wq" and press Enter to save and exit (wq: write quit)
```

### How do you manage file permissions in Linux?

File permissions in Linux control who can read, write, or execute a file or directory.

Each file or directory has three levels of permissions:

* **Read (r)**: View the contents of the file.
* **Write (w)**: Modify the contents of the file.
* **Execute (x)**: Run the file as a program or script.

Permissions are grouped into three categories:

* **Owner**: The user who owns the file.
* **Group**: Users in the file's group.
* **Others**: All other users.

Use the `ls -l` (list long) command to view file permissions:

```sh
ls -l filename
# => -rw-r--r-- 1 user group 1234 Nov 25 10:00 filename
```

* **-rw-r--r--**:
   - **-**: indicates a regular file
      - **-**: file
      - **d**: directory
      - **l**: symbolic link
      - **b**: block device (e.g., hard drive, USB)
      - **c**: character device (e.g., keyboard, terminal)
   - **rw-**: Owner has read and write permissions.
   - **r--**: Group has read-only permissions.
   - **r--**: Others have read-only permissions.

The `chmod` command changes the permissions of a file or directory.

```sh
# change the permission on a file or directoy
# chmod: change mode
# change <filename> to the actual filename you want to change
# set [who][operator][permissions] according the explaination below
chmod [who][operator][permissions] <filename>
```

* **Who:**
   * **u**: Owner
   * **g**: Group
   * **o**: Others
   * **a**: All (owner, group, others

* **Operators:**
   * **+**: Add a permission
   * **-**: Remove a permission
   * **=**: Set exact permissions

```sh
# Add execute permission for the owner
# change <filename> to the actual filename you want to change
chmod u+x <filename>

# Remove write permission for the group
# change <filename> to the actual filename you want to change
chmod g-w <filename>
```

You can also use a numeric expression for setting the permissions:

* **Numeric Mode**: Permissions are represented by numbers:
   * **4**: Read
   * **2**: Write
   * **1**: Execute

* **Combine these values to set permissions**:

* **7 (4+2+1)**: Read, Write, Execute
* **6 (4+2)**: Read, Write
* **5 (4+1)**: Read, Execute
* **4**: Read-only

```sh
# setting a file to
#  - read, write, execute for the owner
#  - read, execute for the group
#  - read, execute for the others
# change <filename> to the actual filename you want to change
chmod 755 <filename>

# To apply permissions to all files and subdirectories:
#  - read, write, execute for the owner
#  - read, execute for the group
#  - read, execute for the others
# change <directoryname> to the actual directoryname you want to change
chmod --recursive 755 <directoryname>
```

## What is a process in Linux?

In Linux, a process is an instance of a running program. It is a fundamental concept in operating systems, representing a running instance of executable code. Each process has:

* A unique Process ID (PID).
* An associated user who owns the process.
* A specific priority and state.
* A parent process, as Linux uses a hierarchical structure for process management.

### How do you manage processes in Linux?

Whenever you start a programm or execute code you will spawn at least one new process.

For example, the apache2 web server will start multiple processes:

```sh
# install apache web server
sudo apt update
sudo apt install apache2

# see all running services
sudo service --status-all
# => [ - ] apache2

# start service apache2
sudo service apache2 start

# verify apache2 has started
sudo service --status-all
# => [ + ] apache2
sudo service apache2 status
# => [ + ] apache2

# stop apache2
sudo service apache2 stop
```

#### Using systemctl

Docker containers are typically designed to be minimal, which means you likely will not find the `systemctl` command, a key component of the `systemd` service. The `systemctl` command provides more details about services and processes. If your host system has `systemd` installed and was booted using it, you can use the commands to manage processes:

```sh
# see all running services
sudo systemctl list-units --type=service

# start service apache2
sudo systemctl start apache2.service

# verify apache2 has started
sudo systemctl list-units --type=service
sudo systemctl status apache2.service

# stop apache2
sudo systemctl stop apache2.service
```

### How do you monitor a process on Linux?

There are multiple ways to monitor processes:

```sh
# list all processes
# ps: process status
# a: all users
# u: user-friendly format
# x: include processes not attached to a terminal
ps aux

# real-time system and process monitoring
# top: table of processes
top
```

### How do you find a process in Linux?

You can use `grep` to find processes by name:

```sh
# Use ps and grep to find processes
ps aux | grep process_name
# Output =>
## root      3469  0.0  0.0   8888  4812 ?        Ss   08:29   0:00 /usr/sbin/apache2 -k start
## www-data  3472  0.0  0.0 2001684 3788 ?        Sl   08:29   0:00 /usr/sbin/apache2 -k start
## www-data  3473  0.0  0.0 2001684 3792 ?        Sl   08:29   0:00 /usr/sbin/apache2 -k start
## root      3585 33.3  0.0   3124  1372 pts/0    S+   08:51   0:00 grep --color=auto apache2

# Find processes by name
pgrep process_name
# Output =>
## 3469
## 3472
## 3473
```

You can use `lsof` to which processes occupy which ports:

```sh
# install lsof
sudo apt update
sudo apt install lsof

# find process on port
# lsof: list open files
# -i: internet address
lsof -i :80
# Output =>
## COMMAND  PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
## apache2 3469 root    3u  IPv4 15134402      0t0  TCP *:http (LISTEN)
```

### How do you stop a process on Linux?

To stop a process on Linux, you can use various commands depending on how you want to terminate it. Below are the most common methods.

#### How to stop a process by process ID

```sh
# gracful termination of a process (SIGTERM)
kill <PID>

# forceful termination of a process (SIGKILL)
kill -9 <PID>
```

#### How to stop all processes by process name


```sh
# gracful termination of all processes matching a name (SIGTERM)
pkill <process_name>

# forceful termination of all processes matching a name (SIGKILL)
pkill -9 <process_name>
```

## What is a service in Linux?

In Linux, a service is a program or process that runs in the background and performs specific tasks, often without requiring direct user interaction. Services are typically used to handle system-level functions such as networking, logging, but can also be used to provide support for your own applications (e.g., web servers, databases).

Services are sometimes referred to as daemons. A daemon is a programm that runs detached from any terminal as a background process. They often have names ending in `d` (e.g., `sshd`, `httpd`, `crond`).

### How do you start a service in Linux?

Take a look at [How to Manage Processes in Linux](#how-do-you-manage-processes-in-linux)

### How do you stop a service in Linux?

Take a look at [How to Manage Processes in Linux](#how-do-you-manage-processes-in-linux)

## What is a cron job in Linux?

A cron job in Linux is a scheduled task or script that is automatically executed at specified intervals or times. It is managed by the cron daemon, a time-based job scheduler.

**Key Components of a Cron Job**:

1. Cron Daemon (`crond`): The background service responsible for running scheduled tasks.
2. Crontab File: A configuration file where the schedule and commands are defined.

### How do you add a cron job in Linux?

Adding a cron job in Linux involves editing the crontab file (a file that specifies scheduled tasks).

```sh
# if you testing in a minimal docker ubuntu container install a editor and cron
apt update && apt install cron nano -y
service cron start

# 1. Open the Crontab File
# -e: editor
crontab -e

# 2. Add a New Cron Job
# <minute>: (0–59) Minute of the hour.
# <hour>: (0–23) Hour of the day.
# <day>: (1–31) Day of the month.
# <month>: (1–12) Month of the year.
# <day_of_week>: (0–7) Day of the week (0 or 7 is Sunday).
# <command_to_run>: The script or command you want to execute.
<minute> <hour> <day> <month> <day_of_week> <command_to_run>
```

Here are examples:

```sh
# Run a script every minute
* * * * * /path/to/script.sh

# Run a script once a day at 2:30 AM
30 2 * * * /path/to/script.sh

# Run a script every Sunday at 6:00 AM
0 6 * * 0 /path/to/script.sh

# Run a script every 5 minutes
*/5 * * * * /path/to/script.sh

# Run a script at midnight on the 1st of every month
0 0 1 * * /path/to/script.sh

# you can specify a command dircetly in the crontab
# this would add a line of Hello World
# to the file /test.log every minute
* * * * * echo "Hello World" >> /test.log
```

### How do you remove a cron job in Linux?

To remove a cron job from the user's crontab in Linux you can use the `crontab` command:

```sh
# if you testing in a minimal docker ubuntu container install a editor and cron
apt update && apt install cron nano -y
service cron start

# open the cronteb file
crontab -e
# 1. now find the line containing the cronjob you want to delete
# 2. delete or comment out the line (by adding a # at the beginning of the line)
# 3. save and exit the editor
```

## What is compression in Linux?

Compression in Linux refers to the process of reducing the size of files or directories. This is done to save disk space or to make data transfer faster. Linux provides tools and utilities like `gzip`, and `tar` to perform compression and decompression.

### How do you archive files and directories in Linux?

1. **1. tar (Tape Archive)**

```sh
# basic syntax for creating an archive
# order of flags is important
# -c: create a new archive
# -v: verbose output, shows progress
# -f: specify the archive file name
# replace <archive_name> with the name for your archive
# replace <files_or_directories> with all the files and directories you want to include in the archive
tar -cvf <archive_name>.tar <files_or_directories>

# e.g.
tar -cvf archive.tar file1 file2 directory/

# basic syntax for extracting an archive
# order of flags is important
# -x: extract files from an archive
# -v: verbose output, shows progress
# -f: specify the archive file name
# replace <archive_name> with the name for your archive
tar -xvf <archive_name>.tar


# e.g.
tar -xvf archive.tar


# archive and compress with gzip
# order of flags is important
# -z: compression gzip
tar -xzcf <archive_name>.tar.gz <files_or_directories>

# e.g.
tar -czvf archive.tar.gz file1 file2 directory/

# extract from a compressed archive
# order of flags is important
# -z: compression gzip
tar -xzvf <archive_name>.tar.gz

# e.g.
tar -xzvf archive.tar.gz
```

## What is a firewall

A firewall in Linux is a security feature that monitors and controls incoming and outgoing network traffic based on predefined security rules. It is used to protect Linux systems from unauthorized access, network attacks, and other malicious activities by controlling the flow of network packets.

Firewalls in Linux are based on the Netfilter framework, which is built into the Linux kernel. This framework provides the functionality for filtering and manipulating network traffic.

Linux provides several tools for managing firewalls, some of which are part of the Netfilter framework.

* iptables
* nftables
* ufw (Uncomplicated Firewall)

### Set up a Firewall in Linux using ufw

> Note: to use ufw inside the docker container you need to add the `--cap-add=NET_ADMIN` option (e.g., `docker run --cap-add=NET_ADMIN -u root -it ubuntu bash`). Only for demonstration purposes

```sh
# install ufw
apt update && apt install ufw

# enable the firewall
ufw enable

# start the firewall
service ufw start

# allow tcp traffic from prot 80
ufw allow 80/tcp
# or
ufw allow http

# allow tcp traffic from prot 443
ufw allow 443/tcp
# or
ufw allow https

# allow tcp traffic from prot 22
ufw allow 22/tcp
# or
ufw allow ssh
```

