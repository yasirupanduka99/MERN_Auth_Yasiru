# MERN Authentication Project

This project demonstrates basic user authentication using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Structure

The project repository is organized into two main folders:

- `backend`: Contains the backend server code developed using Node.js and Express.js.
- `frontend`: Contains the frontend client code developed using React.js.

## Local Setup

To set up this project on your local machine, follow these steps:

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org).
- MongoDB: You can download and install MongoDB from [mongodb.com](https://www.mongodb.com).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yasirupanduka99/MERN_Auth_Yasiru.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MERN_Auth_Yasiru
    ```

3. Backend Setup:

    ```bash
    cd backend
    ```

    - Create a `.env` file in the `backend` directory and add the following variables:

        ```
        PORT=5000
        MONGO_URL=<your_mongo_db_connection_string>
        SECRET_TOKEN=<your_secret_token>
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Start the backend server:

        ```bash
        npm start
        ```

4. Frontend Setup:

    ```bash
    cd ../frontend
    ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Start the frontend development server:

        ```bash
        npm start
        ```

5. Access the application:

    Once the backend and frontend servers are running, you can access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
