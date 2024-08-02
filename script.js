
function toggleSection(sectionName) {
    var expandableContent = document.getElementsByClassName('expandable-content');
    var bodyContainer = document.getElementsByClassName('body-container');

    if (sectionName === 'employee') {
        expandableContent[0].classList.toggle('active');
        expandableContent[1].classList.remove('active');
        bodyContainer[0].classList.toggle('add-space');
        bodyContainer[1].classList.remove('add-space');
    } else if (sectionName === 'vehicle') {
        expandableContent[1].classList.toggle('active');
        expandableContent[0].classList.remove('active');
        bodyContainer[1].classList.toggle('add-space');
        bodyContainer[0].classList.remove('add-space');
    }
}

function navigateToSection(selectElement) {
    var selectedValue = selectElement.value;
    if (selectedValue) {
        // Smooth scroll to the selected section
        document.querySelector(selectedValue).scrollIntoView({
            behavior: 'smooth'
        });
    }
}


    function validateName(name){
        const fullNameRegex = /^[a-zA-Z ]{2,}$/;
        return fullNameRegex.test(name);
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[ @$!%*?&]/.test(password)) strength++;
        return strength;
    }

    function validateContact(contact){
        const contactRegex = /^[0-9 ]{8,}$/;
        return contactRegex.test(contact);
    }




function validateEmployeeDetails(currentField,nextField,name){
    console.log(currentField.children[0].htmlFor);
    console.log(currentField.children[1].value);
    console.log(nextField.children[0].innerHTML);

    switch(currentField.children[0].htmlFor){

        case 'firstname':  if(validateName(currentField.children[1].value)){
            nextField.children[0].innerHTML='Welcome '+ name + ', Please enter your last name'
            return true;
        }
        else return false;
                           
        case 'lastname' : if(validateName(currentField.children[1].value)){
            nextField.children[0].innerHTML='Hi '+ name +', Can I know your Gender';
            return true;
        }
        else return false;
                          
        case 'gender' : 
             nextField.children[0].innerHTML='Hi '+ name + ', Enter your Email';
             return true;
       
                           
        case 'email' : if(validateEmail(currentField.children[1].value)){
            nextField.children[0].innerHTML='Hi '+name+ ', Enter a password';
            return true;
        }
        else return false;
       
        case 'password' : if(validatePassword(currentField.children[1].value)){
            nextField.children[0].innerHTML='Hi '+ name+ 'Confirm your password';
            return true;
        }
        else return false;
    
                        
        case 'confirm-password': if(validatePassword(currentField.children[1].value)){
            nextField.children[0].innerHTML='Hi '+ name+ ', Enter your phone number';
            return true;
        }
        else return false;
    
        case 'contact':  if(validateContact(currentField.children[1].value)){
            // nextField.children[0].innerHTML='Registered';
            
            return true;
        }
        else return false;
        
        default: return false;
        
    }
}


function validateVehicleDetails(currentField,nextField){
    console.log(currentField.children[0].htmlFor);
    console.log(currentField.children[1].value);
    console.log(nextField.children[0].innerHTML);

    switch(currentField.children[0].htmlFor){

        case 'company' : 
            nextField.children[0].innerHTML='Please Enter vehicle-model ';
            return true;
       

        case 'vehicle-model':  
            nextField.children[0].innerHTML='Select Vehicle Type';
            return true;
       
                           
        case 'vehicle-type' : 
            nextField.children[0].innerHTML='Enter vehicle Number';
            return true;
       
                          
        case 'vehicle-number' : 
             nextField.children[0].innerHTML='Enter Employee Id ';
             return true;
        
                           
        case 'emp-id' : 
            nextField.children[0].innerHTML='Provide any identification';
            return true;

                        
        case 'identification': 
            return true;
        
        default: return false;
        
    }
}

function displayEmployeeForm(){
    const employee = document.querySelector('#employee-section');
    const formGroup = employee.querySelectorAll('.form-group');
    const input = employee.querySelectorAll('input[type=button]');
    const select = employee.querySelector('select');
    const options = select.querySelectorAll('option');


    for(let i=1;i<formGroup.length;i++){
        formGroup[i].style.display='none';
    }

    let empName = formGroup[0].children[1].value; //just initialising
    for(let i=0,j=0;i<formGroup.length && j<input.length;i++){
        
        if(formGroup[i].id!='gender') {

            input[j].addEventListener('click',() => {
              
               if(formGroup[i].children[0].htmlFor ==='firstname') {
                    if (validateEmployeeDetails(formGroup[i],formGroup[i+1],empName)){
                        empName = formGroup[i].children[1].value;
                        formGroup[i+1].style.display='block';
                        formGroup[i].style.display='none';
                    }
               }else if(i+1<formGroup.length){
                    if (validateEmployeeDetails(formGroup[i],formGroup[i+1],empName)){
                        formGroup[i+1].style.display='block';
                        formGroup[i].style.display='none';
                    }
               }
               else{
                alert('successfully registered');
               }
                
            });
            
            console.log("input field "+j);
            j++;

            
        }

        console.log("form-group field "+i);

        if(formGroup[i].id=='gender'){
            select.addEventListener('change',()=>{
             validateEmployeeDetails(formGroup[i],formGroup[i+1]);
                formGroup[i+1].style.display='block';
                formGroup[i].style.display='none';
            });
        }
        
    }

}
displayEmployeeForm();


function displayVehicleForm(){
    const vehicle = document.querySelector('#vehicle-section');
    const formGroup = vehicle.querySelectorAll('.form-group');
    const input = vehicle.querySelectorAll('input[type=button]');
    const select = vehicle.querySelector('select');
    const options = select.querySelectorAll('option');

    for(let i=1;i<formGroup.length;i++){
        formGroup[i].style.display='none';
    }

    for(let i=0,j=0;i<formGroup.length && j<input.length;i++){
        
        if(formGroup[i].id!='vehicle-type') {
            
                input[j].addEventListener('click',() => {
                    if(i+1<formGroup.length){
                        if(validateVehicleDetails(formGroup[i],formGroup[i+1])){
                            formGroup[i+1].style.display='block';
                            formGroup[i].style.display='none';
                        }
                        
                    }
                    else{
                        alert('successfully registered');
                    }
                });
                j++;
            }
           
                
        if(formGroup[i].id == 'vehicle-type'){
            select.addEventListener('change',()=>{
                if(validateVehicleDetails(formGroup[i],formGroup[i+1])){
                    formGroup[i+1].style.display='block';
                    formGroup[i].style.display='none';
                }
                
            });
        }
        console.log(i+" "+j);

    }
    
}

displayVehicleForm();