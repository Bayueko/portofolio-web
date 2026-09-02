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
        const respons = await fetch('http://localhost:3000/api/pesan', {
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
const btnRefresh = document.getElementById('btn-refresh');

// Fungsi untuk mengambil data dari server dan menampilkannya ke layar
async function muatDaftarPesan() {
    wadahPesan.innerHTML = '<p style="color: #64748b;">Mengambil data dari database...</p>';

    try {
        const respons = await fetch('http://localhost:3000/api/pesan');
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

// 2. Pasang fungsi ke tombol "Segarkan Data"
btnRefresh.addEventListener('click', muatDaftarPesan);

if (respons.ok) {
            statusTeks.textContent = 'Sukses! Pesan berhasil masuk ke database SQLite.';
            statusTeks.style.color = 'green';
            formKontak.reset();
            muatDaftarPesan(); // <-- Tambahkan baris ini agar daftar langsung terbarui otomatis setelah kirim pesan
        }