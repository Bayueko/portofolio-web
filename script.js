// Mengambil elemen tombol mode gelap
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Mode Terang';
    } else {
        toggleBtn.textContent = 'Mode Gelap';
    }
});

// Mengambil elemen formulir kontak
const formKontak = document.getElementById('form-kontak');
const statusTeks = document.getElementById('pesan-status');

formKontak.addEventListener('submit', async function (e) {
    e.preventDefault();

    const dataKirim = {
        nama: document.getElementById('input-nama').value,
        email: document.getElementById('input-email').value,
        pesan: document.getElementById('input-pesan').value
    };

    statusTeks.textContent = 'Sedang mengirim ke server...';
    statusTeks.style.color = '#0284c7';

    try {
        const respons = await fetch('https://backend-portofolio-rust.vercel.app/api/pesan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataKirim)
        });

        const hasil = await respons.json();

        if (respons.ok) {
            statusTeks.textContent = 'Sukses! Pesan berhasil masuk ke database SQLite.';
            statusTeks.style.color = 'green';
            formKontak.reset();
        } else {
            statusTeks.textContent = 'Gagal: ' + hasil.pesan;
            statusTeks.style.color = 'red';
        }
    } catch (error) {
        statusTeks.textContent = 'Terjadi kesalahan koneksi ke server!';
        statusTeks.style.color = 'red';
    }
});

// Elemen Dashboard
const wadahPesan = document.getElementById('wadah-pesan');


// Fungsi untuk mengambil data dari server dan menampilkannya ke layar
async function muatDaftarPesan() {
    wadahPesan.innerHTML = '<p style="color: #64748b;">Mengambil data dari database...</p>';

    try {
        const respons = await fetch('https://backend-portofolio-rust.vercel.app/api/pesan');
        const hasil = await respons.json();

        // Jika tidak ada data pesan sama sekali
        if (hasil.data.length === 0) {
            wadahPesan.innerHTML = '<p style="color: #64748b;">Belum ada pesan yang tersimpan di database.</p>';
            return;
        }

        // Bersihkan isi wadah sebelum diisi data terbaru
        wadahPesan.innerHTML = '';

        // Looping untuk merender setiap baris data menjadi kartu HTML
        hasil.data.forEach(item => {
            const kartu = document.createElement('div');
            kartu.className = 'card';
            kartu.style.borderLeft = '4px solid #0284c7';

            kartu.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                    <strong style="font-size: 1.1rem; color: #0f172a;">${item.nama}</strong>
                    <small style="color: #94a3b8;">${new Date(item.waktu).toLocaleString('id-ID')}</small>
                </div>
                <p style="color: #0284c7; font-size: 0.9rem; margin-bottom: 0.5rem;">📧 ${item.email}</p>
                <p style="color: #334155; background: #f1f5f9; padding: 0.8rem; border-radius: 6px;">${item.pesan}</p>
            `;

            wadahPesan.appendChild(kartu);
        });

    } catch (error) {
        wadahPesan.innerHTML = '<p style="color: red;">Gagal terhubung ke server backend!</p>';
    }
}

// 1. Jalankan fungsi otomatis saat halaman pertama kali dibuka
muatDaftarPesan();



if (respons.ok) {
            statusTeks.textContent = 'Sukses! Pesan berhasil masuk ke database SQLite.';
            statusTeks.style.color = 'green';
            formKontak.reset();
            muatDaftarPesan(); // <-- Tambahkan baris ini agar daftar langsung terbarui otomatis setelah kirim pesan
        }

        // URL Backend Vercel
const BACKEND_URL = 'https://backend-portofolio-rust.vercel.app/api/pesan';

// Elemen DOM
const formPesan = document.getElementById('form-pesan');
const containerPesan = document.getElementById('daftar-pesan');
const statusPesan = document.getElementById('status-pesan');

// 1. Fungsi Mengambil & Menampilkan Data Pesan
async function muatDaftarPesan() {
    try {
        const respons = await fetch(BACKEND_URL);
        if (!respons.ok) throw new Error('Gagal mengambil data dari server');

        const hasil = await respons.json();
        const daftarPesan = hasil.data || [];

        // Render ke antarmuka HTML
        if (daftarPesan.length === 0) {
            containerPesan.innerHTML = '<p style="color: #64748b; font-style: italic;">Belum ada pesan yang masuk.</p>';
            return;
        }

        containerPesan.innerHTML = daftarPesan.map(item => `
            <div class="card" style="margin-bottom: 1rem; border-left: 4px solid #0284c7; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.3rem;">
                    <strong style="color: #0f172a; font-size: 1.05rem;">${item.nama}</strong>
                    <small style="color: #94a3b8; font-size: 0.8rem;">${new Date(item.waktu).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                <div style="color: #0284c7; font-size: 0.85rem; margin-bottom: 0.5rem;">${item.email}</div>
                <p style="color: #334155; margin: 0; line-height: 1.5;">${item.pesan}</p>
            </div>
        `).join('');

    } catch (err) {
        console.error('Penyegaran otomatis gagal:', err);
    }
}

// 2. Fungsi Mengirim Pesan (Otomatis segarkan setelah sukses)
if (formPesan) {
    formPesan.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        statusPesan.textContent = 'Mengirim pesan...';
        statusPesan.style.color = '#0284c7';

        try {
            const respons = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, email, pesan })
            });

            const hasil = await respons.json();

            if (respons.ok) {
                statusPesan.textContent = 'Pesan berhasil terkirim!';
                statusPesan.style.color = '#16a34a';
                formPesan.reset();

                // Segarkan seketika tanpa perlu tombol
                muatDaftarPesan();
            } else {
                throw new Error(hasil.pesan || 'Gagal menyimpan pesan');
            }
        } catch (err) {
            statusPesan.textContent = 'Gagal mengirim: ' + err.message;
            statusPesan.style.color = '#dc2626';
        }
    });
}

// 3. Otomasi Siklus Hidup Halaman
document.addEventListener('DOMContentLoaded', () => {
    // Muat data saat halaman selesai dibuka
    muatDaftarPesan();

    // Polling berkala: Memeriksa dan memperbarui pesan baru setiap 15 detik secara otomatis
    setInterval(muatDaftarPesan, 15000);
});