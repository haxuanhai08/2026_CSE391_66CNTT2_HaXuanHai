// 1. Thay đổi văn bản tiêu đề bằng textContent
const title = document.getElementById('title');
title.textContent = "Tiêu đề đã được thay đổi!";

// 2. Chèn thêm mã HTML vào một div bằng innerHTML
const container = document.getElementById('my-container');
container.innerHTML = "<p style='color: blue;'>Đoạn văn này được chèn bằng <strong>innerHTML</strong>.</p>";

// 3. Sử dụng createElement để tạo một thẻ <li> mới
const newLi = document.createElement('li');
newLi.textContent = "Mục mới được thêm tự động";

// 4. Append phần tử vừa tạo vào danh sách <ul>
const list = document.getElementById('my-list');
list.appendChild(newLi);

// 5. Thử xóa một phần tử bằng phương thức remove()
// Ví dụ: Khi click vào nút, sẽ xóa phần tử đầu tiên trong danh sách
const deleteBtn = document.getElementById('btn-delete');
deleteBtn.onclick = function() {
    const firstItem = document.querySelector('li'); // Lấy phần tử li đầu tiên
    if (firstItem) {
        firstItem.remove();
        console.log("Đã xóa một phần tử!");
    } else {
        alert("Không còn gì để xóa!");
    }
};