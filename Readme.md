# Github Repository Line Counter

The **Line Counter** project allows you to count lines in files and provides an easy-to-use interface for viewing the results. It can be useful for various scenarios, such as analyzing code repositories, log files, or any text files.

## Features
- Count lines in a single file or multiple files.
- Display the results in a clear format.
- Works with various file formats.

## Installation

You can easily run **Rumi** using Docker. Follow the steps below to get started.

### Prerequisites

Ensure you have Docker installed on your machine. If not, you can download and install Docker from [here](https://www.docker.com/get-started).
You can check if docker is installed in your system using this command.
```bash
docker --version
```
If Docker is installed, it will display the version of Docker that is installed.

### Running the Project Using Docker

1. **Pull the Docker image:**

   First, pull the Docker image for Rumi:

   ```bash
   docker pull okaymisba/rumi:Rumi
    ```
2. **Run the Docker container:**

    After pulling the image, you can run the container using the following command:

    ```bash
    docker run -d -p 8080:8080 okaymisba/rumi:Rumi
    ```
    This command runs the container in the background and maps port 8080 of the container to port 8080 on your host.

3. **Access the Application:**

    Once the container is running, you can access the Line Counter application in your web browser at `http://localhost:8080`.

## Contributing

  I welcome contributions to the Line Counter project. If you'd like to contribute, please fork the repository, create a feature branch, and submit a pull request.

  
