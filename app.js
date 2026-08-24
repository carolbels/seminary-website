// 
// SEMINÁRIO — DADOS E LÓGICA
// 

// --- AVATAR DATA ---
const avatars = [
    { id: "moises", name: "Moisés",  file: "avatars/moises.png" },<br/>
    { id: "davi",   name: "Davi",    file: "avatars/davi.png" },<br/>
    { id: "ester",  name: "Ester",   file: "avatars/ester.png" },<br/>
    { id: "rute",   name: "Rute",    file: "avatars/rute.png" },<br/>
    { id: "jose",   name: "José",    file: "avatars/jose.png" },<br/>
    { id: "rebeca", name: "Rebeca",  file: "avatars/rebeca.png" }
];

let selectedAvatar = null;
let uploadedPhoto = null;

// --- MOCK DATA ---
const scriptures = [
    { ref: "1 Néfi 3:7", text: "Eu irei e cumprirei as ordens do Senhor..." },<br/>
    { ref: "2 Néfi 2:25", text: "Adão caiu para que os homens existissem..." },<br/>
    { ref: "2 Néfi 31:19-20", text: "Prossegui com firmeza em Cristo..." },<br/>
    { ref: "Mosias 2:17", text: "Quando estais a serviço de vosso próximo..." },<br/>
    { ref: "Mosias 3:19", text: "O homem natural é inimigo de Deus..." },<br/>
    { ref: "Alma 7:11-13", text: "E ele seguirá, sofrendo dores e aflições..." },<br/>
    { ref: "Alma 32:21", text: "Fé não é ter um conhecimento perfeito..." },<br/>
    { ref: "Helamã 5:12", text: "É sobre a rocha de nosso Redentor..." },<br/>
    { ref: "3 Néfi 11:10-11", text: "Eis que eu sou Jesus Cristo..." },<br/>
    { ref: "3 Néfi 27:27", text: "Que tipo de homens devereis ser?..." },<br/>
    { ref: "Éter 12:6", text: "Não recebeis testemunho senão depois..." },<br/>
    { ref: "Morôni 10:4-5", text: "Pergunteis a Deus, o Pai Eterno..." },<br/>
    { ref: "Tiago 1:5-6", text: "Se algum de vós tem falta de sabedoria..." },<br/>
    { ref: "João 14:15", text: "Se me amais, guardai os meus mandamentos." },<br/>
    { ref: "Gálatas 5:22-23", text: "Mas o fruto do Espírito é amor, gozo..." },<br/>
    { ref: "Efésios 2:19-20", text: "Edificados sobre o fundamento dos apóstolos..." },<br/>
    { ref: "2 Timóteo 3:15-17", text: "Toda a Escritura é inspirada por Deus..." },<br/>
    { ref: "Hebreus 12:9", text: "Sujeitemo-nos muito mais ao Pai..." },<br/>
    { ref: "Tiago 2:17-18", text: "A fé, se não tiver as obras, é morta..." },<br/>
    { ref: "1 Pedro 4:6", text: "Pregado o evangelho também aos mortos..." },<br/>
    { ref: "Apocalipse 20:12", text: "E os mortos foram julgados pelas coisas..." },<br/>
    { ref: "Mateus 5:14-16", text: "Vós sois a luz do mundo..." },<br/>
    { ref: "Mateus 11:28-30", text: "Vinde a mim, todos os que estais cansados..." },<br/>
    { ref: "Mateus 16:15-19", text: "Tu és o Cristo, o Filho do Deus vivo..." }
];

const challenges = [
    { date: "23 Ago", title: "Oração Matinal", status: "Concluído" },<br/>
    { date: "24 Ago", title: "Escritura em Família", status: "Pendente" },<br/>
    { date: "25 Ago", title: "Ato de Serviço", status: "Pendente" }
];

const weeklyLessons = [
    { day: "Seg", title: "Introdução ao Livro de Mórmon", ref: "Página de Título", status: "Concluído" },<br/>
    { day: "Ter", title: "O Sonho de Leí", ref: "1 Néfi 8", status: "Concluído" },<br/>
    { day: "Qua", title: "A Árvore da Vida", ref: "1 Néfi 11", status: "Pendente" },<br/>
    { day: "Qui", title: "O Grande Abismo", ref: "1 Néfi 12", status: "Pendente" },<br/>
    { day: "Sex", title: "Revisão Semanal", ref: "Resumo", status: "Pendente" }
];

