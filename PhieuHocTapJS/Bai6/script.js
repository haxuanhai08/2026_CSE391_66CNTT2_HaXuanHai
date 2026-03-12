/**
 * BÀI TẬP PROMISE - MSSV: 2451060655
 */

// --- BƯỚC 1: Tạo Promise mô phỏng lấy dữ liệu (delay 2s) ---
const fetchStudentData = (isError = false) => {
    return new Promise((resolve, reject) => {
        console.log("%c1. Đang gửi yêu cầu lấy dữ liệu...", "color: blue");
        
        setTimeout(() => {
            if (!isError) {
                // Giả lập dữ liệu thành công
                resolve({ 
                    id: "2451060655", 
                    name: "Hà Xuân Hải", 
                    grade: 9.0 
                });
            } else {
                // BƯỚC 4: Mô phỏng lỗi (reject)
                reject("Lỗi: Không thể kết nối đến Database!");
            }
        }, 2000);
    });
};

// --- BƯỚC 5: Chuyển đổi callback sang Promise (Promisification) ---
function oldLogSystem(message, callback) {
    setTimeout(() => {
        callback(null, "[Hệ thống] " + message);
    }, 1000);
}

const promisedLog = (message) => {
    return new Promise((resolve, reject) => {
        oldLogSystem(message, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// --- BƯỚC 2 & 3: Sử dụng .then(), .catch() và Chain Promises ---
// Ghi chú: Đổi tham số thành 'true' để test trường hợp lỗi ở BƯỚC 4
fetchStudentData(false) 
    .then((student) => {
        // BƯỚC 2: Xử lý kết quả bằng .then()
        console.log("2. Nhận dữ liệu sinh viên:", student.name);
        
        // BƯỚC 3: Chain sang bước tiếp theo (xử lý điểm số)
        const rank = student.grade >= 8 ? "Giỏi" : "Khá";
        return `Xếp loại: ${rank}`; 
    })
    .then((resultMessage) => {
        console.log("3. Kết quả xử lý:", resultMessage);
        
        // Gọi hàm đã chuyển đổi từ callback ở Bước 5
        return promisedLog("Hoàn thành bài tập JavaScript!");
    })
    .then((finalInfo) => {
        console.log("4.", finalInfo);
        console.log("%c--- CHƯƠNG TRÌNH KẾT THÚC ---", "color: green; font-weight: bold;");
    })
    .catch((error) => {
        // BƯỚC 4: Xử lý lỗi tập trung tại đây
        console.error("%c>>> LỖI TẬP TRUNG:", "color: red;", error);
    });