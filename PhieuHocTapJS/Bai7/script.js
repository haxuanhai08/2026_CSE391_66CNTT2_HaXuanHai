/**
 * BÀI TẬP ASYNC/AWAIT - MSSV: 2451060655
 */

// Yêu cầu 5: Tham chiếu đến các phần tử DOM
const userListElement = document.getElementById('user-list');
const statusElement = document.getElementById('status');

// Yêu cầu 1, 2, 3, 4: Hàm lấy dữ liệu bằng Async/Await và Fetch API
async function displayUsers() {
    try {
        // Thông báo trạng thái đang tải
        statusElement.innerHTML = '<p class="loading">Đang tải dữ liệu từ API...</p>';

        // Yêu cầu 2: Sử dụng Fetch API để gọi API công khai (JSONPlaceholder)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Kiểm tra nếu phản hồi không thành công (vd: lỗi 404, 500)
        if (!response.ok) {
            throw new Error(`Lỗi phản hồi mạng: ${response.status}`);
        }

        // Yêu cầu 4: Lấy dữ liệu và xử lý JSON
        const users = await response.json();

        // Xóa trạng thái đang tải
        statusElement.innerHTML = '';

        // Yêu cầu 5: Hiển thị dữ liệu lên giao diện (DOM)
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Họ tên:</strong> ${user.name} <br>
                <strong>Email:</strong> ${user.email} <br>
                <strong>Công ty:</strong> ${user.company.name}
            `;
            userListElement.appendChild(li);
        });

        console.log("%c--- Dữ liệu đã được hiển thị lên DOM ---", "color: green");

    } catch (error) {
        // Yêu cầu 3: Quản lý lỗi bằng khối try/catch
        statusElement.innerHTML = `<p class="error">Đã xảy ra lỗi: ${error.message}</p>`;
        console.error("Lỗi khi fetch dữ liệu:", error);
    }
}

// Thực thi hàm
displayUsers();