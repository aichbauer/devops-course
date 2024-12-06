## What is Docker?

Docker is an open-source platform that enables developers to build, deploy, and manage applications within lightweight, portable containers. Containers are self-contained environments that package an application and all its dependencies, ensuring consistency across various systems and environments.

### **Difference Between a Container and a Virtual Machine**

Containers and virtual machines (VMs) are both technologies for running isolated environments for applications. However, they differ significantly in architecture, resource usage, and performance.

| **Feature**               | **Containers**                                                 | **Virtual Machines (VMs)**                                     |
|----------------------------|---------------------------------------------------------------|----------------------------------------------------------------|
| **Definition**             | Lightweight runtime environments that package an application and its dependencies. | Fully virtualized systems that emulate entire operating systems. |
| **Isolation Level**        | Process-level isolation using the host OS kernel.             | Full OS-level isolation with a guest operating system.         |
| **Size**                   | Small (typically megabytes) because they share the host OS kernel. | Large (typically gigabytes) because each VM has its own OS.    |
| **Startup Time**           | Very fast (seconds) because there’s no need to boot an OS.    | Slower (minutes) as the guest OS needs to boot.                |
| **Resource Usage**         | Minimal overhead; shares resources with the host OS.          | High overhead; requires dedicated resources for the guest OS.  |
| **Portability**            | Highly portable across different environments.                | Less portable; depends on the hypervisor and OS compatibility. |
| **Management**             | Managed using container platforms like Docker or Kubernetes.  | Managed using hypervisors like VMware, VirtualBox, or KVM.     |
| **Use Case**               | Ideal for microservices, CI/CD pipelines, and lightweight applications. | Best for running multiple OS instances. |

### **Key Differences in Architecture**

1. **Kernel Sharing vs Full OS Virtualization**
   - **Containers** share the host system’s kernel and isolate applications at the process level.
   - **VMs** run a full guest operating system, which includes its own kernel and system processes.

2. **Resource Efficiency**
   - Containers are much more resource-efficient because they only include the application and its dependencies, avoiding the overhead of a full OS.
   - VMs require dedicated resources for the guest OS and are heavier to run.

3. **Deployment**
   - Containers are quicker to deploy and can be spun up in seconds.
   - VMs take longer to start because they involve booting a separate OS.

### **When to Use Containers vs Virtual Machines**

#### Use Containers When:
- You need lightweight, fast, and scalable environments.
- You’re working with microservices or cloud-native applications.
- Resource efficiency is a priority.

#### Use Virtual Machines When:
- You need to run different operating systems on the same hardware.
- You require full OS isolation for security or compliance reasons.
- You’re running applications that aren’t compatible with the host OS.

## What Is The Difference Between A Dockerfile, An Image And A Container?

All these things build on top of each other. You need a Dockerfile to create an image, and you need an Image to create a Container.

- **Dockerfile:** The first step in using Docker is writing a Dockerfile. It is an essential blueprint for constructing Docker images. This text file is usually named “Dockerfile” without any extension. It contains a series of instructions. Each line in this file represents a new instruction, forming a stack of layers. Each layer is cacheable. When you build an image twice it will use the cache. When you change a line, it rebuilds all instructions after and including the change.
- **Image:** Building a Dockerfile outputs a Docker image. You can think of an image like an executable. Clicking an icon (executable) on your desktop to launches an application. Starting an image will create a container. The Docker image encapsulates your application code and all its dependencies. This includes the runtime and systemlibraries. It is a self-contained unit that ensures consistency and portability across various environments. For example, your development machine and your production server.
- **Container:** This is a dynamic, running instance of a Docker image. An executed image spawns a container with the command in the Dockerfile. Important to note: one image can give life to many containers.

The Dockerfile is the base for an image. You can run an image to create a container.

## How To Create A Dockerfile?

To generate a Dockerfile you can create a plain text file. This article will use the command line for it:

```bash
# create a new file in your current working directory called Dockerfile
$ touch Dockerfile
# open the file in your favorite editor (we are using Visual Studio Code)
# if you do not have the code command installed, you will need to open it manually
$ code Dockerfile
```

