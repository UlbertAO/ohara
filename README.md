# Ohara - A Book Web App

Ohara is a frontend-only web application for managing books. It is built using **Injee**, an instant in-memory JSON database that provides ready-to-use CRUD APIs, making development faster and easier for frontend developers.

## About Injee

Injee is a no-configuration, instant database designed for frontend developers. It provides:

- In-memory JSON storage.
- Built-in CRUD APIs for rapid development.
- A seamless experience for frontend developers who need a quick and reliable data source without waiting for backend APIs.

## Installation

1. Setup Backend : **Injee**
   ```bash
   docker pull mindaslab/injee:0.14.0
   ```
2. Clone this repository:

   ```bash
   git clone https://github.com/your-username/ohara.git

   cd ohara

   yarn install

   yarn run dev
   ```

3. Run Backend
   ```bash
   docker run -p 4125:4125 \
   -v "$(pwd)/files:/app/files" \
   -v "$(pwd)/views:/app/views" \
   -v "$(pwd)/backups:/app/backups" \
   -v "$(pwd)/mocks:/app/mocks" \
   mindaslab/injee:0.14.0
   ```
   Note: if you want to use any other port do specify in src\constants\config.ts `API_BASE_URL`
