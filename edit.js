'use strict';

const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const containerform = document.getElementById('container-form');

const btnSubmit = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');
let petArr = JSON.parse(localStorage.getItem('petArr'));
renderTableEdit(petArr);

//Hiển thị danh sách thú cưng
function renderTableEdit(petArr) {
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
      <button type="button" class="btn btn-danger btn-delete"   onclick="editPet('${
        row.id
      }')">Edit</button>
    </td>
          `;
}

//chức năng edit thú cưng
function editPet(id) {
  containerform.classList.remove('hide');
  const dataEdit = petArr.find(Item => Item.id === id);

  inputId.value = id;
  inputName.value = dataEdit.petname;
  inputAge.value = dataEdit.age;
  inputType.value = dataEdit.type;
  inputWeight.value = dataEdit.petWeight;
  inputLength.value = dataEdit.petLength;
  inputColor.value = dataEdit.color;
  inputBreed.value = dataEdit.breed;
  inputVaccinated.checked = dataEdit.vaccinated;
  inputDewormed.checked = dataEdit.dewormed;
  inputSterilized.checked = dataEdit.sterilized;
  date: new Date().getDate() +
    '/' +
    (new Date().getMonth() + 1) +
    '/' +
    new Date().getFullYear(),
    renderBreed();
}

//bắt sự kiện nút submit
btnSubmit.addEventListener('click', function () {
  const dataInput = {
    id: inputId.value,
    petname: inputName.value,
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

  //valid dữ liệu
  const ValidateEdit = checkValidFormEdit(dataInput);
  if (ValidateEdit) {
    petArr.push(dataInput);
    petArr.forEach(Item => {
      containerform.classList.add('hide');
    });
  }

  saveToStorage('petArr', petArr);
  renderTableEdit(petArr);
});

// Validate dữ liệu
function checkValidFormEdit(dataInput) {
  //kiểm tra giá trị input được nhập hay chưa
  let checked = true;
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
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    alert('Weight must be between 1 and 15!');
    checked = false;
  }
  if (!inputLength.value) {
    alert('Please enter Length!');
    checked = false;
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

function renderBreed() {
  inputBreed.innerHTML = '<option>Select Breed</option>';
  let breedArr = JSON.parse(localStorage.getItem('breedArr'));
  const dogBreed = breedArr.filter(Item => Item.breedType === 'Dog');
  const catBreed = breedArr.filter(Item => Item.breedType === 'Cat');

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
