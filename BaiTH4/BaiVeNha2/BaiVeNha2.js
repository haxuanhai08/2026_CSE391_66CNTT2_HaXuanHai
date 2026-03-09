const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progress = document.getElementById("progress-fill");
const stepText = document.getElementById("step-num");
const form = document.getElementById("regForm");

let currentStep = 0;

function showStep(n) {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === n);
    });

    // Cập nhật thanh tiến trình & số bước
    stepText.innerText = n + 1;
    progress.style.width = ((n + 1) / steps.length) * 100 + "%";

    // Ẩn/Hiện nút quay lại
    prevBtn.style.visibility = n === 0 ? "hidden" : "visible";

    // Đổi tên nút ở bước cuối
    nextBtn.innerText = n === steps.length - 1 ? "Gửi đăng ký" : "Tiếp theo";

    checkValidation();
}

function checkValidation() {
    let isValid = true;
    const inputs = steps[currentStep].querySelectorAll("input, select");

    inputs.forEach(input => {
        if (!input.checkValidity()) isValid = false;
    });

    // Logic kiểm tra mật khẩu ở bước 2
    if (currentStep === 1) {
        const p1 = document.getElementById("pass").value;
        const p2 = document.getElementById("confirm").value;
        if (p1 !== p2 || p1.length < 6) isValid = false;
    }

    nextBtn.disabled = !isValid;
}

// Khi người dùng nhập liệu, kiểm tra ngay để mở khóa nút "Tiếp theo"
form.addEventListener("input", checkValidation);

nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        if (currentStep === 2) {
            // Đổ dữ liệu vào bước xác nhận
            document.getElementById("review-data").innerHTML = `
                <p><strong>Họ tên:</strong> ${document.getElementById("name").value}</p>
                <p><strong>Ngày sinh:</strong> ${document.getElementById("dob").value}</p>
                <p><strong>Giới tính:</strong> ${document.getElementById("gender").value}</p>
                <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
            `;
        }
        showStep(currentStep);
    } else {
        alert("Đăng ký thành công! Cảm ơn bạn.");
    }
});

prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

// Khởi tạo
showStep(0);