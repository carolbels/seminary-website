// --- AVATAR DATA ---
const avatars = [
    { id: "moises", name: "Moisés",  file: "avatars/moises.png" },
    { id: "davi",   name: "Davi",    file: "avatars/davi.png" },
    { id: "ester",  name: "Ester",   file: "avatars/ester.png" },
    { id: "rute",   name: "Rute",    file: "avatars/rute.png" },
    { id: "jose",   name: "José",    file: "avatars/jose.png" },
    { id: "rebeca", name: "Rebeca",  file: "avatars/rebeca.png" }
];

let selectedAvatar = null;
let uploadedPhoto = null;

// --- MOCK DATA ---
const scriptures = [
    { ref: "1 Néfi 3:7", text: "Eu irei e cumprirei as ordens do Senhor..." },
    { ref: "2 Néfi 2:25", text: "Adão caiu para que os homens existissem..." },
    { ref: "2 Néfi 31:19-20", text: "Prossegui com firmeza em Cristo..." },
    { ref: "Mosias 2:17", text: "Quando estais a serviço de vosso próximo..." },
    { ref: "Mosias 3:19", text: "O homem natural é inimigo de Deus..." },
    { ref: "Alma 7:11-13", text: "E ele seguirá, sofrendo dores e aflições..." },
    { ref: "Alma 32:21", text: "Fé não é ter um conhecimento perfeito..." },
    { ref: "Helamã 5:12", text: "É sobre a rocha de nosso Redentor..." },
    { ref: "3 Néfi 11:10-11", text: "Eis que eu sou Jesus Cristo..." },
    { ref: "3 Néfi 27:27", text: "Que tipo de homens devereis ser?..." },
    { ref: "Éter 12:6", text: "Não recebeis testemunho senão depois..." },
    { ref: "Morôni 10:4-5", text: "Pergunteis a Deus, o Pai Eterno..." },
    { ref: "Tiago 1:5-6", text: "Se algum de vós tem falta de sabedoria..." },
    { ref: "João 14:15", text: "Se me amais, guardai os meus mandamentos." },
    { ref: "Gálatas 5:22-23", text: "Mas o fruto do Espírito é amor, gozo..." },
    { ref: "Efésios 2:19-20", text: "Edificados sobre o fundamento dos apóstolos..." },
    { ref: "2 Timóteo 3:15-17", text: "Toda a Escritura é inspirada por Deus..." },
    { ref: "Hebreus 12:9", text: "Sujeitemo-nos muito mais ao Pai..." },
    { ref: "Tiago 2:17-18", text: "A fé, se não tiver as obras, é morta..." },
    { ref: "1 Pedro 4:6", text: "Pregado o evangelho também aos mortos..." },
    { ref: "Apocalipse 20:12", text: "E os mortos foram julgados pelas coisas..." },
    { ref: "Mateus 5:14-16", text: "Vós sois a luz do mundo..." },
    { ref: "Mateus 11:28-30", text: "Vinde a mim, todos os que estais cansados..." },
    { ref: "Mateus 16:15-19", text: "Tu és o Cristo, o Filho do Deus vivo..." }
];

const challenges = [
    { date: "23 Ago", title: "Oração Matinal", status: "Concluído" },
    { date: "24 Ago", title: "Escritura em Família", status: "Pendente" },
    { date: "25 Ago", title: "Ato de Serviço", status: "Pendente" }
];

const weeklyLessons = [
    { day: "Seg", title: "Introdução ao Livro de Mórmon", ref: "Página de Título", status: "Concluído" },
    { day: "Ter", title: "O Sonho de Leí", ref: "1 Néfi 8", status: "Concluído" },
    { day: "Qua", title: "A Árvore da Vida", ref: "1 Néfi 11", status: "Pendente" },
    { day: "Qui", title: "O Grande Abismo", ref: "1 Néfi 12", status: "Pendente" },
    { day: "Sex", title: "Revisão Semanal", ref: "Resumo", status: "Pendente" }
];

const announcements = [
    { date: "20 Ago", title: "Festa de Encerramento", content: "Nossa festa será no próximo sábado às 18h na capela." },
    { date: "18 Ago", title: "Novos Manuais", content: "Os manuais do próximo semestre já estão disponíveis para retirada." }
];

