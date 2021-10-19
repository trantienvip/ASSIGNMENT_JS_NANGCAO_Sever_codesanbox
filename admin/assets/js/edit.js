function slug(name) {
    var baseSlug = name.split(" ").join("-");
    return  baseSlug.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D')
            .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
            .toLowerCase();
}

var url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');

var categoryProduct = document.querySelector('#cate_id');
axios.get('https://b1x0b.sse.codesandbox.io/categories')
    .then(response => categoryProduct.innerHTML = response.data.map(data => `<option value='${data.id}'>${data.name}</option>`).join(''))
    
axios.get('https://b1x0b.sse.codesandbox.io/products/'+ id)
.then(response => 
    `${document.querySelector('#nameProduct').value = response.data.name,
    document.querySelector('#priceProduct').value = response.data.price,
    document.querySelector('#oldProduct').value = response.data.priceold,
    document.querySelector('#detailProduct').value = response.data.detail,
    document.querySelector('#imageProduct').value = response.data.image,
    document.querySelector('#cate_id').value = response.data.cate_id}`
)

var formAdd = document.querySelector('#form-add');
formAdd.addEventListener('submit', function(e){
    e.preventDefault();
    const post = {
        name: document.querySelector('#nameProduct').value,
        cate_id: document.querySelector('#cate_id').value,
        price: parseInt(document.querySelector('#priceProduct').value),
        priceold: parseInt(document.querySelector('#oldProduct').value),
        detail: document.querySelector('#detailProduct').value,
        image: document.querySelector('#imageProduct').value,
        slug: slug(document.querySelector('#nameProduct').value),
    }

    axios.put('https://b1x0b.sse.codesandbox.io/products/' + id, post)
    .then(response => alert('Sửa thành công'))
    .then(response => location.href = './index.html')
    .catch(() => alert('Sửa thất bại'))
})