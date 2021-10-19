// search ajx
var $q = document.querySelector.bind(document);
$q('#q').addEventListener('input', _.debounce (function (e) {
    var q = $q('#q').value;
    axios.get('https://b1x0b.sse.codesandbox.io/products?q=' + q)
        .then(res => {
            $q('.hienthi').innerHTML = countSize = res.data.map((data, index) => {
                count = ++index;
                return `<a href="./product-detail.html?id=${data.id}" class="hienthi_item">
                        <img width="60px" style="border-radius: 3px" src="${data.image}" alt="">
                        <div class="hienthi_content">
                            <p>${data.name}</p>
                            <span>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}</span>
                        </div>
                    </a>`
            }).join('');

            if (countSize < 1) {
                $q('#hienthi-no').innerHTML = `Không tìm thấy kết quả nào phù hợp với từ khóa "${q}"`;
            } else {
                $q('#hienthi-no').innerHTML = `Có <b>${count}</b> kết quả tìm kiếm cho từ khóa "${q}"`;
            }
        });
}, 2000)
)