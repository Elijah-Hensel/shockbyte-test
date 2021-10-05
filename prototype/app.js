//index functionality

const loginBtn = document.getElementById("login-btn");
const usernameForm = document.getElementById("username");
const passwordForm = document.getElementById("password");
const errorSpan = document.getElementById("login-error-notif");

let user = [];

async function getAdmin() {
  await fetch("../user.json")
    .then((res) => res.json())
    .then((data) => {
      user = data;
      console.log(user);
    });
}

function clearLoginForm() {
  usernameForm.value = "";
  passwordForm.value = "";
}

if (loginBtn) {
  loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await getAdmin();
    console.log(usernameForm.value, passwordForm.value);
    if (
      usernameForm.value === user.username &&
      passwordForm.value === user.password
    ) {
      localStorage.setItem("adminAuth", true);
      window.location.href = "/list.html";
    } else {
      errorSpan.innerHTML = "Incorrect Email Or Password – Please Try Again";
      clearLoginForm();
    }

    // window.location.href = "/list.html";
  });
}

//list functionality

function listData(data) {
  document.getElementById("data-list").innerHTML = data.map((data) => {
    const dateFromData = new Date(data.up_since);
    const convDate = dateFromData.toLocaleDateString();
    let convTime = dateFromData.toTimeString();
    convTime = convTime.substring(0, convTime.lastIndexOf("G"));

    if (data.id <= 10) {
      return `<li class="data-list-item">
                    <p>${data.id}</p>
                    <p>${data.free_ram}</p>
                    <p>${data.allocated_ram}</p>
                    <p>${data.free_disk}</p>
                    <p>${data.allocated_disk}</p>
                    <p>${convDate} ${convTime}</p>
                </li>`;
    }
  });
}

async function fetchData() {
  if (!localStorage.getItem("adminAuth")) {
    return;
  }
  const res = await fetch(
    "https://600f10ec6c21e1001704e67a.mockapi.io/api/v1/stats"
  );
  const data = await res.json();
  listData(data);
  console.log(data);
}

fetchData();
