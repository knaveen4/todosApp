let user=document.getElementById('user');
let add=document.getElementById('add');
let save=document.getElementById('save');

let unorderlist=document.getElementById('unorderlist');


function fromstorage(){
    let getdata=localStorage.getItem('addtask');
    let parseddata=JSON.parse(getdata);
    if(parseddata===null){
        return [];
    }
    else{
        return parseddata;
    }
}
let todoList=fromstorage();

let todolength=todoList.length;
add.onclick=function(){
    let uservalue=user.value;
    if(uservalue===""){
        alert('enter any tasks.');
        return;
    }
    todolength=todolength+1;
    let t=new Date();
    let st=t.toLocalString();
    let newtodo={
        name:uservalue,
        uniqueid:todolength,
        isChecked:false,
        time:st
    };
    todoList.push(newtodo);
    createList(newtodo);
    user.value='';
}
save.onclick=function(){
    localStorage.setItem('addtask',JSON.stringify(todoList));
}
function deletelist(listid){
    let a=document.getElementById(listid);
    unorderlist.removeChild(a);
    let b=todoList.findIndex(function(each){
        let eachlist='list'+each.uniqueid;
        if(eachlist===listid){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(b,1);
}
function displaylabel(checkboxid,labelid,listid){
    let checkbox=document.getElementById(checkboxid);
    let label=document.getElementById(labelid);
    let list=document.getElementById(listid);
    label.classList.toggle('checked');
    let check=todoList.findIndex(function(eachtodo){
        let each='list'+eachtodo.uniqueid;
        if(each===listid){
            return true;
        }
        else{
            return false;
        }
    });
    let a=todoList[check];
    if(a.isChecked===true){
        a.isChecked=false;
    }
    else{
        a.isChecked=true;
    }
}
function createList(todo){
    let listid="list"+todo.uniqueid;
    let checkboxid="checkbox"+todo.uniqueid;
    let labelid="label"+todo.uniqueid;
    let dateid="date"+todo.uniqueid;

    let list=document.createElement('li');
    list.setAttribute('id',listid);
    list.classList.add('list');
    unorderlist.appendChild(list);

    let checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('id',checkboxid);
    checkbox.checked=todo.isChecked;
    checkbox.onclick=function(){
        displaylabel(checkboxid,labelid,listid);
    }
    list.appendChild(checkbox);

    let labeldiv=document.createElement('div');
    labeldiv.classList.add('labeldiv');
    list.appendChild(labeldiv);

    let label=document.createElement('label');
    label.setAttribute('for',checkboxid);
    label.classList.add('label');
    label.id=labelid;
    label.textContent=todo.name;
    
        if(todo.isChecked===true){
            label.classList.add('checked')
        }

    labeldiv.appendChild(label);

    let deldiv=document.createElement('div');
    deldiv.classList.add('deldiv');
    labeldiv.appendChild(deldiv);

    let icon=document.createElement('i');
    icon.classList.add('fa-solid','fa-trash','icon');
    icon.onclick=function(){
        deletelist(listid);
    }
    deldiv.appendChild(icon);
    
    let d=document.createElement('p');
    d.textContent=todo.time;
    d.id=dateid;
    labeldiv.appendChild(d);

}
for (let todo of todoList){
    createList(todo);
}