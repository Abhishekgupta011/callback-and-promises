const expenseForm = document.querySelector('.expense');
expenseForm.addEventListener('submit', Onsubmit);
window.addEventListener('load', populateList);
function Onsubmit(e) {
  e.preventDefault();
  const NameData = document.querySelector('.name').value;
  const enjoyData = document.querySelector('.enjoy').value;
  const thingsData = document.querySelector('.food').value;
  const bugsData = document.querySelector('.bugs').value;
  const seatData = document.querySelector('.s_no').value;
  const error = document.querySelector('.msg');
  if (enjoyData == '' || thingsData == '' || bugsData == '' || seatData == '') {
    error.textContent = 'Please fill in all fields.';
    setTimeout(() => {
      error.textContent = '';
    }, 3000);
  } else {
    const formData = {
      name: NameData,
      audiName: enjoyData,
      thingName: thingsData,
      price: bugsData,
      seat: seatData
    };
    axios.post('https://crudcrud.com/api/cdd9daef481942438fda8624a633e8d9/data', formData)
      .then(function (response) {
        console.log(response);
        const userList = JSON.parse(localStorage.getItem('formData')) || [];
        userList[(response.data)._id] = response.data;
        localStorage.setItem('formData', JSON.stringify(userList));
        registerUser(document.querySelector('.listitems'), response.data);
      })
      .catch(function (error) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>";
        console.log(error);
      });
  }
}

function populateList() {
    const parent = document.querySelector('.listitems');
    axios.get('https://crudcrud.com/api/cdd9daef481942438fda8624a633e8d9/data')
      .then(function (response) {
        const userList = response.data || [];
        for (let i = 0; i < userList.length; i++) {
          registerUser(parent,userList[i]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  function registerUser(parent,formData) {
    const child = document.createElement('li');
    child.innerHTML = `
      <div>
        <p>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.name}</p>
        <p>Audinumber - ${formData.audiName}</p>
        <p>Seatnumber &nbsp;- ${formData.seat}</p>
        <p>Food &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.thingName}</p>
        <p>Cost &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.price}</p>
      </div>
    `;
    parent.appendChild(child);
    const dltBtn = document.createElement('button');
    dltBtn.className = 'dlt';
    dltBtn.innerHTML = 'Delete';
    child.appendChild(dltBtn);

    dltBtn.onclick = () => {
    deleteFormData(formData._id, parent, child);
    }

    function deleteFormData(id, parent, child) {
    axios.delete(`https://crudcrud.com/api/cdd9daef481942438fda8624a633e8d9/data/${id}`)
        .then(response => {
        console.log(response);
        parent.removeChild(child);
        
        // Remove item from local storage
        const userList = JSON.parse(localStorage.getItem('formData')) || [];
        delete userList[id];
        localStorage.setItem('formData', JSON.stringify(userList));
        })
        .catch(error => {
        console.log(error);
        })
    }
    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerHTML = 'Edit';
    child.appendChild(editBtn);
    editBtn.onclick=()=>{
        createEditButton(formData, parent, child);
    }
  }
  
    function createEditButton(formData, parent, child) {
        parent.removeChild(child);
        document.querySelector('.name').value = formData.name;
        document.querySelector('.enjoy').value = formData.audiName;
        document.querySelector('.food').value = formData.thingName;
        document.querySelector('.bugs').value = formData.price;
        document.querySelector('.s_no').value = formData.seat;

  }