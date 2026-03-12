// --- 1. Click Event Listener ---
const btn = document.getElementById('myButton');
btn.addEventListener('click', (event) => {
    alert('Yêu cầu 1: Bạn đã click vào nút!');
    // Lưu ý: Nếu muốn dừng bubbling ngay tại đây, dùng: event.stopPropagation();
});

// --- 2. Keyboard Event Listener ---
// Lắng nghe phím nhấn trên toàn bộ trang web
document.addEventListener('keydown', (event) => {
    console.log(`Yêu cầu 2: Bạn vừa nhấn phím [${event.key}]`);
});

// --- 3. Form Submit & Prevent Default ---
const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // CHỐT CHẶN: Ngăn trình duyệt load lại trang
    const value = document.getElementById('myInput').value;
    console.log('Yêu cầu 3: Form đã submit dữ liệu:', value);
    alert('Đã chặn load trang thành công! Kiểm tra Console để xem dữ liệu.');
});

// --- 4. Kiểm tra Bubbling (Sự lan truyền) ---
const gp = document.getElementById('grandparent');
const parent = document.getElementById('parent');

gp.addEventListener('click', () => {
    console.log('Bubbling: Sự kiện lan tới tận Ông nội (Grandparent)');
});

parent.addEventListener('click', () => {
    console.log('Bubbling: Sự kiện lan tới Cha (Parent)');
});
// Thử nghiệm: Khi click vào nút "1. Click vào tôi", bạn sẽ thấy Console hiện cả 3 thông báo.

// --- 5. Event Delegation (Ủy quyền sự kiện) ---
// Thay vì gán click cho từng thẻ <li>, ta gán cho thẻ <ul> duy nhất.
const list = document.getElementById('myList');
list.addEventListener('click', (event) => {
    // Kiểm tra xem phần tử thực sự bị click có phải là <li> không
    if (event.target && event.target.nodeName === 'LI') {
        console.log('Yêu cầu 5: Bạn click vào nội dung:', event.target.innerText);
        event.target.style.backgroundColor = 'yellow'; // Đánh dấu cho vui
    }
});