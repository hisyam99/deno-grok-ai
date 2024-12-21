// Import modul 'serve' dari pustaka standar Deno untuk membuat server HTTP
import { serve } from "https://deno.land/std@0.216.0/http/server.ts";
// Import kelas 'OpenAI' dari pustaka jsr:@openai/openai untuk berinteraksi dengan API OpenAI (support Grok AI juga)
import { OpenAI } from "jsr:@openai/openai@^4.75.0";
// Import fungsi 'load' dari pustaka jsr:@std/dotenv untuk memuat variabel lingkungan dari file .env
import { load } from "jsr:@std/dotenv@^0.225.3";

// Memuat variabel lingkungan dari file .env dan mengekspornya
await load({ export: true });

// Mendapatkan kunci API dari variabel lingkungan GROK_API_KEY, atau menggunakan string kosong jika tidak ditemukan
const GROK_API_KEY = Deno.env.get("GROK_API_KEY") || "";
// Mendapatkan URL dasar dari variabel lingkungan GROK_BASE_URL, atau menggunakan URL default jika tidak ditemukan
const GROK_BASE_URL = Deno.env.get("GROK_BASE_URL") || "https://api.x.ai/v1";

// Membuat instance OpenAI dengan kunci API dan URL dasar yang telah diatur
const openai = new OpenAI({
  apiKey: GROK_API_KEY,
  baseURL: GROK_BASE_URL,
});

// Fungsi untuk menangani permintaan POST ke endpoint /api/chat
async function handleChatRequest(req: Request): Promise<Response> {
  try {
    // Mendapatkan data JSON dari permintaan
    const { message, model, history, baseUrl } = await req.json();
    // Membuat instance baru jika baseUrl khusus disediakan
    const client = baseUrl
      ? new OpenAI({
          apiKey: GROK_API_KEY,
          baseURL: baseUrl,
        })
      : openai;
    // Membuat permintaan ke API GrokAI untuk mendapatkan jawaban
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        // Mengubah riwayat pesan menjadi format yang sesuai
        ...history.map((msg: { role: string; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
        // Menambahkan pesan pengguna terbaru
        { role: "user", content: message },
      ],
    });
    // Mengembalikan respons JSON dengan pesan dari AI
    return new Response(
      JSON.stringify({
        message: completion.choices[0].message.content,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Menangani kesalahan dan mengembalikan respons dengan pesan kesalahan
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get AI response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Fungsi utama untuk menangani permintaan
async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (url.pathname === "/api/chat" && req.method === "POST") {
    return handleChatRequest(req);
  }
  // Jika bukan endpoint /api/chat, kembalikan pesan kesalahan
  return new Response("Not Found", { status: 404 });
}

// Memulai server pada port 8000
serve(handleRequest, { port: 8000 });
// Mencetak pesan bahwa server sedang berjalan pada port 8000
console.log("Server running on port 8000");