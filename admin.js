const url = 'https://vue3-course-api.hexschool.io/';
const path = "hua430";

const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
const deleteBtn = document.querySelector(".deleteBtn");

const app = {
  data: {
    productData: [],
  },
  getData () {
    axios.get(`${url}api/${path}/admin/products`)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.products);
          this.data.productData = res.data.products;
          this.render();
        }
      });
  },
  render () {
    let str = "";
    this.data.productData.forEach((item) => {
      str += `
  <tr>
                            <td>${item.title}</td>
                            <td width="120">
                                ${item.origin_price}
                            </td>
                            <td width="120">
                                ${item.price}
                            </td>
                            <td width="100">
                            <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled = 1 ? 'checked' : ''} data-status="${item.id}" data-action="status">
                            <label class="form-check-label" for="${item.id}">${item.is_enabled = 1 ? '啟用' : '未啟用'}</label>
                          </div>
                            </td>
                            <td width="120">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-danger move deleteBtn"
                                    data-action="remove"
                                    data-id="${item.id}"
                                > 刪除</button>
                            </td>
                        </tr>
  `;
    });
    productList.innerHTML = str;
    productCount.textContent = this.data.productData.length;
    productList.addEventListener('click', this.deleteProduct);
  },
  deleteProduct (e) {
    const id = e.target.dataset.id;
    axios.delete(`${url}api/${path}/admin/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          swal('成功', `${res.data.message}`, 'success');
        }
        app.getData();
      });
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)huaToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.getData();
  }
};


app.created();