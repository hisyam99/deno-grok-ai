// Import kelas 'OpenAI' dari pustaka jsr:@openai/openai untuk berinteraksi dengan API OpenAI (support Grok AI juga)
import { OpenAI } from "jsr:@openai/openai@^4.75.0";
// Import fungsi 'load' dari pustaka jsr:@std/dotenv untuk memuat variabel lingkungan dari file .env
import { load } from "jsr:@std/dotenv@^0.225.3";

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  // Memuat variabel lingkungan dari file .env dan mengekspornya
  await load({ export: true });

  // Mendapatkan kunci API dari variabel lingkungan GROK_API_KEY, atau menggunakan string kosong jika tidak ditemukan
  const GROK_API_KEY = Deno.env.get("GROK_API_KEY") || "";
  // Mendapatkan URL dasar dari variabel lingkungan GROK_BASE_URL, atau menggunakan URL default jika tidak ditemukan
  const GROK_BASE_URL = Deno.env.get("GROK_BASE_URL") || "https://api.x.ai/v1";

  // Membuat instance GrokAI dengan kunci API dan URL dasar yang telah diatur
  const openai = new OpenAI({
    apiKey: GROK_API_KEY,
    baseURL: GROK_BASE_URL,
  });

  // Pesan input yang telah diatur langsung dalam kode
  const userMessage = "Hello, Grok! How are you today?";
  // Model yang telah diatur langsung dalam kode
  const model = "grok-2-1212";
  // Riwayat pesan (kosong dalam contoh ini)
  const history: { role: "user" | "assistant"; content: string }[] = [];

  try {
    // Membuat permintaan ke API Grok untuk mendapatkan jawaban
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        // Mengubah riwayat pesan menjadi format yang sesuai
        ...history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        // Menambahkan pesan pengguna terbaru
        { role: "user", content: userMessage },
      ],
    });
    // Menampilkan respons dari AI
    console.log("AI Response:", completion.choices[0].message.content);
  } catch (error) {
    // Menangani kesalahan
    console.error("Error:", error);
  }
}

// Menjalankan fungsi utama
main();