const announcements = [
    { date: "20 Ago", title: "Festa de Encerramento", content: "Nossa festa será no próximo sábado às 18h na capela." },<br/>
    { date: "18 Ago", title: "Novos Manuais", content: "Os manuais do próximo semestre já estão disponíveis para retirada." }
];

const attendanceData = {
    present: 18, absent: 2, late: 1, rate: "86%",<br/>
    days: ["P", "P", "A", "P", "P", "L", "P", "P", "P", "A", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"]
};

const readingChunks = [
    { title: "Bloco 1", range: "1 Néfi 1 - 1 Néfi 15", progress: 65, activities: ["Resumo cap 8", "Mapa da jornada", "Lista de símbolos"] },<br/>
    { title: "Bloco 2", range: "1 Néfi 16 - 2 Néfi 5", progress: 20, activities: ["O Liahona", "Construção do navio", "Morte de Leí"] }
];

const makeupLessons = [
    { title: "A Visão de Leí", date: "15 Ago", material: "pdf_aula_05.pdf" },<br/>
    { title: "Néfi e o Labão", date: "12 Ago", material: "pdf_aula_03.pdf" }
];

// 
// PROFILE FUNCTIONS
// 

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            selectedAvatar = null;
            document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

function selectAvatar(avatarId) {
    selectedAvatar = avatarId;
    uploadedPhoto = null;
    document.getElementById('photo-upload').value = '';
    document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
    document.querySelector('[data-avatar="' + avatarId + '"]').classList.add('selected');
    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('preview-circle');
    preview.innerHTML = '';
    if (uploadedPhoto) {
        preview.innerHTML = '<img src="' + uploadedPhoto + '" alt="Sua foto">';
    } else if (selectedAvatar) {
        const avatar = avatars.find(a => a.id === selectedAvatar);
        preview.innerHTML = '<img src="' + avatar.file + '" alt="' + avatar.name + '">';
    } else {
        preview.innerHTML = '<span class="preview-placeholder">📷</span>';
    }
    const name = document.getElementById('student-name').value;
    document.getElementById('preview-name').innerText = name || 'Seu nome aparecerá aqui';
}

function saveProfile() {
    const name = document.getElementById('student-name').value.trim();
    const password = document.getElementById('student-password').value;
    const passwordConfirm = document.getElementById('student-password-confirm').value;
    if (!uploadedPhoto && !selectedAvatar) { alert('Escolha uma foto ou um avatar.'); return; }
    if (!name) { alert('Digite seu nome completo.'); return; }
    if (!password) { alert('Crie uma senha.'); return; }
    if (password !== passwordConfirm) { alert('As senhas não coincidem.'); return; }
    const student = {
        id: 'student_' + Date.now(),<br/>
        photo: uploadedPhoto || null,<br/>
        avatar: selectedAvatar || null,<br/>
        displayName: uploadedPhoto ? 'photo' : 'avatar',<br/>
        name: name,<br/>
        password: btoa(password),<br/>
        createdAt: new Date().toISOString()
    };
    let students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    students.push(student);
    localStorage.setItem('seminario_students', JSON.stringify(students));
    localStorage.setItem('seminario_current_user', student.id);
    const msg = document.getElementById('profile-saved-msg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 3000);
}

function showForgotPassword() {
    document.getElementById('forgot-modal').style.display = 'flex';
}
function closeForgotModal() {
    document.getElementById('forgot-modal').style.display = 'none';
    document.getElementById('recovery-result').innerHTML = '';
    document.getElementById('recovery-name').value = '';
}
function recoverPassword() {
    const name = document.getElementById('recovery-name').value.trim();
    if (!name) { alert('Digite seu nome completo.'); return; }
    let students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    const result = document.getElementById('recovery-result');
    if (student) {
        result.innerHTML = '<div class="recovery-success"><p>✅ Conta encontrada!</p><p>Sua senha é: <strong>' + atob(student.password) + '</strong></p><p class="hint">⚠️ Em um app real, a senha seria enviada por e-mail.</p></div>';
    } else {
        result.innerHTML = '<p class="recovery-fail">❌ Nenhum aluno encontrado com esse nome.</p>';
    }
}

// 
// NAVIGATION
// 

function navigateTo(pageId, title) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('page-title').innerText = title;
    const backBtn = document.getElementById('back-btn');
    const homeIcons = document.getElementById('home-icons');
    const settingsIcon = document.getElementById('settings-icon');
    if (pageId === 'home') {
        backBtn.classList.add('hidden');
        homeIcons.classList.remove('hidden');
        settingsIcon.classList.remove('hidden');
    } else {
        backBtn.classList.remove('hidden');
        homeIcons.classList.add('hidden');
        settingsIcon.classList.add('hidden');
    }
    window.scrollTo(0, 0);
}

function goBack() {
    navigateTo('home', 'Seminário');
}

// 
// RENDER FUNCTIONS
// 

function renderScriptures(filter) {
    filter = filter || "";
    const grid = document.getElementById('scripture-grid');
    grid.innerHTML = "";
    scriptures.filter(s => s.ref.toLowerCase().includes(filter.toLowerCase())).forEach(s => {
        grid.innerHTML += '<div class="scripture-card"><strong>' + s.ref + '</strong><p>' + s.text + '</p></div>';
    });
}

function filterScriptures() {
    const val = document.getElementById('scripture-search').value;
    renderScriptures(val);
}

function renderChallenges() {
    const list = document.getElementById('challenges-list');
    list.innerHTML = "";
    challenges.forEach(c => {
        list.innerHTML += '<div class="item-list"><span>' + c.date + ' - ' + c.title + '</span><span class="badge ' + (c.status === 'Concluído' ? 'done' : 'pending') + '">' + c.status + '</span></div>';
    });
}

function renderLessons() {
    const list = document.getElementById('weekly-lessons');
    list.innerHTML = "";
    weeklyLessons.forEach(l => {
        list.innerHTML += '<div class="item-list"><div><strong>' + l.day + '</strong>: ' + l.title + '</div><span class="badge ' + (l.status === 'Concluído' ? 'done' : 'pending') + '">' + l.status + '</span></div>';
    });
    document.getElementById('lesson-title').innerText = weeklyLessons[2].title;
    document.getElementById('lesson-ref').innerText = weeklyLessons[2].ref;
    const points = document.getElementById('lesson-points');
    points.innerHTML = "<li>Entender o simbolismo da árvore</li><li>Identificar os 4 grupos de pessoas</li>";
}

function renderAttendance() {
    document.getElementById('stat-pres').innerText = attendanceData.present;
    document.getElementById('stat-abs').innerText = attendanceData.absent;
    document.getElementById('stat-rate').innerText = attendanceData.rate;
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = "";
    attendanceData.days.forEach((d, i) => {
        let type = d === 'P' ? 'dot-present' : (d === 'A' ? 'dot-absent' : 'dot-late');
        grid.innerHTML += '<div class="day-dot ' + type + '">' + (i+1) + '</div>';
    });
}

function renderReading() {
    const container = document.getElementById('reading-container');
    container.innerHTML = "";
    readingChunks.forEach(chunk => {
        let acts = chunk.activities.map(a => '<div><input type="checkbox"> ' + a + '</div>').join("");
        container.innerHTML += '<div class="card"><h3>' + chunk.title + '</h3><p>' + chunk.range + '</p><div class="progress-container"><div class="progress-bar" style="width: ' + chunk.progress + '%"></div></div><div class="activities">' + acts + '</div></div>';
    });
}

function renderMakeup() {
    const list = document.getElementById('makeup-list');
    list.innerHTML = "";
    makeupLessons.forEach(m => {
        list.innerHTML += '<div class="card"><strong>' + m.title + '</strong><p>Falta em: ' + m.date + '</p><button class="btn-save" style="margin-top:10px; padding:8px">Baixar Material</button></div>';
    });
}

function renderAnnouncements() {
    const list = document.getElementById('announcements-list');
    list.innerHTML = "";
    announcements.forEach(a => {
        list.innerHTML += '<div class="card"><small>' + a.date + '</small><h4>' + a.title + '</h4><p>' + a.content + '</p></div>';
    });
}

// 
// ACTIONS
// 

function completeChallenge() {
    alert("Parabéns! Desafio concluído.");
}

function markLessonDone() {
    alert("Lição marcada como estudada!");
}

// 
// INITIALIZE
// 

window.onload = function() {
    renderScriptures();
    renderChallenges();
    renderLessons();
    renderAttendance();
    renderReading();
    renderMakeup();
    renderAnnouncements();
};