A Dockerfile holds all the instructions to start or run your application. Every command that you otherwise need to execute manually in a single file. It starts by using a base image. This is usually a small Linux distribution like alpine. If you need to execute a binary, use scratch. This article uses an Express.js server, so it uses an alpine image configured for Node.js. You can view the complete code on GitHub.

Now we will edit the Dockerfile in Visual Studio Code:

```docker
# the next line sets the base image for this image
# the base image is also based on an Dockerfile
# see: https://hub.docker.com/layers/library/node/18-alpine/images/sha256-a0b787b0d53feacfa6d606fb555e0dbfebab30573277f1fe25148b05b66fa097
# node provides offical images for nodejs and
# alpine: a lightweight Linux distribution to reduce image size
FROM node:18-alpine

# sets the working directory inside the image
# all commands after this insturction will be
# executed inside this directory
WORKDIR /app

# copies the package.json and package-lock.json
# from the client (e.g. your server or your development machine)
# into the /app directory inside the image
# before running npm ci to
# get the advantage of layer caching
COPY ./package* .

# installs all node.js dependencies
# npm ci is similar to npm install but intended to be
# used in continuous integration (CI) environments
# it will do a clean install based on the package-lock.json
RUN npm ci

# copies the source code into the image
COPY . .

# this runs the build command specified in the package.json
RUN npm run build:server

# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 3000

# executes the server.js file that is located in the build directory
CMD node ./build/index.js

```

### What Is A Multistage Dockerfile?

You can compose a Dockerfile with many stages. You can think of one stage, as one image. You can then use materials like files from one stage in another stage. A new stage always starts with the line `FROM <base-image>`. You name a stage using the "as" keyword. This article uses a simple HTML and JavaScript file as our client application. As a webserver we will use nginx. You can view the complete code on GitHub.

A typical approach is to have a build stage, with a larger base image. This image holds all executables and libraries needed to build your source code.

The second stage is the serve stage and has a small base image. The benefit is fewer dependencies and libraries. Enough to execute and serve your application.

With this approach, you make your image both smaller and more secure. As the image size decreases and the image consists of fewer libraries. Fewer system libraries means it has a lower attack surface. Multistage Dockerfiles are not limited to this use case and can have more than two stages as well.

```bash
# lets create a new Dockerfile for our frontend application
# as we can specify a file in the build command we name this Dockerfile.client
$ touch Dockerfile.client
# open the file in your favourite editor (we are using visual studio code)
# if you do not have the code command installed, you will need to open it
$ code Dockerfile.client
```

Here is an example of a multistage app:

```docker
# the base image
# name it builder
# you can reference this stage
# in other stages by this name
FROM node:18-alpine as builder

# working directory inside the image
WORKDIR /app

# copies files from the client to the image
COPY ./package* .

# run a command inside the image
RUN npm ci

# copies files from the client to the image
COPY . .

# run a command inside the container
# this will create a new folder in called dist in our app directory
# inside dist directory you will find the
# final HTML and JavaScript file
RUN npm run build:client

# serve stage
# slim nginx base image named as serve
FROM nginx:1.19.10-alpine as serve

# we can now copy things from the first stage to the second
# we copy the build output to the directory where nginx serves files
COPY --from=builder /app/dist /var/www

# we overwrite the default config with our own
# if you take a look at the GitHub repository, you
# see the .nginx directory with the nginx.conf
# here we only use the port 80
# in production, you would also want to make sure
# all requests, even in your internal network or Kubernetes cluster
# is served via HTTPS when dealing with sensible data
COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 80

# The command used when the image is started as container
# Note: for Docker containers (or for debugging),
# the "daemon off;" directive which is used in this example
# tells nginx to stay in the foreground.
# for containers, this is useful.
# best practice: one container = one process.
# one server (container) has only one service.
CMD ["nginx", "-g", "daemon off;"]

```

## How To Create A Dockerimage?

