var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
   "group_id": 259248174,
   "user_id": 1830540513,
   "special_title": "foo",
   "duration": 0
});

var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: raw,
   redirect: 'follow'
};

fetch("http://localhost:3000/set_group_special_title", requestOptions)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));