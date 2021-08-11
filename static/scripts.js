let selected_widgets = new Array();
let status_style_obj = new Object();


//Открыть виджет
function Open_Widget(obj) {
  let name = obj;
  if (typeof(obj)=="string"){
    window.open(`http://localhost:8080/open_widget?name_widget=${name}`,'_blank');
  } else {
    for (let value of obj){
      window.open(`http://localhost:8080/open_widget?name_widget=${value}`,'_blank');
    }
  }
};


//Показать-Скрыть виджет
function Show_Hide_Widget(obj) {
  if (typeof(obj)=="string"){
    let name = new TextEncoder().encode(obj);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/edit_status/");
    xhr.setRequestHeader("name_widget",name);
    xhr.send();
  } else {
    for (let value of selected_widgets){
      let name = new TextEncoder().encode(value);
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8080/edit_status/");
      xhr.setRequestHeader("name_widget",name);
      xhr.send()
    }
  }
};


//Удалить виджет
function Delete(obj) {
  if (typeof(obj)=="string"){
    let name = new TextEncoder().encode(obj);
    let fix_name = new TextDecoder("UTF-8").decode(name);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/delete_widget/");
    xhr.setRequestHeader("name_widget",name);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
      let status = xhr.response;
      if (status==true && name!=""){
        alert(`Виджет "${fix_name}" успешно удален!`)
        parent.location.reload();
      } else {
        alert(`Возникла ошибка, виджет "${fix_name}" не удален!`)
        parent.location.reload();
      }
    }
  } else {
    for (let value of selected_widgets){
      let name = new TextEncoder().encode(value);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/delete_widget/");
      xhr.setRequestHeader("name_widget",name);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function () {
        parent.location.reload();
        }
      }
    }
};


//Показать инфу о виджете
function Show_Info(obj) {
  let name = new TextEncoder().encode(obj);
  let fix_name = new TextDecoder("UTF-8").decode(name);
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/about_widget/");
  xhr.setRequestHeader("name_widget",name);
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    alert(fix_name+"\n"+xhr.response.title+"\n"+xhr.response.subtitle+"\n"+xhr.response.title_size+"\n"+xhr.response.subtitle_size);
  }
};


//Проверить чекбокс и добавить инфу в div
function CheckBox(obj){
  let element = document.getElementById('selected_widgets');

  if (selected_widgets.includes(obj)==false){
    selected_widgets.push(obj)
    element.textContent = selected_widgets;
  } else {
    let index = selected_widgets.indexOf(obj);
    if (index > -1) {
      selected_widgets.splice(index,1);
      element.textContent = selected_widgets;
  }
}
};


//Открыть список виджетов в отдельных вкладках
function GetSelectedWidgets() {
  for (let value of selected_widgets){
    window.open(`http://localhost:8080/open_widget?name_widget=${value}`,'_blank');
    }
};


//Показать всплывающую форму
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


//Скрыть всплывающую форму
function HideFormEdit(obj) {
    document.getElementById(obj).style.display="none";
}
