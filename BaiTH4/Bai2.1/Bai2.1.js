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
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/; // Hỗ trợ tiếng Việt có dấu
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

// 3. Gán sự kiện Blur & Input
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

// 4. Xử lý Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Sử dụng toán tử bitwise & để chạy tất cả các hàm validate
    // Note: 1 & 0 = 0 (false), 1 & 1 = 1 (true)
    const isFullnameValid = validateFullname() ? 1 : 0;
    const isEmailValid = validateEmail() ? 1 : 0;
    const isPhoneValid = validatePhone() ? 1 : 0;
    const isPassValid = validatePassword() ? 1 : 0;
    const isConfirmValid = validateConfirm() ? 1 : 0;
    const isGenderValid = validateGender() ? 1 : 0;
    const isTermsValid = validateTerms() ? 1 : 0;

    const isValid = isFullnameValid & isEmailValid & isPhoneValid & 
                    isPassValid & isConfirmValid & isGenderValid & isTermsValid;

    if (isValid) {
        const name = document.getElementById('fullname').value;
        container.style.display = 'none';
        successMsg.innerHTML = `Đăng ký thành công! 🎉 <br> Chào mừng, ${name}!`;
        successMsg.style.display = 'block';
    }
});