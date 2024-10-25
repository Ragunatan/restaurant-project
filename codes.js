      
   function submitButton(){
    event.preventDefault();
    let Items = {
        price : document.getElementById('price').value,
        names : document.getElementById('name').value,
        table : document.getElementById('table').value,
    }
   localStorage.setItem(Items.names,JSON.stringify(Items))
   let List = document.createElement('li')
   let Deletebtn = document.createElement('button')
   Deletebtn.textContent = "Delete Order"
   
   //displaying values on screen
   List.textContent = `${Items.price}` +'--' + `${Items.names}` + '--' + `${Items.table}` 
    if(Items.table === "Table1"){
        let Table1List = document.querySelector('.table1')
        Table1List.append(List)
        List.appendChild(Deletebtn)
    }
    if(Items.table === "Table2"){
        let Table2List = document.querySelector('.table2')
        Table2List.append(List)
        List.appendChild(Deletebtn)
    }
    if(Items.table === "Table3"){
        let Table3List = document.querySelector('.table3')
        Table3List.append(List)
        List.appendChild(Deletebtn)
    }

    // Posting data to the backend
    axios
    .post(`https://crudcrud.com/api/0ff33f2bee8f4dc6b27f0df1848985db/${Items.table}`,Items)
    .then(res => console.log("Data saved to crud"))
    .catch(err => console.log(err))
 

    Deletebtn.addEventListener('click', (event) => {
        event.preventDefault();
    
        // Remove the item from the UI
        List.remove();
    
        // Access the values directly from the Items object to identify the item to delete
        let deleteValue = Items.names;       // Item name to be deleted
        let deletetable = Items.table; // Item table to be deleted from
    
        // Fetch items from the backend to locate the specific item by its name
        axios.get(`https://crudcrud.com/api/0ff33f2bee8f4dc6b27f0df1848985db/${deletetable}`)
            .then((response) => {
                // Find the item to delete using its name (or other unique identifier if needed)
                let itemToDelete = response.data.find(item => item.names === deleteValue);
                
                if (itemToDelete) {
                    // Delete the item using its unique _id
                    axios.delete(`https://crudcrud.com/api/0ff33f2bee8f4dc6b27f0df1848985db/${deletetable}/${itemToDelete._id}`)
                        .then(res => console.log("Item deleted successfully"))
                        .catch(err => console.log(err));
                } else {
                    console.log("Item not found on the server.");
                }
            })
            .catch(err => console.log(err));
    });
    
   }