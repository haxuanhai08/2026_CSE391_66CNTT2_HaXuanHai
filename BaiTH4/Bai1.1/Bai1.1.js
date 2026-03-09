let students = [];

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tbody = document.getElementById('tbodyStudent');
const statsArea = document.getElementById('statsArea');

const getRank = (score) => {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
};

const renderTable = () => {
    let html = '';
    let totalScore = 0;

    students.forEach((sv, index) => {
        const displayScore = parseFloat(sv.score.toFixed(1)); 
        const rank = getRank(displayScore); 
        
        const rowClass = displayScore < 5 ? 'highlight-weak' : '';
        totalScore += sv.score;

        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${displayScore.toFixed(1)}</td> 
                <td>${rank}</td>
                <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    const count = students.length;

    const avg = count > 0 ? (totalScore / count).toFixed(2) : "0.00";
    
    statsArea.innerText = `Tổng số sinh viên: ${count} | Điểm trung bình lớp: ${avg}`;
};

const handleAdd = () => {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "") {
        alert("Vui lòng không để trống họ tên!");
        txtName.focus();
        return;
    }
    if (isNaN(score) || score < 0 || score > 10) {
        alert("Điểm phải là số nằm trong khoảng từ 0 đến 10!");
        txtScore.focus();
        return;
    }

    students.push({ name, score });

    txtName.value = "";
    txtScore.value = "";
    txtName.focus();

    renderTable();
};

btnAdd.addEventListener('click', handleAdd);

txtScore.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAdd();
});

tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        
        if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
            students.splice(index, 1); 
            renderTable();
        }
    }
});