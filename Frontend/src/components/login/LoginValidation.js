function Validation(inputs){
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/
    const password_pattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
if(inputs.email===""){
     error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(inputs.email)) {
        error.email = "Email soesn't match"
    } else{
        error.email=""
    }
if(inputs.password ===""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(inputs.password)){
        error.password = "Password doesn't match"
    } else {
        error.password = ""
    }
    return error;
}

export default Validation; 