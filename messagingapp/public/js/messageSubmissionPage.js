const form = document.getElementById("form")
const title = document.getElementById("title")
const email = document.getElementById("email")
const message = document.getElementById("message")




form.addEventListener('submit', e=>{
    // e.preventDefault(); // this line is made just to prevent submission temporarily until backend is made

    if(!validateInputs()){
        //form is invalid and submission is prevented.
      e.preventDefault();
    }
    // else{
    //     //form is valid and submitted. ps: line no.10 need to be deleted for the form to submit 
        
    //     document.querySelector(".successful").style.display = "block" // change successful message display from none to block.

    // }

    
    

})

const InvalidInput = (element, msg)=>{
    const input_control = element.parentElement;
    const error_element = input_control.querySelector(".errorMsg")
    input_control.classList.add("error")
    input_control.classList.remove("success")

    error_element.innerText = msg;


}

const validInput = (element)=>{
    const input_control = element.parentElement;
    const error_element = input_control.querySelector(".errorMsg")

    input_control.classList.add("success")
    input_control.classList.remove("error")
    error_element.innerText = "";

}

const validateInputs = ()=>{
    const titleValue = title.value.trim()
    const emailValue = email.value.trim()
    const messageValue = message.value.trim()
    const emailRegx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    let istitleValid = false
    let isEmailValid = false
    let isMessageValid = false

    if(titleValue === "" ){
        InvalidInput(title, "title must not be empty")
       

    }
    else if(titleValue.length > 10){
        InvalidInput(title, "title length must not be greater than 10 characters")
        

    }
    else{
        validInput(title)
        istitleValid = true
    }


    if(emailValue === "" ){
        InvalidInput(email, "email must not be empty")

    }
    else if(!emailRegx.test(emailValue)){
        InvalidInput(email, "please enter a vaild email (example: test@example.com)")

    }
    else{
        validInput(email)
        isEmailValid = true
    }


    if(messageValue === "" ){
        InvalidInput(message, "message must not be empty")

    }
    else if(messageValue.length > 100){
        InvalidInput(message, "message must not exceed 100 characters")

    }
    else{
        validInput(message)
        isMessageValid = true
    }

    return isEmailValid&& istitleValid && isMessageValid
}




document.addEventListener('keydown', function(event) {
    // Check if the Control key is pressed and the 'h' key is pressed
    if (event.altKey && event.key === 'h') {
        
        window.location.replace('/home');
    }
    if (event.altKey && event.key === 'v') {
        
        window.location.replace('/view');
    }
  
});