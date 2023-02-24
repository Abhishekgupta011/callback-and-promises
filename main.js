// axios globals
axios.defaults.headers.common["X-Auth-Token"]=
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// GET REQUEST
function getTodos() {
    // axios({
    //     method : "get",
    //     url : "https://jsonplaceholder.typicode.com/todos",
    //     params : {
    //         _limit : 5
    //     }
    // })
    // .then (response=>showOutput(response))
    // .catch(error=>console.error(error));
  
  
  axios
.get("https://jsonplaceholder.typicode.com/todos?_limit=5",{timeout : 5000})
.then (res=>showOutput(res))
.catch(error=>console.error(error));
}
 // POST REQUEST
  function addTodo() {
    axios
        .post("https://jsonplaceholder.typicode.com/todos",{
            title : "new todo",
            completed : false   
    })
    .then (res=>showOutput(res))
    .catch(error=>console.error(error));
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios
        .patch("https://jsonplaceholder.typicode.com/todos/1",{
            title : "updated todo",
            completed : true   
    })
    .then (res=>showOutput(res))
    .catch(error=>console.error(error));
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios
        .delete("https://jsonplaceholder.typicode.com/todos/1")
        .then (res=>showOutput(res))
        .catch(error=>console.error(error));
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
    ])
    .then(axios.spread((todos, posts)=>showOutput(posts)))
    .catch(error=>console.error(error))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
        headers: {
            "Content-Type" : "application/json",
            Autorization: "sometoken"
        }
    }
    axios
        .post("https://jsonplaceholder.typicode.com/todos",{
            title : "new todo",
            completed : false   
    }, config)
    .then (res=>showOutput(res))
    .catch(error=>console.error(error));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
        method:"post",
        url: "https://jsonplaceholder.typicode.com/todos",
        data : {
            title: "Hello World"
        },
        transformResponse: axios.defaults.transformResponse.concat(data=>{
            data.title = data.title.toUpperCase();
            return data;
        })
    }
    axios(options).then(res=>showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
    .get("https://jsonplaceholder.typicode.com/todoss",{
        // validateStaus : function(status){
        //     return status<500; // reject only is status is greater or equal to 500
        // }
    })
    .then (res=>showOutput(res))
    .catch(err=>{
        if(err.response){
           console.log(err.response.data)
           console.log(err.response.status)
           console.log(err.response.headers)
           if(err.response.status=== 404){
            alert("ERROR: Page not found");
           }
        } else if(err.request) {
              // request was made but no response
              console.error(err.request)
        } else{
            console.error(err.message)
        }
    })
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
    axios
    .get("https://jsonplaceholder.typicode.com/todos",{
        cancelToken: source.token
    })
    
    .then (res=>showOutput(res))
    .catch(thrown=>{
        if(axios.isCancel(thrown)){
            console.log("Request Canceled", thrown.message)
        }
    });
    if(true){
        source.cancel("Request Canceled")
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
    return config;
  }, error=>{
    return Promise.reject(error)
  })
  
  // AXIOS INSTANCES
   const axiosinstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
   });
   axiosinstance.get("/comments").then(res=>showOutput(res));
  // Show output in browser
  function showOutput(respone) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${respone.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(respone.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(respone.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(respone.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);