const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});
function login() {
    username = document.querySelector("#username");
    password = document.querySelector("#password");
    if (username.value == 'admin' && password.value == '123456') {
        alert('đăng nhập thành công');
    } else {
        alert('đăng nhập thất bại');
        return false;
    }
}

//dang ky
var formSignin = document.querySelector('#signup');
    formSignin.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#pass').value
        }

        axios.post('https://b1x0b.sse.codesandbox.io/register', user)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
        })
        .then(() => alert('Đăng ký thành công'))
        .catch(error => alert('Đăng ký thất bại => '+error.response.data))
    });

//dangnhap
var formSignin = document.querySelector('#signin');
    formSignin.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = {
            email: document.querySelector('#email_dn').value,
            password: document.querySelector('#pass_dn').value
        }
        // console.log(user);
        axios.post('https://b1x0b.sse.codesandbox.io/login', user)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
        })
        .then(() => {
        const userid = JSON.parse(localStorage.getItem('user'))
        console.log(userid)
        if (userid.user.id === 1) {
            console.log('admin')
            location.href = '/admin'
        }else{
            console.log('member')
            location.href = '../'
        }
         alert('Đăng nhập thành công')})
        .catch(error => alert('Đăng nhập thất bại => '+error.response.data))
    });


//tự điền
var email_dangnhap = document.querySelector('#email_dn');
var pass_dangnhap = document.querySelector('#pass_dn');
if (typeof(Storage) !== "undefined"){
    var tk = localStorage.getItem('user')
    email_dangnhap.value = JSON.parse(tk).user.email;
    // pass_dangnhap.value = JSON.parse(tk).accessToken
    // console.log(JSON.parse(tk))
}

