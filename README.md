# Cek Ongkir App

A Next.js application for checking shipping costs using the RajaOngkir API.

## Features
- Fetches provinces and cities data from the RajaOngkir API
- Calculates shipping costs based on origin, destination, weight, and courier

---

## Installation Guide

### Prerequisites
- Node.js (version 16.x or later)
- Yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ayra-sa/cek-ongkir-app.git
   cd cek-ongkir-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create and configure the `.env` file:
   - Duplicate the `.env.example` file as `.env.local`
   - Update the file with your own API key and configurations:
     ```plaintext
     RAJAONGKIR_API_KEY=your_rajaongkir_api_key
     RAJAONGKIR_BASE_URL=https://api.rajaongkir.com/starter
     ```

4. Start the development server:
   ```bash
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Configuration Guide

## Usage Instructions

1. Open the app in your browser at `http://localhost:3000`.
2. Select the origin province and city.
3. Select the destination province and city.
4. Enter the weight of the package in grams.
5. Choose a courier (e.g., JNE, TIKI, POS).
6. Click on the **Cek Ongkir** button to see the shipping cost results.

---

## Project Structure

```plaintext
|-- components
|   |-- Input.tsx         // Input component for form fields
|   |-- Select.tsx        // Select dropdown component
|-- pages
|   |-- api
|   |   |-- rajaongkir    // API routes to proxy requests to RajaOngkir
|   |-- index.tsx         // Main page for the Cek Ongkir app
|-- styles
|   |-- globals.css       // Global CSS styles
|-- .env.example          // Example environment variables file
```

---

## Notes
- Ensure your RajaOngkir API key has sufficient quota to handle API requests.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