We use the Docker CLI to build images out of our Dockerfiles.

```docker
# list the directory to make sure you are in the directory with the Dockerfile
$ ls
# if not, change the directory with "cd ./path/to/directory-with-Dockerfile"
# build an Image out of the Dockerfile in the current working directory
$ docker build .
# if you want to build another Dockerfile in this directory, use the --file flag
# e.g. --file <filename>
$ docker build --file Dockerfile.client .
```

Creating an image from a Dockerfile only requires this. Without specifying a name and tag, you can reference the image only by its image ID.

### How To List All Images?

```docker
# list all local images on the client (your server or your development machine)
$ docker image ls
# find your image id
```

If you want to name your image, you need to use the --tag flag while building the image. You will need this if you are working with a registry like Docker Hub.

### How To Name Your Images?

To name and tag your image, use the following pattern: <name>:<tag>. This is usually translated into <username>/<repository>:<version>. The username corresponds to the username of the registry.

```docker
# build and tag your image
# a tag consists of a name and a tag which is seperated by a colon (:)
$ docker build --tag examplename/examplerepository-server:0.1.0 .
# or
$ docker build --file Dockerfile.client --tag examplename/examplerepository-client:0.1.0 .
# list all local images
$ docker image ls
# you will see your image with a proper repository name and a tag
```

## How To Create A Container?

A container is a running Image. You can run images with the docker CLI command docker run <image-name>:

```docker
# start our image
$ docker run examplename/examplerepository-server:0.1.0
# or
$ docker run examplename/examplerepository-client:0.1.0
```

Every docker installation comes with a local registry. Docker stores your images here. First, the docker run command will look at the local registry and try to find the image. This will happen with our image, since we built it on the same machine we are executing the docker run command. If it does not find the image locally, it will take a look at the docker hub registry. You can also get images from other registries (e.g., your self-hosted registry). For that, you can use the URL of the self-hosted registry.

```docker
# try to find an image on another registry
$ docker run https://registrydomain.com/examplename/examplerepository-server:0.1.0
```

If you run an image, it starts in a foreground process. The container is running in the terminal where you executed the docker run command. If you kill the terminal, it will stop the container immediately. To let your container run on your machine or server, you can run the container as a background process. In that way, you can close your terminal with no worries.

### How To Run Containers In The Background?

The detached will start containers run in a background process:

```docker
# run container in the background
$ docker run --detached examplename/examplerepository-server:0.1.0
# or
$ docker run --detached examplename/examplerepository-client:0.1.0
```

You will see that the command will exit, and you can use the terminal again.

### How To List All Containers?

Docker will only show the running containers.

```docker
# list all running containers
$ docker conatiner ls
# short
$ docker ps
```

If you want to see all containers, even the stopped containers, you need to pass the flag -a or —all.

```docker
# list all stopped and running containers
$ docker container ls --all
```

### How To Stop And Remove Containers?

Sometimes you want to stop containers. When you stop containers they are still on the system, you can start them again. If you want to clean the container from the system you will need to remove it. You can only remove a stopped container.

```docker
# stop a container
$ container stop <container-id>
# start a container
$ container start <container-id>
# restart container
$ container restart <container-id>
# remove a stopped container
$ container rm <container-id>
```

Occasionally, you want to stop containers. When you stop containers, they are still on the system, you can start them again. If you want to clean the container from the system, you will need to remove it. You can only remove a stopped container.

```docker
# automatically remove a container after it stops
$ docker run --rm examplename/examplerepository-server:0.1.0
# or
$ docker run --rm examplename/examplerepository-client:0.1.0
```

### What If I Killed The Terminal But The Container Is Still Running?

Sometimes signals are not passed to the container properly. Imagine you have killed your terminal because you could not stop the container with `CTRL+C`. But If you try to restart the container, it tells you that the port is already allocated. This means your old container is still running. To kill a container, run the following command:

```bash
# kill a container
$ docker kill <conatiner-id>
```

### How To Access Containers From The Host System?

