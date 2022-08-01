var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:8000/api/cours/browse/',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ0eXBlIjoiY29sbGFiIiwiaWF0IjoxNjU5MzU2MDUyLCJleHAiOjE2NTkzNTY2NTJ9.cGgSZZrlyufLL2cz3akwRnrCjsYFpR1BVpd52O4HIYA',
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});