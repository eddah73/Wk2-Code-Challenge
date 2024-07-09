let shoppingList = [];
const itemList = document.getElementById('shopping-list');
const addItemBtn = document.getElementById('add-btn');
const clearListBtn = document.getElementById('clear-btn');
const itemInput = document.getElementById('item-input');

// Adding event listener to add and clear button
addItemBtn.addEventListener('click', addItem);
clearListBtn.addEventListener('click', clearList);

// Function to add new items to the list
function addItem() {
    const item = itemInput.value;
    if (item) {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        // Add event listener to item to show if purchased by strikethrough text
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('purchased');
        });
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent li click event from firing
            const index = shoppingList.findIndex((listItem) => listItem.name === item);
            shoppingList.splice(index, 1);
            itemList.removeChild(listItem);
        });
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent li click event from firing
            const editText = prompt('Enter new item name:', item);
            if (editText) {
                listItem.textContent = editText;
                const index = shoppingList.findIndex((listItem) => listItem.name === item);
                shoppingList[index].name = editText;
                item = editText; // update item variable
                // Remove old buttons
                while (listItem.childNodes.length > 1) {
                    listItem.removeChild(listItem.lastChild);
                }
                // Add new buttons
                addButtons(listItem, editText);
            }
        });
        // Purchase button
        addButtons(listItem, item);

        itemList.appendChild(listItem);
        shoppingList.push({ name: item, purchased: false });
        itemInput.value = '';
    }
}

function addButtons(listItem, item) {
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent li click event from firing
        const index = shoppingList.findIndex((listItem) => listItem.name === item);
        shoppingList.splice(index, 1);
        itemList.removeChild(listItem);
    });
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const editText = prompt('Enter new item name:', item);
        if (editText) {
            listItem.textContent = editText;
            const index = shoppingList.findIndex((listItem) => listItem.name === item);
            shoppingList[index].name = editText;
            item = editText; // update item variable
            while (listItem.childNodes.length > 1) {
                listItem.removeChild(listItem.lastChild);
            }
            // Add new buttons
            addButtons(listItem, editText);
        }
    });
    // Purchase button
    const purchaseBtn = document.createElement('button');
    purchaseBtn.textContent = 'Purchase';
    purchaseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent li click event from firing
        listItem.classList.add('purchased');
        const index = shoppingList.findIndex((listItem) => listItem.name === item);
        shoppingList[index].purchased = true;
        alert(`You have purchased ${item}!`);
    });

    listItem.appendChild(deleteBtn);
    listItem.appendChild(editBtn);
    listItem.appendChild(purchaseBtn);
}

function clearList() {
    itemList.innerHTML = '';
    shoppingList = [];
}