document.addEventListener('DOMContentLoaded', function() {
    function addItem() {
      const input = document.querySelector('#item-input');
      const item = input.value.trim();
  
      if (item !== '') {
        const itemList = document.querySelector('#item-list');
        const newItem = document.createElement('li');
        newItem.innerHTML = `${item} <button class="delete-btn">Delete</button>`;
        itemList.appendChild(newItem);
        saveToLocalStorage(item);
        newItem.querySelector('.delete-btn').addEventListener('click', deleteItem);
        input.value = '';
      }
    }
  
    document.querySelector('#add-btn').addEventListener('click', addItem);
  
    document.querySelector('#item-input').addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        addItem();
      }
    });
  
    function deleteItem(event) {
      const item = event.target.parentElement;
      const itemName = item.textContent.replace('Delete', '').trim();
      item.remove();
      removeFromLocalStorage(itemName);
    }
  
    function saveToLocalStorage(item) {
      let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
      groceryList.push(item);
      localStorage.setItem('groceryList', JSON.stringify(groceryList));
    }
  
    function removeFromLocalStorage(item) {
      let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
      groceryList = groceryList.filter(groceryItem => groceryItem !== item);
      localStorage.setItem('groceryList', JSON.stringify(groceryList));
    }
  
    const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];
    groceryList.forEach(item => {
      const itemList = document.querySelector('#item-list');
      const newItem = document.createElement('li');
      newItem.innerHTML = `${item} <button class="delete-btn">Delete</button>`;
      itemList.appendChild(newItem);
      newItem.querySelector('.delete-btn').addEventListener('click', deleteItem);
    });
  });