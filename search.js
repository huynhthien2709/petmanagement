'use strict';

const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const btnFind = document.getElementById('find-btn');
let petArr = JSON.parse(localStorage.getItem('petArr'));

const tableBodyEl = document.getElementById('tbody');

renderTableSearch(petArr);
renderBreed();

let dataSearch = [];

function renderTableSearch(petArr) {
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
              `;
}


//chức năng tìm kiếm thú cưng
function dataSearchPet() {
  dataSearch = petArr;
  if (inputId.value) {
    dataSearch = dataSearch.filter(item => item.id.includes(inputId.value));
  }

  if (inputName.value) {
    dataSearch = dataSearch.filter(item =>
      item.petname.includes(inputName.value)
    );
  }
  if (inputType.value != 'Select Type') {
    dataSearch = dataSearch.filter(item => item.type.includes(inputType.value));
  }
  if (inputBreed.value != 'Select Breed') {
    dataSearch = dataSearch.filter(item =>
      item.breed.includes(inputBreed.value)
    );
  }

  if (inputVaccinated.checked) {
    dataSearch = dataSearch.filter(
      item => item.vaccinated == inputVaccinated.checked
    );
  }
  if (inputDewormed.checked) {
    dataSearch = dataSearch.filter(
      item => item.dewormed == inputDewormed.checked
    );
  }
  if (inputSterilized.checked) {
    dataSearch = dataSearch.filter(
      item => item.sterilized == inputSterilized.checked
    );
  }
  renderTableSearch(dataSearch);
}

btnFind.addEventListener('click', function () {
  dataSearchPet();
});

function renderBreed() {
  inputBreed.innerHTML = '<option>Select Breed</option>';
  let breedArr = JSON.parse(localStorage.getItem('breedArr'));
  const dogBreed = breedArr.filter(Item => Item.breedType === 'Dog');
  const catBreed = breedArr.filter(Item => Item.breedType === 'Cat');

  if (inputType.value === 'Select Type') {
    dogBreed.forEach(Item => {
      const option = document.createElement('option');
      option.innerHTML = `${Item.breedName}`;
      inputBreed.appendChild(option);
    });
  }
  if (inputType.value === 'Select Type') {
    catBreed.forEach(Item => {
      const option = document.createElement('option');
      option.innerHTML = `${Item.breedName}`;
      inputBreed.appendChild(option);
    });
  }
}
