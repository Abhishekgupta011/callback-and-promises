 // Get the form element and add a submit event listener to it
 const expenseForm = document.querySelector('.resto');
 expenseForm.addEventListener('submit', OnSubmit);
 // Function to handle form submission
 async function OnSubmit(e) {
     // Prevent default form submission behavior
 e.preventDefault();
 try {
 // Get form data from input fields
 const costData = document.querySelector('.cost').value;
 const enjoyDish = document.querySelector('.enjoy').value;
 const tableData = document.querySelector('#table').value;
 const error = document.querySelector('.message');
 // Check if any input fields are empty and show error message if so
 if (costData === '' || enjoyDish === '') {
 error.textContent = 'Please fill in all fields.';
 setTimeout(() => {
     error.textContent = '';
 }, 3000);
 } else {
     // Create an object with form data
     const billData = {
         price: costData,
         enjoy: enjoyDish,
         table: tableData,
     };
     try {
         // Make a POST request to save the form data to a remote API
         const response = await axios.post('https://crudcrud.com/api/393d82e14bd24fef92906d41cbb93fb8/data', billData);
         console.log(response);

        // Save the new data in localStorage
         localStorage.setItem(`billData_${billData.table}`, JSON.stringify(billData));

         // Register the customer and add the new bill data to the table
         const liElement = document.querySelector(`#table`);
         registerCustomer(liElement, response.data);
     } catch (error) {
         // Handle errors if there is a problem with the API request
         document.body.innerHTML += "<h4> Something went wrong </h4>";
         console.log(error);
     }
     }
     } catch (error) {
         // Handle errors that might occur when getting form data
         console.log(error);
     }
 }
 // Function to fetch existing data from remote API and display it on the page
 window.addEventListener("DOMContentLoaded", async (e) => {
 e.preventDefault();
 try {
     // Make a GET request to retrieve existing bill data from the remote API
     const getrequest = await axios.get(`https://crudcrud.com/api/393d82e14bd24fef92906d41cbb93fb8/data`);
     // Loop through the retrieved data and register customers for each table
     for (let i = 0; i < getrequest.data.length; i++) {
     const tableData = getrequest.data[i].table;
     const liElement = document.querySelector(`#table${tableData}`);
     registerCustomer(liElement, getrequest.data[i]);
     }
 } catch (err) {
     // Handle errors if there is a problem with the API request
     document.body.innerHTML += "<h4> No data Found</h4>";
 }
 });
 // Function to add bill data to the table for a specific table number
 function registerCustomer(liElement, billData) {
 let tableElement;
 // Get the corresponding table element based on the table number in the bill data
 if (billData.table === 'table1') {
     tableElement = document.querySelector('.table1');
 } else if (billData.table === 'table2') {
     tableElement = document.querySelector('.table2');
 } else if (billData.table === 'table3') {
     tableElement = document.querySelector('.table3');
 } else {
     console.error("Invalid table element:", billData.table);
     return;
 }
 // Create list item element with bill information
 const billList = document.createElement('li');
 billList.innerHTML = `
     <div>
     <p>Cost &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${billData.price}</p>
     <p>Dish Name &nbsp;&nbsp;&nbsp;&nbsp; - ${billData.enjoy}</p>
     <p>Table Number &nbsp;- ${billData.table}</p>
     </div>
 `;
 // Append list item to table element
 tableElement.appendChild(billList);
 // Create delete button
 const dltBtn = document.createElement('button');
 dltBtn.className = 'dlt';
 dltBtn.innerHTML = 'Delete';
 billList.appendChild(dltBtn);
 // Call deleteFormData function on click
 dltBtn.onclick = () => {
     deleteFormData(billData._id, tableElement, billList);
 };
 // Create edit button
 const editBtn = document.createElement('button');
 editBtn.className = 'edit';
 editBtn.innerHTML = 'Edit';
 billList.appendChild(editBtn);
 // Call createEditButton function on click
 editBtn.onclick = () => {
     createEditButton(billData, tableElement, billList);
 };
 }
 // Delete bill from server and remove from DOM and local storage
 async function deleteFormData(id, tableElement, billList) {
         try {
         // Make a DELETE request to remove the data from the remote API
         const response = await axios.delete(`https://crudcrud.com/api/393d82e14bd24fef92906d41cbb93fb8/data/${id}`)
         console.log(response);
         // Remove the item from localStorage
         const table = tableElement.className;
         localStorage.removeItem(`billData_${table}`);
         // Remove the list item from the table
         billList.remove();
         } catch (error) {
         console.log(error);
         }
         }
     function createEditButton(billData, tableElement, billList) {
     // Remove list item from DOM
     billList.parentNode.removeChild(billList);

     // Display a pop-up box to prompt the user to enter the updated data
     const updatedCost = window.prompt('Enter the updated cost:', billData.price);
     const updatedEnjoy = window.prompt('Enter the updated dish name:', billData.enjoy);

     // Make a PUT request to update the data on the server
     axios.put(`https://crudcrud.com/api/393d82e14bd24fef92906d41cbb93fb8/data/${billData._id}`, {
         price: updatedCost,
         enjoy: updatedEnjoy,
         table: billData.table,
     }).then(response => {
         console.log(response);

         // Update the bill data object
         billData.price = updatedCost;
         billData.enjoy = updatedEnjoy;

         // Register the customer again with the updated data
         registerCustomer(tableElement, billData);
     }).catch(error => {
         console.log(error);
     });
     }
