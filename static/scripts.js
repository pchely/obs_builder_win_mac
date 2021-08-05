function Open_Widget(obj) {
  let name = obj;
  window.open(`http://localhost:8080/open_widget?name_widget=${name}`,'_blank');
  };


function Show_Hide_Widget(obj) {
    let name = obj;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/edit_status/");
    xhr.setRequestHeader("name_widget",name);
    xhr.send();
  };


function Delete(obj) {
  let name = obj;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/delete_widget/");
  xhr.setRequestHeader("name_widget",name);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    let status = xhr.response;
    if (status==true && name!=""){
      alert("Виджет успешно удален!")
    } else {
      alert("Возникла ошибка, виджет не удален!")
    }

  }
  parent.location.reload();
};


function Show_Info(obj) {
  let name = obj;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/about_widget/");
  xhr.setRequestHeader("name_widget",name);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    alert(name+"\n"+xhr.response.title+"\n"+xhr.response.subtitle);
  }
};


let status_style_obj = new Object();

function ShowFormEdit(obj) {
  if (obj in status_style_obj){
    if (status_style_obj[obj]=="none"){
        document.getElementById(obj).style.display="block";
        status_style_obj[obj] = "block";
    } else if (status_style_obj[obj]=="block") {
      document.getElementById(obj).style.display="none";
      status_style_obj[obj] = "none";
    }
  } else {
    status_style_obj[obj]="block";
    document.getElementById(obj).style.display="block";
  }
}


function HideFormEdit(obj) {
    document.getElementById(obj).style.display="none";
}
