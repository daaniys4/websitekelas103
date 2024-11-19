// Data jadwal pelajaran
const schedule = {
    'Senin': [
        { subject: 'Olahraga', time: '07:30 - 09:00' },
        { subject: 'Bahasa Indonesia', time: '09:00 - 11:20' },
        { subject: 'Sosiologi', time: '11:20 - 13:35' },
        { subject: 'Prakarya', time: '13:35 - 15:00' }
    ],
    'Selasa': [
        { subject: 'Sosiologi', time: '07:00 - 09:00' },
        { subject: 'Informatika', time: '09:00 - 10:40' },
        { subject: 'Agama', time: '10:40 - 12:00' },
        { subject: 'Matematika', time: '12:50 - 15:00' }
    ],
    'Rabu': [
        { subject: 'Bahasa Inggris', time: '07:15 - 09:10' },
        { subject: 'BK', time: '09:10 - 09:45' },
        { subject: 'Seni Tari', time: '10:05 - 11:25' },
        { subject: 'P5', time: '11:25 - 14:20' },
        { subject: 'P5/Pramuka', time: '14:20 - 15:00' }
    ],
    'Kamis': [
        { subject: 'Ekonomi', time: '07:30 - 09:00' },
        { subject: 'Sejarah', time: '09:00 - 10:40' },
        { subject: 'Bahasa Jerman', time: '10:40 - 12:00' },
        { subject: 'Informatika', time: '12:50 - 15:00' }
    ],
    'Jumat': [
        { subject: 'Ekonomi', time: '07:30 - 09:30' },
        { subject: 'PP', time: '09:50 - 11:10' },
        { subject: 'Bahasa Jerman', time: '11:10 - 13:30' }
    ]
};

// Data siswa
const students = [
    "Almanda Angreini", "Alvirginia Cahya Mentari", "Alya Azzura", "Arfathoni Fisabilillah",
    "Chantika Mawar Al Hanny", "Citra Ayu", "Daanisya Rayhana Putri Ramadan",
    "Ekky Suryadi", "Eniska Talitha H.K.K", "Fachri Ibnu Fadillah",
    "Farah Ayesha Salsabila", "Ghozi Barraq Muazzam", "Kayla Putri Kinasih",
    "Khadijah Puspa Wiyanti", "M. Ghifari Syafiq", "M. Ichsan Fadhill",
    "Magentha Ibrahim Movic", "Malika Titania Alicia", "Mey Dina Hapsari",
    "Nadziifa Syakilla Azahraa", "Nasywan Rizky Mumtaaz", "Nova Cahaya Sukma Aisyah",
    "Nur Afifah Salwa Kirana", "Puspita Dewi Rani", "Qarira Bunga Aprillia",
    "Raden Ajeng Shyakina Rahmadyani A", "Rafananta Herdi", "Ridhowan Ratiska",
    "Rifqa Nairaningtyas", "Selvi Angreyni", "Siti Fadilah", "Siti Zulaikha Zahwa Alzahra",
    "Suhana Choirunisa", "Zahra Febriansyah", "Zaskia Putri Anabyla", "Zacky Al Haziri"
];

// Fungsi untuk mengisi tabel jadwal
function fillScheduleTable() {
    const table = document.getElementById('scheduleTable');
    table.innerHTML = '<tr><th>Hari</th><th>Mata Pelajaran</th><th>Waktu</th></tr>';

    for (const [day, subjects] of Object.entries(schedule)) {
        subjects.forEach((subject, index) => {
            const row = table.insertRow();
            if (index === 0) {
                const dayCell = row.insertCell();
                dayCell.innerHTML = `<strong>${day}</strong>`;
            } else {
                row.insertCell();
            }
            row.insertCell().textContent = subject.subject;
            row.insertCell().textContent = subject.time;
        });
    }
}

// Fungsi untuk menghitung waktu tersisa
function updateCountdown() {
    const now = new Date();
    const day = now.getDay();
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = dayNames[day];
    
    const countdownElement = document.getElementById('countdown');

    if (day === 0 || day === 6) {
        countdownElement.textContent = 'Sekarang hari libur. Selamat beristirahat!';
        return;
    }

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const todaySchedule = schedule[dayName];
    
    if (currentTime >= 15 * 60) {
        countdownElement.textContent = 'Pelajaran hari ini telah selesai. Selamat beristirahat dan mengerjakan tugas!';
        return;
    }

    let nextSubject = null;
    let currentSubject = null;

    for (const subject of todaySchedule) {
        const [startHour, startMinute] = subject.time.split(' - ')[0].split(':').map(Number);
        const [endHour, endMinute] = subject.time.split(' - ')[1].split(':').map(Number);
        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;

        if (currentTime >= startTime && currentTime < endTime) {
            currentSubject = subject;
            break;
        }

        if (currentTime < startTime) {
            nextSubject = subject;
            break;
        }
    }

    if (currentSubject) {
        const [_, endTime] = currentSubject.time.split(' - ');
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const endTimeMinutes = endHour * 60 + endMinute;
        const remainingTime = endTimeMinutes - currentTime;
        const hours = Math.floor(remainingTime / 60);
        const minutes = remainingTime % 60;

        countdownElement.innerHTML = `
            <p>Hari ini ${dayName}</p>
            <p>Pelajaran saat ini: ${currentSubject.subject}</p>
            <p>Berakhir dalam ${hours} jam ${minutes} menit</p>
        `;
    } else if (nextSubject) {
        const [startTime, _] = nextSubject.time.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startTimeMinutes = startHour * 60 + startMinute;
        const remainingTime = startTimeMinutes - currentTime;
        const hours = Math.floor(remainingTime / 60);
        const minutes = remainingTime % 60;

        countdownElement.innerHTML = `
            <p>Hari ini ${dayName}</p>
            <p>Pelajaran selanjutnya: ${nextSubject.subject}</p>
            <p>Dimulai dalam ${hours} jam ${minutes} menit</p>
        `;
    } else {
        countdownElement.textContent = 'Tidak ada pelajaran lagi hari ini';
    }
}

// Fungsi untuk mengisi grid absensi
function fillAttendanceGrid() {
    const grid = document.getElementById('attendanceGrid');
    students.sort().forEach(student => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.innerHTML = `
            <div>${student}</div>
            <div class="attendance-status">
                <button class="present" onclick="markAttendance(this, '${student}', 'present')">Hadir</button>
                <button class="absent" onclick="markAttendance(this, '${student}', 'absent')">Absen</button>
                <button class="sick" onclick="markAttendance(this, '${student}', 'sick')">Sakit</button>
            </div>
        `;
        grid.appendChild(item);
    });
}

// Fungsi untuk menandai kehadiran
function markAttendance(button, student, status) {
    const statusDiv = button.parentElement;
    statusDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    console.log(`${student} ditandai sebagai ${status}`);
    // Di sini Anda bisa menambahkan logika untuk menyimpan status kehadiran
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    fillScheduleTable();
    fillAttendanceGrid();
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update setiap menit
});