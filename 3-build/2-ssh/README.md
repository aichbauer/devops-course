# Secure Shell (SSH)

## What is SSH?

**Secure Shell (SSH)** is a cryptographic protocol enabling secure access and management of devices over **unsecured networks**. It encrypts communication, protecting sensitive data like passwords and commands from interception. SSH supports secure authentication methods and port forwarding for tunneling other network services. Widely used in server management, automation, and secure Git operations, SSH is valued for its simplicity, reliability, and robust security features, making it essential for IT professionals and developers.

### What is an unsecured network?

An unsecured network is one that lacks proper security measures to protect data transmitted between devices. These networks, such as public Wi-Fi or poorly secured private networks, often lack encryption and user authentication, making them vulnerable to attacks like data interception, packet sniffing, and man-in-the-middle attacks.

### What is Port Forwarding and Tunneling?

Tunneling is a technique used to direct network traffic from one device to another through an intermediary, often over a secure channel like SSH. This is essential for securely accessing services and applications on remote machines without exposing them directly to the public internet. Port forwarding redirects communication from a specific port on one device to another port on a different device. This allows users to access internal or restricted services as though they were local to their machine.

### How do you prepare a server for SSH connections?

Preparing a server for SSH connections involves setting up the necessary tools and security configurations to allow secure remote access.

1. Verify that the SSH Server is installed

```sh
# check the status of the ssh service
sudo systemctl status ssh
```

2. If there is no SSH Server installed, install it via a package manager (apt on ubuntu)

```sh
# update the local package index (a database with all versions of packages)
sudo apt update
# install the package openssh-server
sudo apt install openssh-server
```

3. Start the service and enable it when booting the system

```sh
# start the service
sudo systemctl start ssh
# enable it, so the service automatically starts on a system reboot
sudo systemctl enable ssh
# check the status of the ssh service
sudo systemctl status ssh
```

### How do you configure SSH on a client system?

Configuring SSH on a client system involves setting up the tools and credentials required to connect securely to an SSH server.

1. Verify if a SSH Client is installed

```sh
# check if there is an ssh client installed
ssh -Version
```

2. If no SSH Client is installed, install it via a package manager (apt  on ubuntu)

```sh
# update the local package index (a database with all versions of packages)
sudo apt update
# install the package openssh-client
sudo apt install openssh-client
# verify the installation
ssh -Version
```

## How do you connect to a server with a password?

To connect to a server with a password, open a terminal or SSH client and use the command:

```sh
# connect to a remote host
# replace <username> with your real username from the server
# replace <server-ip> with the ip address of your server
ssh <username>@<server-ip>
```

Enter the server password when prompted.
The first connection will require confirmation of the server's
authenticity. Once authenticated, you'll access the server's command line for remote management.

```sh
# first connection to the remote host, ssh will ask you, if you trust this host
# type `yes` if it is the correct ip address
The authenticity of host 'server-ip (xx.xx.xx.xx)' can't be established.
ECDSA key fingerprint is SHA256:random_string.
Are you sure you want to continue connecting (yes/no)?
```

## How do you connect to a server using a public/private key pair?

Using a public/private key pair is one of the most secure ways to connect to a server via SSH.
Instead of relying on passwords, this method uses cryptographic keys, offering enhanced security and convenience.

To connect to a server with a public key, open a terminal or SSH client and use the command:

```sh
# connect to a remote host
# replace <username> with your real username from the server
# replace <server-ip> with the ip address of your server
ssh -i ~/.ssh/id_rsa <username>@<server-ip>
```

The first connection will require confirmation of the server's authenticity.

### What is a key pair?

A key pair in the context of SSH is a set of two cryptographic keys used to authenticate and secure communication between a client and a server. The pair consists of:

1. **Public Key:** This key can be shared freely. It is placed on the server in a special file, allowing it to recognize and validate the corresponding private key.
2. **Private Key:** This key is kept secret and stored securely on the client system. It must never be shared or exposed, as it is used to prove the identity of the client during authentication.

#### How Does a Key Pair Work?

Key pairs rely on asymmetric encryption, where the two keys are mathematically linked but cannot derive one from the other. Here’s how they interact:

When you connect to the server, the SSH protocol uses the private key to sign a message.
The server validates the signature using the public key.
If the keys match, the server grants access.

#### How do you generate a key pair?

On a client system, you can generate a key pair using the ssh-keygen command:

```sh
ssh-keygen
```

* The private key is stored (e.g., ~/.ssh/id_rsa) and must remain confidential. Never share this key with anyone.
* The public key (e.g., ~/.ssh/id_rsa.pub) is copied to the server. This key can be shared with anyone.

#### How do you add the public key on the server?

Adding a public key to a server allows the server to authenticate your SSH connections using key-based authentication.

The easiest and most common way to add a public key to a server is by using the ssh-copy-id command:

```sh
# replace <username> with your real username from the server
# replace <server-ip> with the ip address of your server
ssh-copy-id <username>@<server-ip>
```

This command copies your public key to the server and appends it to the ~/.ssh/authorized_keys file in the user’s home directory.

If the file or directory doesn’t exist, it creates them automatically with the correct permissions.

#### How do you configure the server with key-based authentication?

Configuring key-based authentication on your server is a step in enhancing its security while streamlining your login process. By replacing traditional password authentication with public key authentication, you eliminate vulnerabilities like brute force attacks.

```sh
# open the ssh configuration file
sudo nano /etc/ssh/sshd_config
```

Locate and modify the following setting:

```txt
PubkeyAuthentication yes
```

If the setting is set to `PubkeyAuthentication no` change it to `yes`. After making this change, save the file and restart the SSH service to apply the changes:

```sh
# restart the ssh service
sudo systemctl restart sshd
```

Before you disable the password authentication, make sure to test your SSH connection after this to confirm everything is set up correctly.

## How do you set up a firewall to allow SSH?

Configuring your firewall to allow SSH is a critical step to ensure secure access to your server while protecting it from unauthorized connections. By default, SSH listens on port 22. If you have configured a custom SSH port (e.g., 2222), change it in the commands below.

This is how you configure your firewall for SSH on Ubuntu using UFW.

> Note: to use ufw inside the docker container you need to add the `--cap-add=NET_ADMIN` option (e.g., `docker run --cap-add=NET_ADMIN -u root -it ubuntu bash`). Only for demonstration purposes

```sh
# this will allow ssh traffic on prot 22
sudo ufw allow ssh
# if you use a custom port e.g. 2222 use
sudo ufw allow 2222/tcp
# you need to enable the new firewall rules
sudo ufw enable
# verify your firewall rules
sudo ufw status
```

## How do you debug SSH connection issues?

To debug issues with an SSH connection, start with running the SSH command with verbose output to get detailed information about the connection process:

```sh
# connect to the server with verbose (-v) output
# replace <username> with your real username from the server
# replace <server-ip> with the ip address of your server
ssh -v <username>@<server-ip>
# use -vv or -vvv for even more verbose output
```
