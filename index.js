//Implement TODO App with the following functionality:
// Add items on enter click.
// Add items on the "Add TODO" button click
// The TODO items should have a delete icon. On delete icon click remove that todo item.
// When a new todo item is created show the creation date and time on the card's bottom-left corner.


let input = document.getElementById("input"); //to get value from input
let add = document.getElementById("add"); //add button
let output = document.getElementById("todo");// output div card container


let store = [];

function storeCard() {
    let elem = document.createElement("div");
    elem.className = "todoitem";
    //div to hold the text and icons

    let textDiv = document.createElement("div");
    textDiv.className = "textDiv";
    //div to hold the text part and date

    let text = document.createElement("p");
    let addDate = document.createElement("p");

    text.innerHTML = input.value;
    //assigning the vapue of input box to p element

    let date = new Date();
    addDate.innerHTML = date.toDateString() + " " + date.toLocaleTimeString();
    //creating and assigning the date

    textDiv.appendChild(text);
    textDiv.appendChild(addDate);
    elem.appendChild(textDiv);
    output.appendChild(elem);

    // after whole 1st round the input is again set to blank
    input.value = "";

    let remButton = document.createElement("i");
    remButton.className = "fas fa-trash-alt";
    //remove button from font awesome

    let edit = document.createElement("i");
    edit.className = "fas fa-edit";
    //edit button from font awesome
    
    let remEdit = document.createElement("div");
    //div to hold both the edit and delete button
    remEdit.className = "remedit";
    remEdit.appendChild(edit);
    remEdit.appendChild(remButton);
    elem.appendChild(remEdit);
}

let load = localStorage.getItem("todo");
let loadArray = JSON.parse(load);

if(loadArray) {
    function storeCard();
}

add.addEventListener("click", function() {

    if(input.value === ""){
        alert("Please Enter the Item.")
        return;
    }


    //so that blank card is not created and alerts the user of the same

    let elem = document.createElement("div");
    elem.className = "todoitem";
    //div to hold the text and icons

    let textDiv = document.createElement("div");
    textDiv.className = "textDiv";
    //div to hold the text part and date

    let text = document.createElement("p");
    let addDate = document.createElement("p");

    text.innerHTML = input.value;
    //assigning the vapue of input box to p element

    let date = new Date();
    addDate.innerHTML = date.toDateString() + " " + date.toLocaleTimeString();
    //creating and assigning the date

    textDiv.appendChild(text);
    textDiv.appendChild(addDate);
    elem.appendChild(textDiv);
    output.appendChild(elem);

    // after whole 1st round the input is again set to blank
    input.value = "";

    let remButton = document.createElement("i");
    remButton.className = "fas fa-trash-alt";
    //remove button from font awesome

    let edit = document.createElement("i");
    edit.className = "fas fa-edit";
    //edit button from font awesome
    
    let remEdit = document.createElement("div");
    //div to hold both the edit and delete button
    remEdit.className = "remedit";
    remEdit.appendChild(edit);
    remEdit.appendChild(remButton);
    elem.appendChild(remEdit);


    store.push(
        {
            message: text.innerHTML,
            date: addDate.innerHTML
        }
    )
    
    localStorage.setItem("todo", JSON.stringify(store));


    //created to count the number of edit button clicks
    let count = 0;

    
    edit.addEventListener("click", function(e) {
        //on click first avtivated and then counted
        count ++;
        if(count > 1) {
            return;
        }
        //stops from multiple press of edit button more than once

        
        let editInput = document.createElement("input");
        textDiv.prepend(editInput);
        //input field is created to edit the value

        let nDate = new Date();
        let newDate = document.createElement("p");
        newDate.innerHTML = nDate.toDateString() + " " + nDate.toLocaleTimeString();
        // to update the edit date and time

        addDate.style.visibility = "hidden";
        //the date is hidden and changed later
        editInput.style.marginTop = "19px"
        editInput.style.marginBottom = "10px"
        text.style.display = "none"
        //the display of text is made hidden to show that it has been replaced
        //style is here added with double quotes, remember the syntax

        editInput.value = text.innerHTML;
        //the default value comes out to be the original text first created
        //helps user to write less
        let dateFirst = addDate.innerHTML;

        editInput.addEventListener("change", function(){
            if(editInput.value === "") {
                return;
            }
            //to again stop creating a blank card and returns the original
            //text if pressed by unconditionally
            text.innerHTML = editInput.value;
            addDate.innerHTML = newDate.innerHTML;
            //the previous date is updated

            let editStore = localStorage.getItem("todo");
            let editArray = JSON.parse(editStore);
            

            for(var i = 0; i < editArray.length; i++) {
                if(dateFirst === editArray[i].date) {
                    editArray[i].message = text.innerHTML;
                    editArray[i].date = addDate.innerHTML;
                }
            }

            localStorage.removeItem("todo");
            localStorage.setItem("todo", JSON.stringify(editArray));
            
            editInput.remove();
            //before the event close the value is assigned from input and removed
        })

        editInput.addEventListener("blur", function(){
            // note these are added and takes effect after change when it is finally 
            //changing to blurr. talking about event
            text.style.display = "block";
            //as the focus is removed the text display is returned to normal
            //looks like value is replaced with input box
            addDate.style.visibility = "visible";
            //updated date is made visible and is added in changed event
            editInput.remove();
            //added here to to add fuctionality like unintentionally pressing the edit
            //or if clicked and now doesn't want to change the text.
            count = 0;
            //set to 0 only at the last event of input type to restore the count at top 
            //and stop creating more input fields on edit click
        })

    })
    //cool thing that the event changes only the clicked or on the element 
    //on which event is happening so no need to identify which one to delete
     remButton.addEventListener("click", function() {
        let delStore = localStorage.getItem("todo");
        let delArray = JSON.parse(delStore);

        let compText = addDate.innerHTML;
        for(var i = 0; i < delArray.length; i++) {
            if(compText === delArray[i].date) {
                delArray.splice(i, 1);
            }
        }

        localStorage.removeItem("todo");
        localStorage.setItem("todo", JSON.stringify(delArray));

        elem.remove();
    })
})