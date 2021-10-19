
var url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');

axios.get('https://b1x0b.sse.codesandbox.io/categories/'+ id)
.then(response => 
    `${document.querySelector('#nameCategory').value = response.data.name}`
)

var formAdd = document.querySelector('#form-add');
formAdd.addEventListener('submit', function(e){
    e.preventDefault();
    const post = {
        name: document.querySelector('#nameCategory').value,
    }

    axios.put('https://b1x0b.sse.codesandbox.io/categories/' + id, post)
    .then(response => alert('Sửa thành công'))
    .then(response => location.href = './category.html')
    .catch(() => alert('Sửa thất bại'))
})