// Chọn các phần tử cần thiết
const mainBtn = document.getElementById('mainBtn');
const title = document.getElementById('title');
const myBox = document.getElementById('myBox');

// 1. Gán sự kiện click cho nút bấm & Thay đổi textContent
mainBtn.addEventListener('click', function() {
    title.textContent = "Bạn vừa nhấn nút!";
});

// 2. Thử nghiệm gán nhiều listeners khác nhau cho cùng 1 phần tử
// Listener thứ nhất: Thông báo
mainBtn.addEventListener('click', () => {
    console.log("Listener 1: Nút đã được nhấn.");
});

// Listener thứ hai: Thay đổi style
mainBtn.addEventListener('click', () => {
    mainBtn.style.fontWeight = "bold";
    console.log("Listener 2: Đã in đậm chữ trên nút.");
});

// 3. Lắng nghe sự kiện mouseenter / mouseleave
myBox.addEventListener('mouseenter', () => {
    myBox.textContent = "Chuột đã vào!";
    myBox.style.borderColor = "red";
});

myBox.addEventListener('mouseleave', () => {
    myBox.textContent = "Chuột đã ra!";
    myBox.style.borderColor = "#333";
});

// 4. Toggle class để đổi màu nền khi click nút
mainBtn.addEventListener('click', () => {
    // Mỗi lần click sẽ thêm/xóa class 'bg-active' cho body hoặc chính nút đó
    document.body.classList.toggle('bg-active');
});