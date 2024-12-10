// script.js

/**
 * Menghitung fase bulan berdasarkan tanggal
 * @param {Date} date - Tanggal input
 * @returns {string} - Deskripsi fase bulan
 */
function hitungFaseBulan(date) {
    // Referensi: Bulan baru pada 6 Januari 2000
    const bulanBaruReferensi = new Date(Date.UTC(2000, 0, 6, 18, 14)); // 6 Januari 2000, 18:14 UTC
    const siklusBulan = 29.530588853; // Siklus sinodik dalam hari

    // Menghitung jumlah hari sejak referensi
    const selisihHari = (date - bulanBaruReferensi) / (1000 * 60 * 60 * 24);
    const fase = (selisihHari % siklusBulan + siklusBulan) % siklusBulan; // Modulus positif

    // Menentukan fase bulan
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
    const faseBulan = hitungFaseBulan(tanggal);

    // Menampilkan hasil
    document.getElementById("result").innerText = `Fase Bulan pada ${tanggal.toLocaleDateString('id-ID')} adalah: ${faseBulan}`;
});
