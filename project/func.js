const expenseForm = document.querySelector('.expense');
expenseForm.addEventListener('submit',Onsubmit);
function Onsubmit(e){
    e.preventDefault();
    const NameData=document.querySelector('.name').value;
    const enjoyData = document.querySelector('.enjoy').value;
    const thingsData = document.querySelector('.food').value;
    const bugsData = document.querySelector('.bugs').value;
    const seatData = document.querySelector('.s_no').value;
    const error = document.querySelector('.msg');
    if(enjoyData==''|| thingsData==''|| bugsData==''|| seatData==''){
        error.textContent = 'Please fill in all fields.';
        setTimeout(() => {
        error.textContent = '';
        }, 3000);
    } 
    else{
        const formData={
            name: NameData,
            audiName: enjoyData,
            thingName: thingsData,
            price: bugsData,
            seat: seatData
        }
        axios.post('https://crudcrud.com/api/93e610658042495faeab55afa9749fe5/data', formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>";
                    console.log(error);
                });
    
    axios
    .get("https://crudcrud.com/api/93e610658042495faeab55afa9749fe5/data",{timeout : 2000})
    .then(function (response) {
        const userList = response.data;
        console.log(userList);
        for(let i=1;i<userList.length;i++){
            registerUser(userList[i]);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
}
function registerUser(formData){
    const parent = document.querySelector('.listitems')
    const child = document.createElement('li')
    child.innerHTML = `
    <div>
        <p>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.name}<p>
        <p>Audinumber - ${formData.audiName}</p>
        <p>Food &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.thingName}</p>
        <p>Seatnumber &nbsp;- ${formData.seat}</p>
        <p>Cost &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${formData.price}</p>
    </div>
        `;
        parent.appendChild(child);
        const dltBtn = document.createElement('button')
        dltBtn.className= 'dlt'
        dltBtn.innerHTML = 'Delete';
        child.appendChild(dltBtn);
        dltBtn.onclick=()=>{
                    axios.delete(`https://crudcrud.com/api/93e610658042495faeab55afa9749fe5/data/${formData._id}`)
                    .then (response=>{
                        console.log(response);
                    })
                    .catch(error=>{
                        console.log(error);
                    });
            parent.removeChild(child)
        }
        const editBtn = document.createElement('button')
        editBtn.className='edit'
        editBtn.innerHTML='Edit'
        child.appendChild(editBtn);
        editBtn.onclick=()=>{
            parent.removeChild(child)
            document.querySelector('.name').value=object.name;
            document.querySelector('.enjoy').value=object.audiName;
            document.querySelector('.food').value=object.thingName;
            document.querySelector('.bugs').value=object.price;
            document.querySelector('.s_no').value=object.seat;
        }

}