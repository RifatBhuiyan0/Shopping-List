//AddItem button 
const addItemBtn = document.querySelector('.btn');
//Enter Filed button 
const enterItem = document.getElementById('item-input');

//unorder lists items 
const lists =  document.querySelector('ul');

//clear BTN 
const clearBTN = document.getElementById('clear');


//filter Item
 const filter = document.getElementById('filter');

 let update = false;


function defualt(){
    const listCount = document.querySelectorAll('li');
    if(listCount.length === 0){
        filter.style.display ='none';
        clearBTN.style.display = 'none';
    }
    else{
        filter.style.display ='block';
        clearBTN.style.display = 'block'
    }
    addItemBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    addItemBtn.style.backgroundColor = '#333';
    update = false;
}


//Add Items
function createLi(){
    const li = document.createElement('Li');
    return li;
}

function createButton(style){
    const button = document.createElement('button');
    button.className = style;
    return button;

}

function createIcon(style){
    const icon = document.createElement('I');
    icon.className= style;
    return icon;

}

function createTextNode(item){
    const value = document.createTextNode(item);
    return value;
    
}

function addItemToDom(item){
    const lists =  document.querySelector('ul');
    const li = createLi();
    const button = createButton('remove-item btn-link text-red')
    li.appendChild(createTextNode(item));
    li.appendChild(button);
    button.appendChild(createIcon('fa-solid fa-xmark'));
    lists.appendChild(li);
    defualt();
}


function addItem(e){

e.preventDefault();

if((enterItem.value).trim() === ''){
    alert('Please enter something!');
    return ;
}

 if(update){
    const oldList = document.querySelector('.update-color');
    console.log(oldList);
    removeItemStorage(oldList.textContent)
    oldList.remove();
    update = false; 
 }
 else if(duplicate(enterItem.value)){
    alert('Item Already Exist!');
    return;


 }
    addLocalStorage(enterItem.value);
    addItemToDom(enterItem.value);

    enterItem.value = '';
}
addItemBtn.addEventListener('click',addItem);
         

//remove item 
const removeItem = (e)=> {
    const list = e.target.parentElement.parentElement;

    if((e.target).tagName === 'I'){
        removeItemStorage(list.innerText);
        list.remove();
        defualt();
    }
    else if(e.target.tagName === 'LI'){
        updateItems(e.target)
    }
}



lists.addEventListener('click', removeItem)

//update Items
function updateItems(items){
    const allList = document.querySelectorAll('li');
    allList.forEach((item)=> {
        item.classList.remove('update-color')

    })
    update = true;
    items.classList.add('update-color');
    addItemBtn.innerHTML = `<i class="fa fa-edit"></i> Update Item`;
    addItemBtn.style.backgroundColor = '#075c28';
    enterItem.value = items.innerText;
}

//Clear All Items 
function clearItems(){
    
    while(lists.firstChild){
        lists.firstChild.remove();
    }
    localStorage.removeItem('items');
    defualt();
}
clearBTN.addEventListener('click', clearItems);
 

//Filter Items
function filterKeyword(e){
    const list_item = document.querySelectorAll('li');
    const filter = e.target.value.toLowerCase();
    list_item.forEach(
        (item)=>{
            let itemValue = item.innerText.toLowerCase();
            if(itemValue.indexOf(filter) !== -1){
                item.style.display = 'flex';
            }
            else{
                item.style.display = 'none';
            }
        }
    )
}
filter.addEventListener('input', filterKeyword);






// ------------------------------------------------------------------------------
function getItemfromStorage(){
    let arrayList ;
    if(localStorage.getItem("items") === null){
        arrayList = [];
    }
    else{
        arrayList = JSON.parse(localStorage.getItem("items"));
    }
    
    return arrayList;
}

// display to DOM Page 
function displayItem(){
    let lists = getItemfromStorage();
    lists.forEach(list => {
        addItemToDom(list);

    });
    defualt();
}
// action onLoad Page
document.addEventListener('DOMContentLoaded', displayItem);





// Add to local Stroage
function addLocalStorage(item){
    let arrayList = getItemfromStorage();
    arrayList.push(item);
    localStorage.setItem('items', JSON.stringify(arrayList));
}


//remove from Local Storage()
function removeItemStorage(item){
    let localStroageItems = getItemfromStorage();
    
    localStroageItems = localStroageItems.filter(listItem =>
        listItem !== item
     )
     localStorage.setItem('items', JSON.stringify(localStroageItems));
}

//duplicate 
const duplicate = (item)=>{
    let arrayList = getItemfromStorage();
    const result = arrayList.includes(item);
    return result;


}

