const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');
const btnContainer = document.querySelector('.btn-container');
const btn = document.querySelector('#login-btn');
const form = document.querySelector('form');
const msg = document.querySelector('.msg');
btn.disabled = true;

function shiftButton() {
    const isEmpty = uname.value === '' || pass.value === '';
    if (isEmpty) {
        showMsg();
        const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
        const currentPosition = positions.find(dir => btn.classList.contains(dir));
        const nextPosition = positions[(positions.indexOf(currentPosition) + 1) % positions.length];
        btn.classList.remove(currentPosition);
        btn.classList.add(nextPosition);
    }
}

function showMsg() {
    const isEmpty = uname.value === '' || pass.value === '';
    btn.classList.toggle('no-shift', !isEmpty);

    if (isEmpty) {
        btn.disabled = true;
        msg.style.color = 'rgb(218 49 49)';
        msg.innerText = 'Please fill the input fields before proceeding';
    } else {
        msg.innerText = 'Great! Now you can proceed';
        msg.style.color = '#92ff92';
        btn.disabled = false;
        btn.classList.add('no-shift');
    }
}

btnContainer.addEventListener('mouseover', shiftButton);
btn.addEventListener('mouseover', shiftButton);
form.addEventListener('input', showMsg);
btn.addEventListener('touchstart', shiftButton);

btn.addEventListener('click', function (e) {
    e.preventDefault();

    const username = uname.value.trim();
    const password = pass.value.trim();

    const validUsername = "ryoma";
    const validPassword = "dafa123";

    if (username === validUsername && password === validPassword) {
        msg.innerText = 'Login successful!'; // Pesan sukses
        msg.style.color = '#92ff92';
        btn.classList.add('no-shift'); // Menonaktifkan pergerakan tombol
        // Redirect ke halaman utama setelah beberapa detik
        setTimeout(() => {
            window.location.href = 'apay.html';
        }, 1000); // 1 detik delay
    } else {
        msg.innerText = 'Username atau password salah!';
        msg.style.color = 'rgb(218 49 49)';
    }
});
