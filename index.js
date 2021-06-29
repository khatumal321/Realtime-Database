function Add(value) {
  var value = document.getElementById("inputValue").value;
  firebase.database().ref("users/").push({
    value: value,
  });
  if(value === "") {
    alert("please enter Text")
  }
}


firebase.database().ref("users/").on("child_added", (snapshot)=>{
  var data = snapshot.val();
  console.log(data);
  data.id = snapshot.key;

  var ul = document.getElementById("ul");
  var li = document.createElement("li");
  var valueText = document.createTextNode(data.value);
  li.appendChild(valueText);
  ul.appendChild(li);


  // ====Edit Button =======//
  var btn1 = document.createElement("input");
  btn1.setAttribute("type", "button");
  btn1.setAttribute("value", "Edit");
  btn1.setAttribute("id", data.id);
  btn1.setAttribute("onclick", "editFunc(this)");
  li.appendChild(btn1);

  
  // ====Edit Delete =======//
  var btn2 = document.createElement("input");
  btn2.setAttribute("type", "button");
  btn2.setAttribute("value", "Delete");
  btn2.setAttribute("id", data.id);
  btn2.setAttribute("onclick", "deleteFunc(this)");
  li.appendChild(btn2);
})


function editFunc(e) {
  var promt = prompt("update value...");
  editTodo = {
    value: promt,
    id: e.id
  }
  firebase.database().ref("users/" + e.id).update(editTodo);
}

function deleteFunc(e) {
  firebase.database().ref("users/" + e.id).remove();
}