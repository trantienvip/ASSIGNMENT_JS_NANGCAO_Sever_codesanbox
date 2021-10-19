var product_all = document.querySelector('.all_product');
var $q = document.querySelector.bind(document);
var $qAll = document.querySelectorAll.bind(document);

var url = window.location.search;
const urlParams = new URLSearchParams(url);
const page = urlParams.get('page');
var urlAPI = `https://b1x0b.sse.codesandbox.io/products?_page=${page}&_limit=10`;

//page next
page ? pageSrc(page) : pageSrc(1);
function pageSrc(pageNumber) {
    var pageIteam = document.querySelectorAll('.page-item');
    if (pageNumber == 1) {
        pageIteam[0].classList.add('disabled');
    }
    pageIteam.forEach(e => {
        e.classList.remove('active');
    });

    $qAll('.page-item')[pageNumber].classList.add('active');
    $q('#previous_').href = '?page=' + (parseInt(pageNumber) - 1);
    $q('#next_').href = '?page=' + (parseInt(pageNumber) + 1);
}

// carosel
var carouselPro = document.querySelector('.carousel-product');
sliderX();
function sliderX(){
    const render = async () => {
        const {data} = await axios.get('https://b1x0b.sse.codesandbox.io/products/?_sort=id&_order=desc');
        product = data.map(data => {
           return `<div class="item">
                <a href="./product-detail.html?id=${data.id}"><img
                        src="${data.image}"
                        alt=""></a>
                <a href="./product-detail.html?id=${data.id}">
                    <h6>${data.name}</h6>
                </a>
            </div>`
        }).join('');
        carouselPro.innerHTML = product;
        afterRender()
    }
    render()
    
    const afterRender = () => {
             $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout: 1800,
                    autoplayHoverPause: true,
                },
                600: {
                    items: 3,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout: 1800,
                    autoplayHoverPause: true
                },
                1000: {
                    items: 5,
                    nav: false,
                    loop: false,
                    autoplay: true,
                    autoplayTimeout: 1800,
                    autoplayHoverPause: true
                }
            }
        })
    }
}

// hien  thi ban dau
axios.get(urlAPI)
    .then(res =>
        product_all.innerHTML = res.data.map(data =>
            showData(data.id, data.image, data.name, data.price, data.priceold, data.slug)
        ).join('')
    )

//sap xep tang giam

var sort_price_all = document.querySelector('#sort_price_all');
sort_price_all.addEventListener('change', function () {
    axios.get(urlAPI + '&_sort=price&_order=' + sort_price_all.value)
        .then(res =>
            product_all.innerHTML = res.data.map(data =>
                showData(data.id, data.image, data.name, data.price, data.priceold, data.slug)
            ).join('')
        )
})

//category
var category = document.querySelector('#category');
    category.addEventListener('change', function () {
        axios.get(urlAPI + '&cate_id='+category.value)
            .then(res =>
                product_all.innerHTML = res.data.map(data =>
                    showData(data.id, data.image, data.name, data.price, data.priceold, data.slug)
                ).join('')
            )
    })

//show data dung chung
function showData(id, image, name, price, priceold, slug) {
    return `<div class="box_sp col-md-2">
            <a href="./product-detail.html?id=${id}">
                <img width="100%" alt="" style="object-fit: contain"
                src="${image}">
                    
                <div class="content_sp">
                    <p class="title_sp">${name}</p>
                    <p class="price_sp">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</p>
                    <p class="price_sp_old">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceold)}</p>
                </div>
                <div class="giamgia">-${parseInt(priceold - price) / (parseInt(priceold)) * 100}%</div>
            </a>
            <img src="https://cf.shopee.vn/file/b809934fa3b980baaa303cf5c32eae22" alt="" class="giamgia_img">
        </div>`
}

// gio hang index
countCart()
function countCart() {
    var countCart = document.querySelector('.countCart');
    if (JSON.parse(localStorage.getItem("cart"))) {
        countCart.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
        countCart.classList.add('active')
    }
}

//Logout
function logout() {
    localStorage.removeItem('user');
    location.href ="./"
}

//show user
if (localStorage.getItem('user')) {
    document.querySelector('.information_user').style.display = 'flex';
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.showuser').innerHTML = JSON.parse(localStorage.getItem('user')).user.email;
}

//show category
var categoryProduct = document.querySelector('#category');
axios.get('https://b1x0b.sse.codesandbox.io/categories')
    .then(response => categoryProduct.innerHTML = response.data.map(data => `<option value='${data.id}'>${data.name}</option>`).join(''))