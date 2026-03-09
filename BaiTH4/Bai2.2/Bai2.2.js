const prices = { "ao": 150000, "quan": 350000, "giay": 500000 };
const form = document.getElementById('orderForm');

// 1. TÍNH TỔNG TIỀN TỰ ĐỘNG
function updateTotal() {
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const total = (prices[product] || 0) * qty;
    document.getElementById('display-total').innerText = total.toLocaleString("vi-VN");
}

document.getElementById('product').addEventListener('change', updateTotal);
document.getElementById('quantity').addEventListener('input', updateTotal);

// 2. ĐẾM KÝ TỰ REALTIME
document.getElementById('note').addEventListener('input', function() {
    const len = this.value.length;
    const countEl = document.getElementById('note-count');
    countEl.innerText = `${len}/200`;
    
    if (len > 200) {
        countEl.style.color = 'red';
        document.getElementById('err-note').style.display = 'block';
    } else {
        countEl.style.color = 'black';
        document.getElementById('err-note').style.display = 'none';
    }
});

// 3. VALIDATION KHI SUBMIT
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Sản phẩm
    if (!document.getElementById('product').value) {
        showError('err-product', true);
        isValid = false;
    } else showError('err-product', false);

    // Validate Số lượng
    const qty = document.getElementById('quantity').value;
    if (qty < 1 || qty > 99) {
        showError('err-quantity', true);
        isValid = false;
    } else showError('err-quantity', false);

    // Validate Ngày giao hàng
    const dateVal = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (isNaN(dateVal.getTime()) || dateVal < today || dateVal > maxDate) {
        showError('err-date', true);
        isValid = false;
    } else showError('err-date', false);

    // Validate Địa chỉ
    if (document.getElementById('address').value.trim().length < 10) {
        showError('err-address', true);
        isValid = false;
    } else showError('err-address', false);

    // Validate Payment
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
        showError('err-payment', true);
        isValid = false;
    } else showError('err-payment', false);

    // Nếu mọi thứ OK -> Hiện Modal xác nhận
    if (isValid) showConfirm();
});

function showError(id, isVisible) {
    document.getElementById(id).style.display = isVisible ? 'block' : 'none';
}

// 4. XỬ LÝ XÁC NHẬN
function showConfirm() {
    const productText = document.getElementById('product').options[document.getElementById('product').selectedIndex].text;
    const qty = document.getElementById('quantity').value;
    const total = document.getElementById('display-total').innerText;
    const date = document.getElementById('deliveryDate').value;

    document.getElementById('summary-content').innerHTML = `
        <p><b>Sản phẩm:</b> ${productText}</p>
        <p><b>Số lượng:</b> ${qty}</p>
        <p><b>Tổng tiền:</b> ${total}đ</p>
        <p><b>Ngày giao:</b> ${date}</p>
    `;
    document.getElementById('confirm-box').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeConfirm() {
    document.getElementById('confirm-box').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function finalSubmit() {
    alert("🎉 Chúc mừng Hải! Đơn hàng đã được đặt thành công.");
    form.reset();
    updateTotal();
    closeConfirm();
}