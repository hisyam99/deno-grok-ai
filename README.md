# 1. Versi langsung via "main.ts"


#### a. File `.env`
Buat file `.env` di root proyek dan tambahkan kredensial API Grok AI:

```
GROK_API_KEY=YOUR_API_KEY_HERE
GROK_BASE_URL=https://api.x.ai/v1
```

Ganti `YOUR_API_KEY_HERE` dengan kunci API yang sudah di dapatkan dari xAI.

### 2. Menjalankan Server

Buka terminal dan navigasikan ke direktori yang berisi file `main.ts`. Jalankan perintah berikut untuk memulai server:

```bash
deno run --allow-net --allow-env --allow-read main.ts
```

Perintah ini memberikan izin kepada Deno untuk mengakses jaringan (`--allow-net`), membaca variabel lingkungan (`--allow-env`), dan membaca file (`--allow-read`).

# 2. Versi Server


#### a. File `.env`
Buat file `.env` di root proyek dan tambahkan kredensial API Grok AI:

```
GROK_API_KEY=YOUR_API_KEY_HERE
GROK_BASE_URL=https://api.x.ai/v1
```

Ganti `YOUR_API_KEY_HERE` dengan kunci API yang sebenarnya yang di dapatkan dari xAI.

### 2. Menjalankan Server

Buka terminal dan navigasikan ke direktori yang berisi file `main_api.ts`. Jalankan perintah berikut untuk memulai server:

```bash
deno run --allow-net --allow-env --allow-read main_api.ts
```

Perintah ini memberikan izin kepada Deno untuk mengakses jaringan (`--allow-net`), membaca variabel lingkungan (`--allow-env`), dan membaca file (`--allow-read`).

### 3. Mengirim Permintaan

Setelah server berjalan, kirim permintaan POST ke endpoint `/api/chat`. Contoh menggunakan `curl` dari terminal:

```bash
curl -X POST \
  http://localhost:8000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Hello, Grok!",
    "model": "grok-2-1212",
    "history": []
}'
```

Contoh: 

```bash
❯ curl -X POST \
        http://localhost:8000/api/chat \
        -H 'Content-Type: application/json' \
        -d '{
      "message": "Hello, Grok!",
      "model": "grok-2-1212",
      "history": []
  }'

❯ {"message":"Hello, human! How can I assist you today?"}
```