Usually, a docker container exposes one or many ports. You can access the application which is running inside the container via those ports. To have access to these ports, you need to publish those port during the container creation. Another way to access containers from the host system is by executing commands inside them. This is often used for debugging or single use container application.

### How To Publish Ports?

To expose the ports to the host system, you need to add the -p or —publish flag.

```docker
# publish ports, e.g. forward container port to a port on the hostsystem
$ docker run --publish 3000:3000 examplename/examplerepository-server:0.1.0
# or
$ docker run --publish 80:80 examplename/examplerepository-server:0.1.0
# if you run both container the server and the client
# and you visit the localhost:80 in your browser
# you should see the message Hello World
```

In the first example above, we bind the port 3000 from the container to the port 3000 on the host system. The host system is your development machine or your server. The format is the following --publish <hostport>:<containerport>.

### How To Access A Running Container?

Sometimes, you want access to a container. This can be beneficial for debugging.

```docker
# access the conatiner
$ docker exec -it <container-id> <shell-command>
```

`it` instructs Docker to allocate a pseudo-TTY connection. In this way, the containers' stdin (standard input) creates an interactive shell in the container.

You can execute any command that would be possible within the container. If you have a Debian container running, you would be able to list the directory:

```docker
# list the directory inside the container
$ docker exec -it <container-id> ls
```

You can even create a secure shell like connection with the following command:

```docker
# SSH into the container (if the `sh` command exists in the container)
$ docker exec -it <container-id> sh
# this will keep the connection to the container open
# and you can execute multiple commands within the container
# to exit the container run the following
$ exit
```

## How To Persist Data With Docker Volumes?