const attendanceData = {
    present: 18, absent: 2, late: 1, rate: "86%",
    days: ["P", "P", "A", "P", "P", "L", "P", "P", "P", "A", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"]
};

const readingChunks = [
    { title: "Bloco 1", range: "1 Néfi 1 - 1 Néfi 15", progress: 65, activities: ["Resumo cap 8", "Mapa da jornada", "Lista de símbolos"] },
    { title: "Bloco 2", range: "1 Néfi 16 - 2 Néfi 5", progress: 20, activities: ["O Liahona", "Construção do navio", "Morte de Leí"] }
];

const makeupLessons = [
    { title: "A Visão de Leí", date: "15 Ago", material: "pdf_aula_05.pdf" },
    { title: "Néfi e o Labão", date: "12 Ago", material: "pdf_aula_03.pdf" }
];

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================
function togglePassword(inputId, btn) {
    var input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

// ============================================
// HEADER AVATAR
// ============================================
function updateHeaderAvatar() {
    var loggedIn = localStorage.getItem('seminario_logged_in');
    var headerAvatar = document.getElementById('header-avatar');
    if (!loggedIn) {
        headerAvatar.innerHTML = '👤';
        return;
    }
    var students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    var student = students.find(function(s) { return s.id === loggedIn; });
    if (student) {
        if (student.photo) {
            headerAvatar.innerHTML = '<img src="' + student.photo + '" alt="' + student.name + '">';
        } else if (student.avatar) {
            var avatar = avatars.find(function(a) { return a.id === student.avatar; });
            if (avatar) {
                headerAvatar.innerHTML = '<img src="' + avatar.file + '" alt="' + avatar.name + '">';
            }
        }
    }
}

// ============================================
// LOGIN / LOGOUT
// ============================================
function doLogin() {
    var name = document.getElementById('login-name').value.trim();
    var password = document.getElementById('login-password').value;
    if (!name || !password) { alert('Preencha nome e senha.'); return; }
    var students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    var student = students.find(function(s) {
        return s.name.toLowerCase() === name.toLowerCase() && atob(s.password) === password;
    });
    if (student) {
        localStorage.setItem('seminario_logged_in', student.id);
        document.getElementById('login-error').style.display = 'none';
        document.getElementById('login-name').value = '';
        document.getElementById('login-password').value = '';
        updateHeaderAvatar();
        navigateTo('home', 'Seminário');
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function checkLogin() {
    var loggedIn = localStorage.getItem('seminario_logged_in');
    if (loggedIn) {
        updateHeaderAvatar();
        navigateTo('home', 'Seminário');
    }
}

function doLogout() {
    localStorage.removeItem('seminario_logged_in');
    document.getElementById('header-avatar').innerHTML = '👤';
    navigateTo('login', 'Seminário');
}

// ============================================
// PROFILE FUNCTIONS
// ============================================
function previewPhoto(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            selectedAvatar = null;
            document.querySelectorAll('.avatar-option').forEach(function(el) { el.classList.remove('selected'); });
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

function selectAvatar(avatarId) {
    selectedAvatar = avatarId;
    uploadedPhoto = null;
    document.getElementById('photo-upload').value = '';
    document.querySelectorAll('.avatar-option').forEach(function(el) { el.classList.remove('selected'); });
    document.querySelector('[data-avatar="' + avatarId + '"]').classList.add('selected');
    updatePreview();
}

function updatePreview() {
    var preview = document.getElementById('preview-circle');
    preview.innerHTML = '';
    if (uploadedPhoto) {
        preview.innerHTML = '<img src="' + uploadedPhoto + '" alt="Sua foto">';
    } else if (selectedAvatar) {
        var avatar = avatars.find(function(a) { return a.id === selectedAvatar; });
        preview.innerHTML = '<img src="' + avatar.file + '" alt="' + avatar.name + '">';
    } else {
        preview.innerHTML = '<span class="preview-placeholder">📷</span>';
    }
    var name = document.getElementById('student-name').value;
    document.getElementById('preview-name').innerText = name || 'Seu nome aparecerá aqui';
}

// --- LOAD PROFILE FOR EDITING ---
function loadProfileForEditing() {
    var loggedIn = localStorage.getItem('seminario_logged_in');
    if (!loggedIn) return;

    var students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    var student = students.find(function(s) { return s.id === loggedIn; });
    if (!student) return;

    // Load existing name
    document.getElementById('student-name').value = student.name;

    // Load existing photo or avatar
    if (student.photo) {
        uploadedPhoto = student.photo;
        selectedAvatar = null;
        document.querySelectorAll('.avatar-option').forEach(function(el) { el.classList.remove('selected'); });
    } else if (student.avatar) {
        selectedAvatar = student.avatar;
        uploadedPhoto = null;
        document.querySelectorAll('.avatar-option').forEach(function(el) { el.classList.remove('selected'); });
        var avatarEl = document.querySelector('[data-avatar="' + student.avatar + '"]');
        if (avatarEl) avatarEl.classList.add('selected');
    }

    updatePreview();

    // Change button text to "Atualizar"
    document.getElementById('profile-save-btn').innerText = '🔄 Atualizar Perfil';
}

function saveProfile() {
    var name = document.getElementById('student-name').value.trim();
    var password = document.getElementById('student-password').value;
    var passwordConfirm = document.getElementById('student-password-confirm').value;
    if (!uploadedPhoto && !selectedAvatar) { alert('Escolha uma foto ou um avatar.'); return; }
    if (!name) { alert('Digite seu nome completo.'); return; }

    var loggedIn = localStorage.getItem('seminario_logged_in');
    var students = JSON.parse(localStorage.getItem('seminario_students') || '[]');

    if (loggedIn) {
        // UPDATE existing profile
        var student = students.find(function(s) { return s.id === loggedIn; });
        if (!student) { alert('Erro: conta não encontrada.'); return; }

        // Check name conflict (if changing name)
        var nameTaken = students.find(function(s) {
            return s.id !== loggedIn && s.name.toLowerCase() === name.toLowerCase();
        });
        if (nameTaken) { alert('Já existe outra conta com esse nome.'); return; }

        student.name = name;
        student.photo = uploadedPhoto || null;
        student.avatar = selectedAvatar || null;
        student.displayName = uploadedPhoto ? 'photo' : 'avatar';

        // Update password only if they typed a new one
        if (password) {
            if (password !== passwordConfirm) { alert('As senhas não coincidem.'); return; }
            student.password = btoa(password);
        }

        localStorage.setItem('seminario_students', JSON.stringify(students));
        updateHeaderAvatar();

        // Clear password fields
        document.getElementById('student-password').value = '';
        document.getElementById('student-password-confirm').value = '';

        var msg = document.getElementById('profile-saved-msg');
        msg.style.display = 'block';
        setTimeout(function() { msg.style.display = 'none'; }, 3000);
    } else {
        // CREATE new profile (original logic)
        if (!password) { alert('Crie uma senha.'); return; }
        if (password !== passwordConfirm) { alert('As senhas não coincidem.'); return; }

        var exists = students.find(function(s) { return s.name.toLowerCase() === name.toLowerCase(); });
        if (exists) { alert('Já existe uma conta com esse nome. Faça login.'); return; }

        var newStudent = {
            id: 'student_' + Date.now(),
            photo: uploadedPhoto || null,
            avatar: selectedAvatar || null,
            displayName: uploadedPhoto ? 'photo' : 'avatar',
            name: name,
            password: btoa(password),
            createdAt: new Date().toISOString()
        };
        students.push(newStudent);
        localStorage.setItem('seminario_students', JSON.stringify(students));
        localStorage.setItem('seminario_logged_in', newStudent.id);

        var msg2 = document.getElementById('profile-saved-msg');
        msg2.style.display = 'block';
        setTimeout(function() {
            msg2.style.display = 'none';
            updateHeaderAvatar();
            navigateTo('home', 'Seminário');
        }, 2000);
    }
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
    var name = document.getElementById('recovery-name').value.trim();
    if (!name) { alert('Digite seu nome completo.'); return; }
    var students = JSON.parse(localStorage.getItem('seminario_students') || '[]');
    var student = students.find(function(s) { return s.name.toLowerCase() === name.toLowerCase(); });
    var result = document.getElementById('recovery-result');
    if (student) {
        result.innerHTML = '<div class="recovery-success"><p>✅ Conta encontrada!</p><p>Sua senha é: <strong>' + atob(student.password) + '</strong></p><p class="hint">⚠️ Em um app real, a senha seria enviada por e-mail.</p></div>';
    } else {
        result.innerHTML = '<p class="recovery-fail">❌ Nenhum aluno encontrado com esse nome.</p>';
    }
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(pageId, title) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.getElementById(pageId).classList.add('active');
    document.getElementById('page-title').innerText = title;
    var backBtn = document.getElementById('back-btn');
    var homeIcons = document.getElementById('home-icons');
    var settingsIcon = document.getElementById('settings-icon');
    if (pageId === 'home') {
        backBtn.classList.add('hidden');
        homeIcons.classList.remove('hidden');
        settingsIcon.classList.remove('hidden');
        updateHeaderAvatar();
    } else if (pageId === 'login') {
        backBtn.classList.add('hidden');
        homeIcons.classList.add('hidden');
        settingsIcon.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
        homeIcons.classList.add('hidden');
        settingsIcon.classList.add('hidden');
    }

        // ADD THIS LINE — load profile data when visiting profile page
    if (pageId === 'profile') { loadProfileForEditing(); }
    
    window.scrollTo(0, 0);
}

function goBack() {
    navigateTo('home', 'Seminário');
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderScriptures(filter) {
    filter = filter || "";
    var grid = document.getElementById('scripture-grid');
    grid.innerHTML = "";
    scriptures.filter(function(s) { return s.ref.toLowerCase().includes(filter.toLowerCase()); }).forEach(function(s) {
        grid.innerHTML += '<div class="scripture-card"><strong>' + s.ref + '</strong><p>' + s.text + '</p></div>';
    });
}
function filterScriptures() {
    renderScriptures(document.getElementById('scripture-search').value);
}
function renderChallenges() {
    var list = document.getElementById('challenges-list');
    list.innerHTML = "";
    challenges.forEach(function(c) {
        list.innerHTML += '<div class="item-list"><span>' + c.date + ' - ' + c.title + '</span><span class="badge ' + (c.status === 'Concluído' ? 'done' : 'pending') + '">' + c.status + '</span></div>';
    });
}
function renderLessons() {
    var list = document.getElementById('weekly-lessons');
    list.innerHTML = "";
    weeklyLessons.forEach(function(l) {
        list.innerHTML += '<div class="item-list"><div><strong>' + l.day + '</strong>: ' + l.title + '</div><span class="badge ' + (l.status === 'Concluído' ? 'done' : 'pending') + '">' + l.status + '</span></div>';
    });
    document.getElementById('lesson-title').innerText = weeklyLessons[2].title;
    document.getElementById('lesson-ref').innerText = weeklyLessons[2].ref;
    document.getElementById('lesson-points').innerHTML = "<li>Entender o simbolismo da árvore</li><li>Identificar os 4 grupos de pessoas</li>";
}
function renderAttendance() {
    document.getElementById('stat-pres').innerText = attendanceData.present;
    document.getElementById('stat-abs').innerText = attendanceData.absent;
    document.getElementById('stat-rate').innerText = attendanceData.rate;
    var grid = document.getElementById('calendar-grid');
    grid.innerHTML = "";
    attendanceData.days.forEach(function(d, i) {
        var type = d === 'P' ? 'dot-present' : (d === 'A' ? 'dot-absent' : 'dot-late');
        grid.innerHTML += '<div class="day-dot ' + type + '">' + (i+1) + '</div>';
    });
}
function renderReading() {
    var container = document.getElementById('reading-container');
    container.innerHTML = "";
    readingChunks.forEach(function(chunk) {
        var acts = chunk.activities.map(function(a) { return '<div><input type="checkbox"> ' + a + '</div>'; }).join("");
        container.innerHTML += '<div class="card"><h3>' + chunk.title + '</h3><p>' + chunk.range + '</p><div class="progress-container"><div class="progress-bar" style="width: ' + chunk.progress + '%"></div></div><div class="activities">' + acts + '</div></div>';
    });
}
function renderMakeup() {
    var list = document.getElementById('makeup-list');
    list.innerHTML = "";
    makeupLessons.forEach(function(m) {
        list.innerHTML += '<div class="card"><strong>' + m.title + '</strong><p>Falta em: ' + m.date + '</p><button class="btn-save" style="margin-top:10px; padding:8px">Baixar Material</button></div>';
    });
}
function renderAnnouncements() {
    var list = document.getElementById('announcements-list');
    list.innerHTML = "";
    announcements.forEach(function(a) {
        list.innerHTML += '<div class="card"><small>' + a.date + '</small><h4>' + a.title + '</h4><p>' + a.content + '</p></div>';
    });
}

// ============================================
// ACTIONS
// ============================================
function completeChallenge() { alert("Parabéns! Desafio concluído."); }
function markLessonDone() { alert("Lição marcada como estudada!"); }

// ============================================
// INITIALIZE
// ============================================
window.onload = function() {
    checkLogin();
    renderScriptures();
    renderChallenges();
    renderLessons();
    renderAttendance();
    renderReading();
    renderMakeup();
    renderAnnouncements();
};