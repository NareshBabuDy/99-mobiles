// Customer Login Details
let Customers = [
  {
    cid: 101,
    name: "Naresh",
    email: "naresh",
    password: "123",
  },
  {
    cid: 102,
    name: "Sanjay",
    email: "sanjay",
    password: "123",
  },
];
// Admin Login Details
let Masters = [
  { aid: "101", name: "Admin Naresh", email: "Admin1", password: "123" },
  { aid: "102", name: "Admin Shiva", email: "Admin2", password: "123" },
];

// Product Details
let Items = [
  {
    pid: 10,
    pname: "Galaxy Z Fold5 (Special Edition)",
    price: "146999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-z-fold5-f946-467155-sm-f946bzugins-thumb-537252828",
  },
  {
    pid: 11,
    pname: "Galaxy Z Flip4 (Special Edition)",
    price: "83999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-z-flip5-f731-467157-sm-f731bzuains-thumb-537253047",
  },
  {
    pid: 12,
    pname: "Galaxy S23 Ultra",
    price: "104999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863401",
  },
  {
    pid: 13,
    pname: "Galaxy S22 Ultra",
    price: "92999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2202/gallery/in-galaxy-s22-ultra-s908-413016-sm-s908ezkginu-thumb-530969186",
  },

  {
    pid: 14,
    pname: "Galaxy S22",
    price: "66999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2202/gallery/in-galaxy-s22-s901-412948-sm-s901ezwginu-thumb-530964717",
  },

  {
    pid: 15,
    pname: "Galaxy S20 FE 5G",
    price: "26999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-g781bzggins/gallery/in-galaxy-s20-fe-5g-g781-sm-g781bzggins-thumb-405304989",
  },

  {
    pid: 16,
    pname: "Galaxy A54 5G (8GB RAM)",
    price: "34999",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a546ezwdins/gallery/in-galaxy-a54-5g-sm-a546-sm-a546ezwdins-thumb-538094452",
  },

  {
    pid: 17,
    pname: "Galaxy A14 (4GB RAM)",
    price: "12149",

    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a145fzkdins/gallery/in-galaxy-a14-sm-a145-sm-a145fzkdins-thumb-536656216",
  },
];

const reload = () => {
  location.reload();
};

const logout = () => {
  if ("cid" && "cname") {
    sessionStorage.removeItem("cid");
    sessionStorage.removeItem("cname");
    location.replace("/99-mobiles/index.html");
  } else if ("aid" && "uname") {
    sessionStorage.removeItem("aid");
    sessionStorage.removeItem("uname");
    location.replace("/99-mobiles/index.html");
  }
};

// On loading
window.addEventListener("load", () => {
  // Fetching User Data
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(Customers));
  }

  // Fetching Admin Data
  if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(Masters));
  }

  // Fetching Product Details
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(Items));
  }
  if (location.pathname === "/99-mobiles/pages/user/home.html") {
    if (sessionStorage.getItem("cid")) {
      uhome();
    } else {
      location.replace("/99-mobiles/pages/user/login.html");
    }
  }
  if (location.pathname === "/99-mobiles/pages/admin/home.html") {
    if (sessionStorage.getItem("aid")) {
      ahome();
    } else {
      location.replace("/99-mobiles/pages/admin/login.html");
    }
  }

  if (location.pathname === "/99-mobiles/pages/admin/add_product.html") {
    if (sessionStorage.getItem("aid")) {
      const username = document.getElementById("username");
      const uname = sessionStorage.getItem("uname");
      username.innerText = `Welcome ${uname}`;
    }

    
  }

  if (location.pathname === "/99-mobiles/pages/user/cart.html") {
    if (sessionStorage.getItem("cid")) {
      cartpage();
    } else {
      location.replace("/99-mobiles/pages/user/login.html");
    }
  }

  if (location.pathname === "/99-mobiles/pages/user/orders.html") {
    if (sessionStorage.getItem("cid")) {
      loadorder();
    }
  }
  if (location.pathname === "/99-mobiles/pages/admin/orders.html") {
    AdminOrderLoad();
  }
});

