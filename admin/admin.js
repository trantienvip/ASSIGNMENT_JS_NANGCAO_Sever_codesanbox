//show product
var show = document.querySelector('#show');
axios.get('https://b1x0b.sse.codesandbox.io/products?_page=1&_limit=16')
.then(response => show.innerHTML = response.data.map((data, index) =>{
        // if (data.cate_id == 1) {
        //     danhmuc = 'Điện thoại';
        // }else if(data.cate_id == 2){
        //     danhmuc = 'Quần áo';
        // }else if(data.cate_id == 3){
        //     danhmuc = 'Đồ dùng học tập';
        // }
     return `<tr>
        <th scope="row">${++index}</th>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td><img width="80px" src="${data.image}" alt=""></td>
        <td><button value="${data.cate_id}" class="danhmucall"></button></td>
        <td><a class="btn btn-primary"href="./edit.html?id=${data.id}">Sửa</a></td>
        <td><button class="btn btn-danger bnt-confirm-delete" data-target="#deleteProduct" value="${data.id}" data-toggle="modal" href="./index.html?id=${data.id}">Xóa</button></td>
    </tr>`
    }).join(''))
    .then(() => {
        var danhmucall = document.querySelectorAll('.danhmucall');
        danhmucall.forEach(danhmucon => {
            danhmucon.innerHTML = danhmucon.value
            axios.get('https://b1x0b.sse.codesandbox.io/categories/'+danhmucon.value)
            .then(response => {
                return danhmucon.innerHTML = response.data ? response.data.name : 'Không có danh mục';
            })  
        });
    })
    .then(() => {
        var bntDelete = document.querySelectorAll('.bnt-confirm-delete');
        bntDelete.forEach(e => {
                e.addEventListener('click', function() {
                document.querySelector('#delete_ok').value = e.value;
            });
        });
    })
    .then(() => {
        var confirmA = document.querySelector('#delete_ok');
        confirmA.addEventListener('click', function(e) {
            axios.delete('https://b1x0b.sse.codesandbox.io/products/' + this.value)
            .then(() => location.reload())
        })
    })

    axios.get('https://b1x0b.sse.codesandbox.io/products')
    .then(response => response.data.map((data, index) => {
        var count = ++index;
        document.querySelector('.thongke').innerText = count
    }))

    //namecp
    if (localStorage.getItem('user')) {
        document.querySelector('.namecp').innerHTML = JSON.parse(localStorage.getItem('user')).user.email;
    }

    if (!JSON.parse(localStorage.getItem('user'))) {
        document.querySelector('body').innerHTML = 'Vui lòng  <a href="../cp"> đăng nhập </a>  để xem trang này';
        document.querySelector('body').classList.add('active');
    }else if(!(JSON.parse(localStorage.getItem('user')).user.id == 1)){
        document.querySelector('body').innerHTML = 'Xin chào '+ JSON.parse(localStorage.getItem('user')).user.email+ ' bạn không có quyền truy cập trang này';
        document.querySelector('body').classList.add('active');
    }

    //Logout
    function logout() {
        localStorage.removeItem('user');
        location.href ="./"
    }

    
        