Data that is stored inside a container is not persisted by default. When you stop and remove a container, all data from this container is lost. In our application, if you click the button on the website ([http://localhost:80](http://localhost/)) we will write “New message” into a JSON file inside the container. Now if we stop and remove the container, all those messages are deleted as well. If you want to persist data between container starts, you need to use volumes. There are two different volume types: named volumes and mounted volumes. Named volumes are completely handled by docker, a mounted volume is managed by you. For a mounted volume, you need to specify the location on the host system where this data will be stored.

```docker
# using a named volume
# everything within this path of the container will be stored
# in a volume named <colume-name>
$ docker run --volume <volume-name>:/path/in/container <image-name>

# using a mounted volume
# everything inside the path of the container will be stored 
# in the path of the host
$ docker run --volume /path/on/host:/path/in/container <image-name>
```

For our application we need to use the following command for the server container:

```bash
# create a volume called server-volume
# we store the content of /app/build/data within our container
# on our host machine (your dev machine or your server)
docker run --volume server-volume:/app/build/data --publish 3000:3000 examplename/examplerepository-server:0.1.0
```

### How To List All Volumes?

You can get an overview of all volumes and their metadata by listing them.

```docker
# list all volumes
$ docker volume ls

# here you will see the location where docker will store the named volumes
# on the host machine
```

## What Is Docker Compose?

“Docker Compose is a tool for defining and running multi-container Docker applications.” It is used to configure and manage application services, networks, and volumes.

Compose uses text files and YAML as configuration language to manage multi-container applications. This tool simplifies the deployment and scaling of applications. It allows you to define a set of related Docker containers that can be controlled together.

## What Is The Difference Between Docker and Docker Compose?

Docker is the tool that allows you to build images, start containers, create volumes, and networks.

Docker Compose is the tool that helps you to manage multiple containers. This includes building images, running containers. It will also help to set up volumes and networks for containers to communicate.

Docker Compose utilizes Docker to manage multiple containers. All with a single file and a single CLI command.

## Why Do You Need Docker Compose?

Working with multiple containers at the same time can be complicated and complex. When you work with a single container, using Docker itself is just fine. But soon you will realize your application needs other services. For example, a database, an in-memory cache, a message queue, a storage bucket. I could go on with this list for a long time.

Managing all these containers with Docker alone would be complicated and difficult. You would need to manage each container on its own. This is where Docker Compose is beneficial. It simplifies the configuration and management of multiple containers.

## What Is A docker-compose.yaml?

This YAML file defines how Docker containers should operate in a multi-container setup. It is the foundation of Docker Compose. The single point for configuring and managing all components in a multi container setup. In this YAML file we define our services, volumes and networks.

### What Is A Service In Docker Compose?

**Services** are containers that you would like to start. These containers are your applications. They vary from scripts, databases, web applications, web servers, and many more. In this article, we will use container and service interchangeably.

### What Is A Volume In Docker Compose?

**Volumes** are used to persist data. These are directories that can be mounted onto containers.  Volumes provide the same information (files) every time. Even when the container is removed.

### What Is A Network In Docker Compose?

**Networks** are used for communication between containers. It enables isolated Docker containers to exchange information in a controlled and secure manner.

### How Do You Write A docker-compose.yaml?

We are creating a `docker-compose.yaml` for an application that consists of two containers. A backend application and a web frontend. Throughout this article, we implement a third container. This container is a Postgres database, where we will persist our data. We will connect the Postgres container to a volume, to not lose our data, when we remove a container and start a new one. To enable our backend container to communicate with the Postgres container, we use a network. You will find the complete source code used in this article on GitHub.

```bash
# change directory to the root of our application
$ cd /path/to/the/application/root
# now we create an empty file called docker-compose.yaml
$ touch docker-compose.yaml
```

The `docker-compose.yaml` has at its top level 6 main keywords. In this article will focus only four of them: `version`, `services`, `volumes`, `networks`.

```yaml
# string that represents the version of docker compose used
# for backwards compatibility and just informational
version: '3'

# an object where each key represents a new service
# e.g., your client application, web server, database, ...
services:
	client:
		# define your client
		# e.g., image, ports, environment variables, networks, volumes, ...
	server:
		# define your server
		# e.g., image, ports, environment variables, networks, volumes, ...
	database:
		# define your database
		# e.g., image, ports, environment variables, networks, volumes, ...

# an object where each key represents a new volume
# e.g., to persist the database, store images, documents, ...
# volumes need to be explicitly bound to a service
volumes:
	database_volume:
		# define the settings of your volume
		# if you leave this empty, default values will be applied

# an object where each key represents a network
# e.g., to communicate with containers in the same network
# networks need to be explicitly bound to a service
networks:
# docker creates a default network for all services in a docker-compose file
# every service joins the default network and can contact every other container
# by its name e.g., docker sets up a DNS entry in server
# for the client and database
# so a call from the server container to <protocol>://database:<port>
# is equivalent to <protocol>://<ip-address-of-database>:<port>
	# we can also define explicit networks
	# and let only some containers join
	# e.g., database and server
	server_database_network:
		# define the settings of your network
		# if you leave this empty, default values will be applied

# an object where each key represents a config
# e.g., to adapt behavior without the need for rebuilding an image
# configs need to be explicitly bound to a service
configs:
	some_config:

# an object where each key represents a secret
# e.g., to adapt behavior without the need for rebuilding an image
# secrets act like configs but with a specific focus on sensitive information
# secrets need to be explicitly bound to a service
secrets:
	some_secret:

```

In the next sections we will learn how to configure and write services, volumes and networks. At the end we will combine all of them to start our web application, our web server, and our database. We will connect the server and the database through a network, so that we can communicate with our database. The data of the database will be persisted in a volume, that we can delete the container and start the container with the same information again.

### How Do You Start A Service From A Dockerfile?

You can start a container in Docker Compose from a Dockerfile. Docker Compose will build the Container and then start the image.

```yaml
version: '3'

# all the services that we are defining
# services are running containers
services:
	# we are defining a service called client
  # this is the client side of our application
  client:
    # we use the build command to create the image
    # from the Dockerfile that we pass to this command
    # in this case "Dockerfile.client"
    # this image will then be used to create the container
    # we also pass the context of the build
    # as the docker-compose.yml file is in the same directory
    # as the source code, we can use the .
    # to refer to the current directory
    build:
      context: .
      dockerfile: Dockerfile.client
```

### How Do You Start A Service From An Image?

You can also start a container from an already built `image`. If the `image` is not found locally by Docker, it will try to pull it from Docker Hub. In our case, we will pull the Postgres image version 16.1 from Docker Hub.

```yaml
version: '3'

# all the services that we are defining
# services are running containers
services:
	# we are defining a service called database
  # this is the postgres database of our application
	database:
    # this time we do not use the build command
    # we use the image command to use an existing image
    # by default docker compose will look at the local registry
    # to find the image
    # if it is not available locally, it will pull it from
    # the docker hub registry
    image: postgres:16.1
```

### How Do You Publish Ports With Docker Compose?

If you want to publish `ports`, to access the containers from the host system, we can add the `ports` to the service object. We want the client to be accessible from our host system. We intend to visit http://localhost:80 in our browser to see our web application.

```yaml
version: '3'

services:

  client:
    build:
      context: .
      dockerfile: Dockerfile.client
    # the ports that we want to publish
    # the first port is the port on the host system
    # the second port is the port inside the container
    # so we map the port 80 of the container to the
    # port 80 of the host
		# ports is an array, so you can add as many ports as needed 
    ports:
      - "80:80"
```

### How Do You Handle Environment Variables In Docker Compose?

For some applications, it is necessary to pass environment variables. For example, passwords, domains, ports, IP addresses, API keys. You can pass them as object to the key `environment` or as a path to the file where you store them to the key `env_file`.  

```yaml
version: '3'

services:
  database:
    # this time we do not use the build command
    # we use the image command to use an existing image
    # by default, docker compose will look at the local registry
    # to find the image
    # if it is not locally available, it will pull it from
    # the docker hub registry
    image: postgres:16.1
    ports:
      # the ports that we want to publish
      # the first port is the port on the host system
      # the second port is the port inside the container
      # so we map the port 3000 of the container to the
      # port 3000 of the host
      - "5432:5432"
    # we can define and pass environment variables
    # to the container
    # we will use these variables to connect to the database
    # in our server
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: user
      POSTGRES_DB: database
			# if you use a .env file
			# you can use ${YOUR_ENV_VAR}
			# and Docker will replace this value
			# with the value in your .env file
			YOUR_ENV_VAR: ${YOUR_ENV_VAR}
		# you can also pass complete .env files
		# even multiples
		env_file:
			- .env.local
			- .env.override
		# env files are structured like
		# `YOUR_ENV_VAR=your-env-value`
		# each line is a new environment variable
```

### How Do You Restart A Container When It Has Crashed In Docker Compose?

Computers, applications, power supply, humans can fail. So it goes without saying that a docker container can fail as well. If we want to restart our service when it stops, we can use the `restart` option within the service object.

```yaml
version: '3'

services:
  client:
    build:
      context: .
      dockerfile: Dockerfile.client
    ports:
      - "80:80"
    # whenever our container stops, we want it to restart
    # unless explicitly stopped manually by us
    restart: always
```

### How Do You Wait For Another Container In Docker Compose?

Every so often, you have dependencies between services. For example, your backend container needs to wait until the database container is started. To wait for another service, you can specify the service name in the `depends_on` option.

```yaml

version: '3'

services:
  server:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: always
    # we want our server to wait for the database to be ready
    # docker compose only checks if the container is running
		# not if the database is ready
    depends_on:
      - database
```

### How Do You Wait For Another Container Based On A Condition In Docker Compose?

Docker Compose does only wait until the service in your container is ready. If you do not specify a condition, Docker Compose can only wait until the container has started. It does not actually wait until the database is ready. To wait for the database to be ready, we can add a health check to our database service and add a condition to our `depends_on` options.  In our `depends_on` object we can add a key that is named after the service (in our case `database`) and in this, we can add a key called `condition` and set its value to `service_healthy`. In that way, this container will wait for its start until the database’s `healthcheck` was successful. You will learn how to add a health check in the next section of this article.

```yaml
version: '3'

services:
  server:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: always
    # we want our server to wait for the database to be ready
    depends_on:
			# here we specify the name of the service
			# in our case our service is named database
      database:
				# we add a condition
				# only if this condition is met
				# the server service will start
				condition: service_healthy
```

### How Do You Define Health Checks In Docker Compose?

You can define a `healthcheck` for your services. These health checks determine whether a service is healthy or not. A `healthcheck` object consists of multiple options.

- `test`: This key holds the command that should be executed to determine if the service is healthy
- `interval`: The interval in which the `healthcheck` should be executed
- `timeout` : If a single run of a health check takes longer than this specified period, the check is considered to be failed
- `start_period`: Gives the container a time to bootstrap. When a health check fails during this period, it does not count as failure. But if it succeeds, it will set the status of the service to healthy.
- `retries`: How often should we retry before we set the status of a service to unhealthy.

```
services:
  database:
    image: postgres:16.1
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: user
      POSTGRES_DB: database
    restart: always
    # in Docker Compose we can define health checks
    # health checks are commands that are executed
    # to check whether the container is healthy or not
    healthcheck:
	    # in this case we check if the database is ready
		  # by using the pg_isready command
      test: ["CMD", "pg_isready", "-U", "user", "-d", "database"]
	    # we check if the database is ready every 2 seconds
      interval: 2s
	    # when a checks duration takes more than 2 seconds
			# we consider it a failure
      timeout: 2s
			# we retry 3 times before we set the status to unhealthy
      retries: 3
			# we give the container 2 seconds for bootstrapping
			# before we consider a failed health check
      start_period: 2s
```

### How Do You Persist Data With Volumes In Docker Compose?

If we would start all of these containers, write data into the database and then stop and remove those containers, all data from the database would be removed as well. To persist data throughout container starts we need to utilize volumes.

We can use named volumes. These are volumes where you specify unique a variable name for a volume and the path inside of the container. In this way docker will handle the location on the host system. The path inside the container is the part of the containers filesystem that you want to persist.

```yaml
volumes:
	- name_of_volume:/path/inside/of/container
```

A mounted volume works similar, but the first part is an absolute path on the host system. In that case Docker is not handling the location of the volume, but we are selcting a location on the host system our self.

```yaml
volumes:
	- /path/on/host/system:/path/inside/of/container
```

 In our case, we use a named volume and the location where postgres stores the data.

```yaml
database:
    image: postgres:16.1
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: user
      POSTGRES_DB: database
    restart: always
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user", "-d", "database"]
      interval: 2s
      timeout: 2s
      retries: 3
      start_period: 2s
    # we want to persist the data of the database
    # so we use a volume
    # the volume is defined at the bottom of this file
    # we use a named volume
    # the name is postgres_data_volume
    # and we mount the path /var/lib/postgresql/data
    # from the container to the volume
    # when we create a named volume, docker will create
    # a directory on the host system to store the data
    # this is managed by docker
    # it follows the same rules like the port mapping
    # the first path (or name) is the path on the host system
    # the second path is the path inside the container
    volumes:
      - postgres_data_volume:/var/lib/postgresql/data

# here we define the volumes that we use
# if we want that a service uses a volume
# we need to explicitly use it in the service
volumes:
  # we create a named volume called
  # postgres_data_volume
  postgres_data_volume:
		# if we do not specify anything here
		# docker will use the default settings for this volume
```

### How Do You Communicate With Other Containers Via Networks In Docker Compose?

To let containers communicate with each other, we use networks in Docker. Docker Compose creates a default network for all your containers in a `docker-compose.yml`. to illustrate how you can manage your own networks we define on network ourself. This network will connect the `server` service with the `database` service. Docker will create DNS entries for each service in this network. This allows us to call the other service with its service name that we have defined in our `docker-compose.yml`. In our case we are able to make a call to the database service by using `database` as hostname for our database in our code. We could make a HTTP request to the `server` service by calling `curl -X GET [http://server:3000/](http://server:3000/`)` inside of our `database` container.

```yaml
version: '3'

services:

  client:
    build:
      context: .
      dockerfile: Dockerfile.client
    ports:
      - "80:80"
    restart: always

  server:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    restart: always
    # docker compose uses a default network if we do not speficfy one
    # but for this example we created our own network
    # that connects our database and our server
    # the definition of the network is at the bottom of this file
    networks:
      - server_database
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:16.1
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: user
      POSTGRES_DB: database
    restart: always
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user", "-d", "database"]
      interval: 2s
      timeout: 2s
      retries: 3
      start_period: 2s
    volumes:
      - postgres_data_volume:/var/lib/postgresql/data
    # docker compose uses a default network if we do not speficfy one
    # but for this example we created our own network
    # that connects our database and our server
    # the definition of the network is at the bottom of this file
    networks:
      - server_database

volumes:
  postgres_data_volume:

# here we define the networks that we use
# if we want that a service uses a network
# we need to explicitly use it in the service
networks:
  # we create a network called
  # server_database
  server_database:
    # if we do not specify anything here
    # docker will use the default settings for this network
```

## How Do You Start Multiple Containers With Docker Compose?

Now to start all containers defined in a `docker-compose.yaml` you need just one command. If you container `depends_on` another container, Docker will start all containers required for this service.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# start all containers
$ docker compose up
# if you want to start all containers in a background process
# add the flag --detach
$ docker compose --detach

# use this for the follwing section as well
# verify all containers
# by listing all containers running on this system
$ docker container ls
# verify the volume
# by listing all volumes on this system
$ docker volume ls
# verify the network
# by listing all networks on this system
$ docker network ls
```

### How Do You Start A Single Container With Docker Compose?

You can also start single services by specifying them via their service name. If you want to start only the database, you could do so  with the following command.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# start the database container
# docker compose up <service-name>
$ docker compose up database
# add the --detach flag to start it as a background process
$ docker compose server --detach
# this command will start the server and the database
# because the server depends on the database

```

## How Do You Stop And Restart Multiple Containers With Docker Compose?

If you want to stop all containers at the same time, you can do so by executing one command. This command will not remove those containers, so you would be able to restart them.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# stop all containers
$ docker compose stop
# if you want to restart them
$ docker compose restart
```

### How Do You Stop And Restart a Single Container With Docker Compose?

You can also stop a single service with Docker Compose by specifying the service name.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# stop the database container
# docker compose stop <service-name>
$ docker compose stop database
# if you want to restart it
$ docker compose restart database
```

## How Do You Remove Multiple Containers With Docker Compose?

To remove all stopped container, you can execute the following command.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# stop all containers
$ docker compose rm
# this will ask you if you are sure about this action
# if you want to remove them confirm this action by typing
# "Y" in your terminal
```

### How Do You Remove A Single Container With Docker Compose?

You can also remove a single stopped service with Docker Compose by specifying the service name.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# remove the database container
# docker compose stop <service-name>
# the container needs to be stopped before you can remove it
$ docker compose stop database
```

## How Do You Stop And Remove Multiple Containers with Docker Compose?

To stop and remove all containers from a `docker-compose.yaml` at the same time use the following command.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# stop and remove all containers
$ docker compose down
```

## How Do You Access Container Started With Docker Compose?

You can use `docker exec -it <container-name> <command>`. If you want to understand the previous command in more detail, read my previous article about the Docker basics.

In compose you can use the same command but with the service name.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# create a ssh like session with a service
# docker compose exec --interactive --tty <service-name> sh
$ docker compose exec --interactive --tty database sh
# now you are inside the container
# use exit to close the connection
$ exit
```

## How Do You Access Container Logs in Docker Compose?

To access container logs you can use the following command.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# to access all container logs
$ docker compose logs
```

### How Do You Access Container Logs Of One Specific Service In Docker Compose?

To access the logs of a single service you can specify the service name.

```bash
# make sure to be in the directory where the docker-compose.yaml is located
$ cd /path/to/project/root
# to access the logs of the server
# docker container logs <service-name>
$ docker compose logs server
```