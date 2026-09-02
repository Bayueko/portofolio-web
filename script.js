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