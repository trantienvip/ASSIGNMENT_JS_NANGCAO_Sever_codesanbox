var formAdd = document.querySelector('#form-add');
formAdd.addEventListener('submit', function(e){
    e.preventDefault();
    const category = {
        id: Math.random().toString(9).substr(2, 9),
        name: document.querySelector('#nameCategory').value,
    }

    axios.post('https://b1x0b.sse.codesandbox.io/categories', category)
    .then(() => alert('Thêm thành công'))
    .then(() => location.href = './category.html')
    .catch(error => alert('Thêm thất bại => '+error.response.data))
})