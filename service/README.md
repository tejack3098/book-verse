# BookVerse Back End Application

## How To Run This Project
1. Open Terminal or Command Prompt and navigate to the project directory. Change directory to the api folder using the command:
```
    cd /service
```
2. Initialize Node & installing dependencies:
```
    npm install
```
3. Initialize .env file in this location with the following contents:
```
    PORT = 3000
    MONGO_CONNECTION=<mongoDB_connection_url>
    JWT_SECRET=bookwave-secret-key
```
4. Install python (if not present)
```
    brew install python
```
5. Install python in a virtual environment:
```
    python3 -m venv bookVerseVenv
```
6. Activate virtual environment:
```
    source bookVerseVenv/bin/activate
```
7. Install python dependencies:
```
    pip install -r app/src/requirements.txt
```
8. Run the server:
```
    npm run start
```