// random number
const getRandomNumber = (min = 100, max = 1000) => {
  return Math.floor(Math.random() * max);
};
// creating user id
const getRandomId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 100; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};
const usignin = () => {
  const uid = document.getElementById("uid");
  const upwd = document.getElementById("upwd");
  const msg = document.getElementById("notification");
  const ulen = uid.value.length;
  const plen = upwd.value.length;

  let errorMessage = "";

  if (ulen < 1 && plen < 1) {
    errorMessage = "Please Enter the Login Id & Password";
  } else if (plen > 0 && ulen < 1) {
    errorMessage = "Please Enter the Login Id";
  } else if (ulen > 0 && plen < 1) {
    errorMessage = "Please Enter the Password";
  }

  if (errorMessage) {
    msg.innerHTML = `
      <p class="text-danger fs-6 ms-2 my-2">
        ${errorMessage}
      </p>
      <button type="button" onclick="reload()" class="d-flex justify-content-center btn btn-danger">
        Ok
      </button>
    `;
  } else if (uid.value && upwd.value) {
    let user = JSON.parse(localStorage.getItem("users"));
    const validate = user.find(
      (user) => user.email === uid.value && user.password === upwd.value
    );
    if (!validate) {
      errorMessage = "Enter the Valid Credentials";
      msg.innerHTML = `
      <p class="text-danger fs-6 ms-2 my-2">
        ${errorMessage}
      </p>
      <button type="button" onclick="reload()" class="d-flex justify-content-center btn btn-danger">
        Ok
      </button>
    `;
    } else if (validate) {
      sessionStorage.setItem("cid", validate.cid);
      sessionStorage.setItem("cname", validate.name);
      location.replace("/99-mobiles/pages/user/home.html");
    }
  }
};
const Asignin = () => {
  const aid = document.getElementById("aid");
  const apwd = document.getElementById("apwd");
  const msg = document.getElementById("notification");
  const ulen = aid.value.length;
  const plen = apwd.value.length;

  let errorMessage = "";

  if (ulen < 1 && plen < 1) {
    errorMessage = "Please Enter the Login Id & Password";
  } else if (plen > 0 && ulen < 1) {
    errorMessage = "Please Enter the Login Id";
  } else if (ulen > 0 && plen < 1) {
    errorMessage = "Please Enter the Password";
  }

  if (errorMessage) {
    msg.innerHTML = `
      <p class="text-danger fs-6 ms-2 my-2">
        ${errorMessage}
      </p>
      <button type="button" onclick="reload()" class="d-flex justify-content-center btn btn-danger">
        Ok
      </button>
    `;
  } else if (aid.value && apwd.value) {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const Avalidate = admin.find(
      (adminData) =>
        adminData.email === aid.value && adminData.password === apwd.value
    );

    if (Avalidate) {
      sessionStorage.setItem("aid", Avalidate.aid);
      sessionStorage.setItem("uname", Avalidate.name);
      location.replace("/99-mobiles/pages/admin/home.html");
    } else if (!Avalidate) {
      errorMessage = "Enter the Valid Credentials";
      msg.innerHTML = `
      <p class="text-danger fs-6 ms-2 my-2">
        ${errorMessage}
      </p>
      <button type="button" onclick="reload()" class="d-flex justify-content-center btn btn-danger">
        Ok
      </button>
    `;
    }
  }
};
// Sign up
const signUp = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("emailid");
  const pwd = document.getElementById("Password");
  const cpwd = document.getElementById("confirm_Password");
  const msg = document.getElementById("notification");

  const lname = name.value.length;
  const lemail = email.value.length;
  const lpwd = pwd.value.length;
  const lcpwd = cpwd.value.length;

  let errorMessage = "";

  if (lname < 1 || lemail < 0 || lpwd < 1 || lcpwd < 1) {
    errorMessage = "Please Fill the Required Details";

    msg.innerHTML = `
        <p class="text-danger fs-6 ms-2 my-2">
          ${errorMessage}
        </p>
        <button type="button" onclick="reload()" class="d-flex justify-content-center btn btn-danger">
          Ok
        </button>
      `;
  }
  if (pwd.value === cpwd.value) {
    let user = JSON.parse(localStorage.getItem("users"));
    user.push({
      cid: getRandomId(),
      name: name.value,
      email: email.value,
      password: pwd.value,
    });

    localStorage.setItem("users", JSON.stringify(user));
    location.href = "/99-mobiles/pages/user/login.html";
  }
};

