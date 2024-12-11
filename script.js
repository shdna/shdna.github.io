/**
 * Menghitung fase bulan dengan metode Runge-Kutta 4
 * @param {Date} date - Tanggal input
 * @returns {string} - Deskripsi fase bulan
 */
function hitungFaseBulanRK4(date) {
    // Referensi: Bulan baru pada 6 Januari 2000
    const bulanBaruReferensi = new Date(Date.UTC(2000, 0, 6, 18, 14)); // 6 Januari 2000, 18:14 UTC
    const siklusBulan = 29.530588853; // Siklus sinodik dalam hari
    const omega = (2 * Math.PI) / siklusBulan; // Kecepatan sudut rata-rata

    // Menghitung jumlah hari sejak referensi
    const selisihHari = (date - bulanBaruReferensi) / (1000 * 60 * 60 * 24);

    // Variabel awal untuk RK4
    let theta = 0; // Sudut dalam radian
    let t = 0; // Waktu dalam hari
    const step = 0.1; // Langkah integrasi (dalam hari)
    const maxIterasi = Math.ceil(selisihHari / step); // Iterasi maksimum berdasarkan selisih waktu

    // Fungsi kecepatan sudut (konstan untuk orbit sirkular)
    const dTheta = () => omega;

    // Iterasi RK4
    for (let i = 0; i < maxIterasi; i++) {
        const k1 = dTheta();
        const k2 = dTheta();
        const k3 = dTheta();
        const k4 = dTheta();

        // Update sudut menggunakan rata-rata bobot RK4
        theta += (step / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
        t += step;

        // Normalisasi sudut ke rentang [0, 2 * PI]
        if (theta >= 2 * Math.PI) {
            theta -= 2 * Math.PI;
        }

        // Hentikan jika waktu telah melampaui selisih hari
        if (t >= selisihHari) break;
    }

    // Mengonversi sudut ke fase bulan dalam rentang 0-1
    const fase = theta / (2 * Math.PI);

    // Tentukan fase bulan berdasarkan hasil RK4
    if (fase < 0.03 || fase > 0.97) return "Bulan Baru 🌑";
    if (fase < 0.25) return "Kuartal Pertama (Waxing) 🌒";
    if (fase < 0.53) return "Bulan Purnama 🌕";
    if (fase < 0.75) return "Kuartal Ketiga (Waning) 🌖";
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
    const faseBulan = hitungFaseBulanRK4(tanggal);

    // Menampilkan hasil
    document.getElementById("result").innerText = `Fase Bulan pada ${tanggal.toLocaleDateString('id-ID')} adalah: ${faseBulan}`;
});
