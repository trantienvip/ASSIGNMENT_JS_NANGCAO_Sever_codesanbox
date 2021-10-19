//Convert name product to slug
function slug(name) {
    var baseSlug = name.split(" ").join("-");
    return   baseSlug.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D')
            .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
            .toLowerCase();
}

// Config FireBase
const firebaseConfig = {
    apiKey: "AIzaSyC4l6BKjo3Bt_wUaPFgT2Ls5zEYvdz26U8",
    authDomain: "jsnangcao-e08a5.firebaseapp.com",
    projectId: "jsnangcao-e08a5",
    storageBucket: "jsnangcao-e08a5.appspot.com",
    messagingSenderId: "623886725442",
    appId: "1:623886725442:web:e8aa58b28534d327ffd8db",
    measurementId: "G-6SL0L3GD5F"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function themsp(congViec, time){
    return new Promise(function(resolve){

        setTimeout(function(){ 
            console.log(congViec)
            resolve()
            console.log('Hoàn thành công việc')
        }, time);
    });
}


var formAdd = document.querySelector('#form-add');
var urlImg='';
formAdd.addEventListener('submit', function(e){
    e.preventDefault();
    themsp(upload(), 3000)
    .then(() => themsp(
        post = {
            id: Math.random().toString(9).substr(2, 9),
            name: document.querySelector('#nameProduct').value,
            cate_id: document.querySelector('#categoryProduct').value,
            price: parseInt(document.querySelector('#priceProduct').value),
            priceold: parseInt(document.querySelector('#oldProduct').value),
            detail: document.querySelector('#detailProduct').value,
            image: urlImg,
            slug: slug(document.querySelector('#nameProduct').value),
        },1000)
    )
    .then(() => themvaoDatabase(post), 1000);
})

//category
var categoryProduct = document.querySelector('#categoryProduct');
axios.get('https://b1x0b.sse.codesandbox.io/categories')
    .then(response => categoryProduct.innerHTML = response.data.map(data => `<option value='${data.id}'>${data.name}</option>`).join(''))

//upload IMG
function upload() {
    var image = document.getElementById('image').files[0];
    var imageName = image.name;
    var storageRef = firebase.storage().ref('images/' + imageName);
    var uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {
        console.log(error.message);
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL()
            .then(function (downloadURL) {
                urlImg = downloadURL;
                console.log('linkanh',downloadURL);
            })
    })
}

//them
function themvaoDatabase(post) {
    axios.post('https://b1x0b.sse.codesandbox.io/products', post)
    .then(() => alert('Thêm thành công'))
    .catch(error => alert('Thêm thất bại => '+error.response.data))
}