//Load Products
const uhome = () => {
  const rproducts = document.getElementById("products");
  const Products = JSON.parse(localStorage.getItem("products"));
  const username = document.getElementById("username");
  let main = "";

  for (let prod of Products) {
    main += `
    <div class="col-3 my-3">
    <div class="col-3">
      <div class="card" style="height: 30rem; width: 18rem">
        <img
          src="${prod.image}"
          class="card-img-top h-100"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${prod.pname}</h5>
          <p class="card-text fs-5">Best Price: ₹ ${prod.price}*</p>
          <a onclick="addtocart(${prod.pid})" class="w-100 btn btn-secondary align-bottom"
            >Add to Cart</a
          >
        </div>
      </div>
    </div>
  </div>
    `;
    rproducts.innerHTML = main;
  }
  const uname = sessionStorage.getItem("cname");
  username.innerText = `Welcome ${uname}`;
};
// Admin load
const ahome = () => {
  const rproducts = document.getElementById("products");
  let product = JSON.parse(localStorage.getItem("products"));

  let main = "";

  for (let prod of product) {
    main += `
    <div class="card mx-3 my-3  " style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${prod.image}" class="img-fluid rounded-start" alt="...">
          </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">${prod.pname}</h5>
            <p class="card-text">Best Price: ₹ ${prod.price}*</p>
            <a class="btn btn-primary" onclick = "editprod(${prod.pid})">Edit Product</a> <a onclick = "deleteprod(${prod.pid})"  class="btn btn-danger">Delete Product</a>
            </div>
            </div>
            </div>
            </div>
            `;

    rproducts.innerHTML = main;
  }

  const username = document.getElementById("username");
  const uname = sessionStorage.getItem("uname");

  username.innerText = `Welcome ${uname}`;
};
// 
const deleteprod = (pid) => {
  let products = JSON.parse(localStorage.getItem("products"));
  let filterproduct = products.filter((prodid) => prodid.pid !== pid);
  localStorage.setItem("products", JSON.stringify(filterproduct));
  ahome();
};
//
const Addproduct = () => {
  const name = document.getElementById("pname");
  const price = document.getElementById("pprice");
  const image = document.getElementById("image");
  const idref = document.getElementById("pid");
  let products = JSON.parse(localStorage.getItem("products"));
  let id = idref.value;
  
    products.push({
      pid: getRandomId("products"),
      pname: name.value,
      price: price.value,
      image: image.value,
    });
  localStorage.setItem("products", JSON.stringify(products));
  location.replace("/99-mobiles/pages/admin/home.html");
};

