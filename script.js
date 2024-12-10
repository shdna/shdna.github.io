/**
 * Menghitung fase bulan dengan metode numerik iterasi langsung
 * @param {Date} date - Tanggal input
 * @returns {string} - Deskripsi fase bulan
 */
function hitungFaseBulanIterasi(date) {
    // Referensi: Bulan baru pada 6 Januari 2000
    const bulanBaruReferensi = new Date(Date.UTC(2000, 0, 6, 18, 14)); // 6 Januari 2000, 18:14 UTC
    const siklusBulan = 29.530588853; // Siklus sinodik dalam hari

    // Menghitung jumlah hari sejak referensi
    const selisihHari = (date - bulanBaruReferensi) / (1000 * 60 * 60 * 24);

    // Metode iterasi numerik langsung untuk menghitung fase bulan
    let fase = selisihHari; // Inisialisasi fase berdasarkan selisih hari
    let iterasi = 0;
    const maxIterasi = 100; // Batas iterasi untuk menghindari loop tak terhingga
    const toleransi = 0.00001; // Toleransi kesalahan untuk konvergensi

    // Iterasi untuk mengkonvergensikan fase bulan
    while (iterasi < maxIterasi) {
        // Modulus untuk memastikan fase berada dalam siklus bulan
        fase = (fase % siklusBulan + siklusBulan) % siklusBulan; // Menjaga fase dalam siklus bulan

        // Jika fase sudah cukup konvergen, keluar dari loop
        if (Math.abs(fase - (selisihHari % siklusBulan)) < toleransi) {
            break;
        }

        iterasi++;
    }

    // Tentukan fase bulan berdasarkan hasil iterasi
    if (fase < 1) return "Bulan Baru 🌑";
    if (fase < 7.4) return "Kuartal Pertama (Waxing) 🌒";
    if (fase < 14.8) return "Bulan Purnama 🌕";
    if (fase < 22.1) return "Kuartal Ketiga (Waning) 🌖";
    return "Bulan Baru 🌑"; // Perkiraan bulan baru berikutnya
}

// Event listener untuk tombol hitung
document.getElementById("calculate-button").addEventListener("click", () => {
    const tanggalInput = document.getElementById("date-input").value;
    if (!tanggalInput) {
        alert("Silakan pilih tanggal yang valid!");
        return;
    }

    const tanggal = new Date(tanggalInput);
    const faseBulan = hitungFaseBulanIterasi(tanggal);

    // Menampilkan hasil
    document.getElementById("result").innerText = `Fase Bulan pada ${tanggal.toLocaleDateString('id-ID')} adalah: ${faseBulan}`;
});
