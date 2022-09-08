'use strict';
//khai báo biến input
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
//biến checkbox
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
//button
const btnSubmit = document.getElementById('submit-btn');
const btnShowHealthy = document.getElementById('healthy-btn');
const tableBodyEl = document.getElementById('tbody');
const btnCalculateBMI = document.getElementById('calculate-btn');
//mảng petarray
let petArr = [];

var a = getFromStorage('petArr');
if (a != null) {
  petArr = a;
  renderTableData(petArr);
}

//submit button
btnSubmit.addEventListener('click', function () {
  //lấy data từ form input
  const dataInput = {
    id: inputId.value,
    petname: inputName.value,
    // use parseInt to convert string to integer
    age: parseInt(inputAge.value),
    type: inputType.value,
    petWeight: parseInt(inputWeight.value),
    petLength: parseInt(inputLength.value),
    color: inputColor.value,
    breed: inputBreed.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,

    date:
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear(),
  };

  //ghi dữ liệu vào mảng
  //biến validated lưu kết quả từ checkValidForm
  const validated = checkValidForm(dataInput);
  if (validated) {
    //thêm pet data vào mảng
    petArr.push(dataInput);
    //hiển thị data ra bảng
    renderTableData(petArr);
    // init form data
    initForm();
  }
  saveToStorage('petArr', petArr);
  getFromStorage('petArr', petArr);
  // console.log(petArr);
});
//Validate dataInput
function checkValidForm() {
  //kiểm tra giá trị input luôn đúng
  let checked = true;
  //ID must unique
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === inputId.value) {
      alert('ID must unique!');
      checked = false;
      break;
    }
  }

  //check data có được nhập vào không
  if (!inputId.value) {
    alert('Please enter ID!');
    checked = false;
  }
  if (!inputName.value) {
    alert('Please enter Name!');
    checked = false;
  }
  if (!inputAge.value) {
    alert('Please enter Age!');
    checked = false;
  } else if (inputAge.value < 1 || inputAge.value > 15) {
    alert('Age must be between 1 and 15!');
    checked = false;
  }
  if (!inputWeight.value) {
    alert('Please enter Weight!');
    checked = false;
    //chỉ được nhập giá trị trong khoảng 1 đến 15
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    alert('Weight must be between 1 and 15!');
    checked = false;
  }
  if (!inputLength.value) {
    alert('Please enter Length!');
    checked = false;
    //chỉ được nhập giá trị trong khoảng 1 đến 100
  } else if (inputLength.value < 1 || inputLength.value > 100) {
    alert('Length must be between 1 and 100!');
    checked = false;
  }
  if (!inputColor.value) {
    alert('Please enter Color!');
    checked = false;
  }
  if (inputBreed.value === 'Select Breed' || inputBreed.value === '') {
    alert('Please select Breed!');
    checked = false;
  }
  if (inputType.value === 'Select Type' || inputType.value === '') {
    alert('Please select type!');
    checked = false;
  }
  return checked;
}

//Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';
  petArr.forEach(pet => {
    const row = document.createElement('tr');
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}
//hàm đưa data hiển thị lên bảng
function genRow(row) {
  return `
  <th>${row.id}</th>
  <td>${row.petname}</td>
  <td>${row.age}</td>
  <td>${row.type}</td>
  <td>${row.petWeight} kg</td>
  <td>${row.petLength} cm</td>
  <td>${row.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${row.color}"></i>
  </td>
  <td><i class="bi ${
    row.vaccinated ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
  }"></i></td>
  <td><i class="bi ${
    row.dewormed ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
  }"></i></td>
  <td><i class="bi ${
    row.sterilized ? 'bi-check-circle-fill' : 'bi bi-x-circle-fill'
  }"></i></td>  
  <td>${row.date}</td>
  <td>
    <button type="button" class="btn btn-danger btn-delete" id="btn-delete"  data-id="${
      row.id
    }">Delete</button>
  </td>
        `;
}
//Xóa các dữ liệu vừa nhập trên Form
function initForm() {
  inputId.value = '';
  inputName.value = '';
  inputAge.value = '';
  inputWeight.value = '';
  inputLength.value = '';
  inputColor.value = '';
  inputBreed.value = '';
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
}

// hàm xóa pet
tableBodyEl.addEventListener('click', function (e) {
  if (e.target.id != 'btn-delete') return;
  const petID = e.target.getAttribute('data-id');
  if (!petID) return;
  const isConfirm = confirm('Are you sure');
  if (!isConfirm) return;
  console.log(`Delete pet with id = ${petID}`);
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === petID) {
      petArr.splice(i, 1);
    }
    //ghi đè data sau khi xóa pet
    saveToStorage('petArr', petArr);
    //tải lại mảng
    renderTableData(petArr);
  }
});

//Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;
const healthyPetArr = [];
btnShowHealthy.addEventListener('click', function () {
  let healthyPetArr = petArr.filter(pet => {
    if (!pet.vaccinated || !pet.dewormed || !pet.sterilized) {
      return false;
    }
    return true;
  });

  healthyCheck = healthyCheck === false ? true : false;
  console.log(healthyPetArr);

  if (healthyCheck) {
    btnShowHealthy.textContent = 'Show All Pet';
    renderTableData(healthyPetArr);
  } else {
    btnShowHealthy.textContent = 'Show Healthy Pet';
    renderTableData(petArr);
  }
  return;
});

//Bổ sung Animation cho Sidebar
const sideBar = document.querySelector('.active');
const sideBarClick = function (e) {
  sideBar.classList.toggle('active');
};
sideBar.addEventListener('click', sideBarClick);

//4. Hiển thị Breed trong màn hình quản lý thú cưng

inputType.addEventListener('click', renderBreed);

function renderBreed() {
  inputBreed.innerHTML = '<option>Select Breed</option>';
  var breedArr = JSON.parse(localStorage.getItem('breedArr'));
  const dogBreed = breedArr.filter(Item => Item.breedType === 'Dog');
  const catBreed = breedArr.filter(Item => Item.breedType === 'Cat');
  console.log(breedArr);

  if (inputType.value === 'Dog') {
    dogBreed.forEach(Item => {
      const option = document.createElement('option');
      option.innerHTML = `${Item.breedName}`;
      inputBreed.appendChild(option);
    });
  }
  if (inputType.value === 'Cat') {
    catBreed.forEach(Item => {
      const option = document.createElement('option');
      option.innerHTML = `${Item.breedName}`;
      inputBreed.appendChild(option);
    });
  }
}