const addtocart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.pid === parseInt(id));
  if (!sessionStorage.getItem("cid")) {
    location.replace("/99-mobiles/login.html");
  } else {
    let userId = parseInt(sessionStorage.getItem("cid"));
    let cart = [];
//
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.pid === parseInt(id)
    );

    if (cartProduct) {
      cart = cart.map((product) => {
        if (
          product.pid === parseInt(id) &&
          product.userId === parseInt(userId)
        ) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const cartpage = () => {
  const tableref = document.getElementById("tablebody");
  const total = document.getElementById("totalamount");

  if (sessionStorage.getItem("cid")) {
    const userid = parseInt(sessionStorage.getItem("cid"));

    if (localStorage.getItem("cart")) {
      const cartlist = JSON.parse(localStorage.getItem("cart"));

      let body = "";
      const fildered_cartlist = cartlist.filter(
        (c) => c.userId === parseInt(userid)
      );
      let grandtotal = 0;
      for (let product of fildered_cartlist) {
        grandtotal += parseInt(product.price * product.count);
        body += `
    <tr>
              <th scope="row">${product.pname}</th>
              <td>${product.count}</td>
              <td>₹ ${product.price}</td>
              <td>₹ ${product.price * product.count} </td>
            </tr>
    `;
        tableref.innerHTML = body;
      }
      total.innerHTML = `
      <p>Total - ${grandtotal}</p>
      <button type="button" class="btn btn-primary" onclick="checkout(${grandtotal} )">Checkout</button>
        `;
    }
  }
};

const checkout = (id) => {
  const tableref = document.getElementById("orderlist");

  let order = [];

  const date = new Date();
  const formattedDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  if (sessionStorage.getItem("cid")) {
    const userid = parseInt(sessionStorage.getItem("cid"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (localStorage.getItem("order")) {
        order = JSON.parse(localStorage.getItem("order"));
      }
      const orderlist = cart.filter((c) => c.userId === parseInt(userid));

      order.push({
        customerid: userid,
        date: formattedDate,
        products: orderlist,
        price: id,
        status: "Pending",
      });

      const updated_cartlist = cart.filter(
        (c) => c.userId !== parseInt(userid)
      );
      localStorage.setItem("cart", JSON.stringify(updated_cartlist));
      localStorage.setItem("order", JSON.stringify(order));
      location.href = `/99-mobiles/pages/user/home.html`;
    }
  }
};

const loadorder = () => {
  const orderbody = document.getElementById("orderlist");

  const orders = JSON.parse(localStorage.getItem("order"));
  const userid = parseInt(sessionStorage.getItem("cid"));
  let body = "";

  const userorders = orders.filter((user) => user.customerid === userid);
  let product = "";
  for (let item of userorders) {
    for (let prod of item.products) {
      product += `<p>${prod.count} Nos ${prod.pname}</p>`;
    }

    body += `
    <tr>
    <th scope="row">${item.customerid}</th>
    <td>${item.date}</td>
    <td>${product}</td>
    <td>₹ ${item.price}</td>
    <td>${item.status}</td>
  </tr>`;
    // console.log(body);
  }

  orderbody.innerHTML = body;
};

const AdminOrderLoad = () => {
  const orderbody = document.getElementById("orderlist");
  const orders = JSON.parse(localStorage.getItem("order"));
  const userid = parseInt(sessionStorage.getItem("aid"));
  let body = "";

  for (let order of orders) {
    let product = "";
    for (prod of order.products) {
      product += `<p>${prod.count} * ${prod.pname}</p>`;
    }
    body += `
    <tr>
    <th scope="row">${order.customerid}</th>
    <td>${order.date}</td>
    <td>${product}</td>
    <td>₹ ${order.price}</td>
    <td><select class="form-select" id="${order.customerid}">
    <option value="Pending">Pending</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
    </select></td>
    </tr>
    `;
    orderbody.innerHTML = body;
  }
  for(let order of orders){
    const statusRef = document.getElementById(`${order.customerid}`);
    statusRef.value = order.status;
    statusRef.addEventListener("change", () => {
      const editedstatus =JSON.parse(localStorage.getItem("order"));
      const updatedstatus = editedstatus.map((stat) => {
        if(stat.customerid === order.customerid){
          return {...stat, status: statusRef.value}
        }
        else return stat;
      });
      localStorage.setItem("order", JSON.stringify(updatedstatus)); 
    });
  }
};
