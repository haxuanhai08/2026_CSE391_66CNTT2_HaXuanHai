let students = []; 
let sortDirection = 0; 

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tbody = document.getElementById('tbodyStudent');
const statsArea = document.getElementById('statsArea');
const txtSearch = document.getElementById('txtSearch');
const selRank = document.getElementById('selRank');
const sortScore = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

const getRank = (score) => {
    const s = parseFloat(score.toFixed(1)); 
    if (s >= 8.5) return "Giỏi";
    if (s >= 7.0) return "Khá";
    if (s >= 5.0) return "Trung bình";
    return "Yếu";
};

const applyFilters = () => {
    const keyword = txtSearch.value.toLowerCase();
    const rankFilter = selRank.value;

    let filtered = students.filter(sv => {
        const matchesName = sv.name.toLowerCase().includes(keyword);
        const matchesRank = rankFilter === "All" || getRank(sv.score) === rankFilter;
        return matchesName && matchesRank;
    });

    if (sortDirection !== 0) {
        filtered.sort((a, b) => {
            const scoreA = parseFloat(a.score.toFixed(1));
            const scoreB = parseFloat(b.score.toFixed(1));
            return sortDirection === 1 ? scoreA - scoreB : scoreB - scoreA;
        });
    }

    renderTable(filtered);
};

const renderTable = (dataToDisplay) => {
    let html = '';
    let totalScore = 0;

    if (dataToDisplay.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Không có kết quả phù hợp</td></tr>`;
        statsArea.innerText = `Tổng số SV: 0 | Điểm TB: 0`;
        return;
    }

    dataToDisplay.forEach((sv, index) => {
        const displayScore = parseFloat(sv.score.toFixed(1));
        const rank = getRank(sv.score);
        totalScore += displayScore;

        html += `
            <tr class="${displayScore < 5 ? 'highlight-weak' : ''}">
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${displayScore.toFixed(1)}</td>
                <td>${rank}</td>
                <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    const avg = (totalScore / dataToDisplay.length).toFixed(2);
    statsArea.innerText = `Tổng số SV: ${dataToDisplay.length} | Điểm TB: ${avg}`;
};

const addNewStudent = () => {
    const name = txtName.value.trim();
    const scoreText = txtScore.value; 
    const score = parseFloat(scoreText);

    if (name === "" || scoreText === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ id: Date.now(), name, score });
    
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
    applyFilters(); 
};


btnAdd.addEventListener('click', addNewStudent);

txtScore.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewStudent();
});

tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(sv => sv.id !== idToDelete);
        applyFilters();
    }
});

txtSearch.addEventListener('input', applyFilters);
selRank.addEventListener('change', applyFilters);

sortScore.addEventListener('click', () => {
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1;
        sortIcon.innerText = "▲";
    } else {
        sortDirection = -1;
        sortIcon.innerText = "▼";
    }
    applyFilters();
});
