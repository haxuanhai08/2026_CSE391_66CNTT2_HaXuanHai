const form = document.getElementById('reg-form');
const container = document.getElementById('reg-container');
const successMsg = document.getElementById('success-msg');

// 1. Hàm tiện ích
const showError = (id, msg) => {
    const errorEl = document.getElementById(`error-${id}`);
    errorEl.innerText = msg;
    errorEl.style.display = 'block';
};

const clearError = (id) => {
    const errorEl = document.getElementById(`error-${id}`);
    errorEl.innerText = '';
    errorEl.style.display = 'none';
};

// 2. Các hàm validate từng trường
const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!val) return showError('fullname', 'Không được để trống'), false;
    if (val.length < 3) return showError('fullname', 'Phải từ 3 ký tự trở lên'), false;
    if (!regex.test(val)) return showError('fullname', 'Chỉ chứa chữ cái và khoảng trắng'), false;
    clearError('fullname');
    return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return showError('email', 'Email không được trống'), false;
    if (!regex.test(val)) return showError('email', 'Định dạng email không hợp lệ'), false;
    clearError('email');
    return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!val) return showError('phone', 'SĐT không được trống'), false;
    if (!regex.test(val)) return showError('phone', 'SĐT phải có 10 số và bắt đầu bằng số 0'), false;
    clearError('phone');
    return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!val) return showError('password', 'Mật khẩu không được trống'), false;
    if (!regex.test(val)) return showError('password', 'Tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 số'), false;
    clearError('password');
    return true;
};

const validateConfirm = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;
    if (confirm !== pass || !confirm) return showError('confirm-password', 'Mật khẩu không khớp'), false;
    clearError('confirm-password');
    return true;
};

const validateGender = () => {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) return showError('gender', 'Vui lòng chọn giới tính'), false;
    clearError('gender');
    return true;
};

const validateTerms = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) return showError('terms', 'Bạn phải đồng ý với điều khoản'), false;
    clearError('terms');
    return true;
};

// 3. Xử lý logic Nâng cấp (Mới thêm)
// Đếm ký tự Họ tên
document.getElementById('fullname').addEventListener('input', function() {
    document.getElementById('char-count').innerText = `${this.value.length}/50`;
});

// Ẩn hiện mật khẩu
document.getElementById('toggle-password').addEventListener('click', function() {
    const passInput = document.getElementById('password');
    const type = passInput.type === 'password' ? 'text' : 'password';
    passInput.type = type;
    this.innerText = type === 'password' ? '👁' : '🙈';
});

// Thanh sức mạnh mật khẩu
document.getElementById('password').addEventListener('input', function() {
    const val = this.value;
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (val === "") {
        bar.style.width = '0';
        text.innerText = '';
    } else if (score <= 2) {
        bar.style.width = '33%'; bar.style.background = 'red';
        text.innerText = 'Yếu'; text.style.color = 'red';
    } else if (score === 3) {
        bar.style.width = '66%'; bar.style.background = 'orange';
        text.innerText = 'Trung bình'; text.style.color = 'orange';
    } else {
        bar.style.width = '100%'; bar.style.background = 'green';
        text.innerText = 'Mạnh'; text.style.color = 'green';
    }
});

// 4. Gán sự kiện Blur & Input (Giữ nguyên logic cũ)
const inputs = [
    { id: 'fullname', func: validateFullname },
    { id: 'email', func: validateEmail },
    { id: 'phone', func: validatePhone },
    { id: 'password', func: validatePassword },
    { id: 'confirm-password', func: validateConfirm }
];

inputs.forEach(item => {
    const el = document.getElementById(item.id);
    el.addEventListener('blur', item.func);
    el.addEventListener('input', () => clearError(item.id));
});

// 5. Xử lý Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = validateFullname() & validateEmail() & validatePhone() & 
                    validatePassword() & validateConfirm() & validateGender() & validateTerms();

    if (isValid) {
        const name = document.getElementById('fullname').value;
        container.style.display = 'none';
        successMsg.innerHTML = `Đăng ký thành công! 🎉 <br> Chào mừng, ${name}!`;
        successMsg.style.display = 'block';
    }
});