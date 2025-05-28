// Data ikan dan jadwal pakan
const fishData = [
    {
        name: 'Ikan Koi',
        desc: 'Ikan hias populer dengan warna cerah, membutuhkan pakan berkualitas tinggi dan lingkungan bersih.',
        schedule: [
            { waktu: 'Pagi (07:00-08:00)', pakan: 'Pelet khusus koi, secukupnya' },
            { waktu: 'Sore (16:00-17:00)', pakan: 'Pelet atau cacing beku' }
        ]
    },
    {
        name: 'Ikan Lele',
        desc: 'Ikan konsumsi yang mudah dipelihara, pemberian pakan bisa berupa pelet, cacing, atau limbah organik.',
        schedule: [
            { waktu: 'Pagi (06:00-07:00)', pakan: 'Pelet apung, 3% dari berat badan' },
            { waktu: 'Sore (17:00-18:00)', pakan: 'Pelet atau pakan alami' }
        ]
    },
    {
        name: 'Ikan Nila',
        desc: 'Ikan air tawar yang cepat tumbuh, pakan utama berupa pelet dan dedaunan.',
        schedule: [
            { waktu: 'Pagi (07:00-08:00)', pakan: 'Pelet, 2-3% dari berat badan' },
            { waktu: 'Siang (12:00-13:00)', pakan: 'Daun-daunan segar' },
            { waktu: 'Sore (17:00-18:00)', pakan: 'Pelet' }
        ]
    },
    {
        name: 'Ikan Cupang',
        desc: 'Ikan kecil dengan warna menarik, pakan utama berupa cacing sutra, kutu air, dan pelet mikro.',
        schedule: [
            { waktu: 'Pagi (08:00)', pakan: 'Cacing sutra/kutu air' },
            { waktu: 'Sore (17:00)', pakan: 'Pelet mikro' }
        ]
    }
];

function renderFishList(filter = '') {
    const fishList = document.getElementById('fishList');
    if (!fishList) return;
    fishList.innerHTML = '';
    fishData.filter(fish => fish.name.toLowerCase().includes(filter.toLowerCase())).forEach((fish, idx) => {
        const card = document.createElement('div');
        card.className = 'fish-card';
        card.innerHTML = `<h4>${fish.name}</h4><p>${fish.desc}</p><button onclick="showSchedule(${idx}, this)">Lihat Jadwal</button><div class='schedule-container'></div>`;
        fishList.appendChild(card);
    });
}

function showSection(id) {
    // Sembunyikan semua section
    const sections = ['home', 'menu-ikan', 'tentang-pembuat', 'dapatkan-aplikasi'];
    sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el) el.style.display = (id === sec) ? '' : 'none';
    });
    // Update menu active
    document.querySelectorAll('.menu-bar a').forEach(a => a.classList.remove('active'));
    if(id === 'home') document.querySelector('.menu-bar a[href="#home"]').classList.add('active');
    if(id === 'menu-ikan') document.querySelector('.menu-bar a[href="#menu-ikan"]').classList.add('active');
    if(id === 'tentang-pembuat') document.querySelector('.menu-bar a[href="#tentang-pembuat"]').classList.add('active');
    if(id === 'dapatkan-aplikasi') document.querySelector('.menu-bar a[href="#dapatkan-aplikasi"]').classList.add('active');
}

function showSchedule(idx, btn) {
    // Temukan elemen container jadwal di dalam card yang sesuai
    const card = btn.parentElement;
    const scheduleDiv = card.querySelector('.schedule-container');
    // Toggle tampil/sembunyi
    if (scheduleDiv.innerHTML !== '') {
        scheduleDiv.innerHTML = '';
        btn.textContent = 'Lihat Jadwal';
        return;
    }
    const fish = fishData[idx];
    let html = `<table class='schedule-table' style='margin-top:16px;'><tr><th>Waktu</th><th>Pakan</th></tr>`;
    fish.schedule.forEach(row => {
        html += `<tr><td>${row.waktu}</td><td>${row.pakan}</td></tr>`;
    });
    html += '</table>';
    scheduleDiv.innerHTML = html;
    btn.textContent = 'Tutup Jadwal';
}

// Initial render
showSection('home');
renderFishList();
