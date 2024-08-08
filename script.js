// two body container and two expandable content employee detail and vehicle detail
const expandableContent = document.getElementsByClassName('expandable-content');
const bodyContainer = document.getElementsByClassName('body-container');
// navItem to navigate to section
const navItem = document.querySelectorAll('.mobile-screen .navItem');


// objects of employee and vehicle 
const employeeDetail = {};
const vehicleDetail = {};
let empName = ""; // emp name

//toggle to expande and collapse employee and vehicle section
function toggleSection(sectionName) {

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

// nevigate to particular section through nav bar
function navigateToSection(selectElement) {
    var selectedValue = selectElement.value;
    if (selectedValue) {
        // Smooth scroll to the selected section
        document.querySelector(selectedValue).scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// validate inputs

function validateFullName(name) {
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

function validateConfirmPassword(confirmPassword) {
    if (confirmPassword === employeeDetail.password) return true;
    else return false;
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

function validateContact(contact) {
    const contactRegex = /^[\d]{8,}$/;
    return contactRegex.test(contact);
}

function validateText(text) {
    const textRegex = /^[a-zA-Z0-9., ]{2,}$/;
    return textRegex.test(text);
}
function validateEmpId(empId) {
    const empIdRegex = /^[\d]{4}$/;
    return empIdRegex.test(empId);
}

function validateVehicleNumber(number) {
    const numberRegex = /^[A-Z0-9\-]{4,}$/;
    return numberRegex.test(number);
}



// we will only take numeric string for now
const numericString = '0123456789';
//generate random string for token number
function generateRandomString(length, chars) {
    var result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// we will validate current field and update the label of next field if current field gets validated
// at the same time we will store the details into employee object
// here children[0] is label of that form
// and children[1] is the input of that form
function validateEmployeeDetails(currentField,nextField) {
    const label = currentField.children[0];
    const labelName = label.htmlFor;

    const inputValue = currentField.children[1];
    const value = inputValue.value;
    //get error message div to show invalid input messages
    const errorMessage = currentField.querySelector('p');
    errorMessage.style.color='red';
    console.log(labelName);
    console.log(value);


    switch (labelName) {

        case 'fullname':
            {
                if (value === '') {
                   errorMessage.innerHTML = 'field cannot be empty';
                }
                else if(value.length<2){
                    errorMessage.innerHTML = "Name should be more than 1 character";
                }
                else if (validateFullName(value)) {
                    empName = value;
                    employeeDetail.fullName=value;
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Can I know your Gender';
                    return true;
                }
                else{
                    errorMessage.innerHTML= 'Invalid Name... Please enter again ';
                }
                return false;
            }

        case 'gender':
            {
                if(value){
                    employeeDetail.gender = value;
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your Email';
                    return true;
                }
                else{
                    errorMessage.innerHTML='Select one of the option.';
                    return false;
                }
            }
            
        case 'email':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if(validateEmail(value)) {
                    employeeDetail.email=value;
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter a password';
                    return true;
                }
                else{
                    errorMessage.innerHTML='Invalid Email... Please enter again ';
                }
                return false;
            }
        
        case 'password':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if(value.length < 8) {
                    errorMessage.innerHTML='Password length is insuffucient';
                }
                else if(validatePassword(value) && checkPasswordStrength(value)>=5 ){
                   employeeDetail.password=value;
                    nextField.children[0].innerHTML = 'Confirm your password';
                    return true;
                }
                else if(checkPasswordStrength(value)<5){
                    errorMessage.innerHTML='Password is too weak';
                }
                else{
                    errorMessage.innerHTML='Invalid password... Please enter again';
                }
                return false;
            }

        case 'confirm-password':
            {
                if (validateConfirmPassword(value)) {
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your phone number';
                    return true;
                }
                else {
                    errorMessage.innerHTML='Password do not match, please try again ';
                    return false;
                }
            }
            

        case 'contact':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if(value.length<8 || value.length>15) {
                    errorMessage.innerHTML="Number is too small or too long";
                }
                else if(validateContact(value)){
                    employeeDetail.contact=value;
                    return true;
                }
                else{
                    errorMessage.innerHTML='Invalid phone number... Please enter again';
                }
                return false;
            }

        default: return false;

    }
}


// we will validate current field and update the label of next field if current field gets validated
// at the same time we will store the details into vehicle object
// here children[0] is label of that form
// and children[1] is the input of that form
function validateVehicleDetails(currentField, nextField) {

    const label = currentField.children[0];
    const labelName = label.htmlFor;

    const inputValue = currentField.children[1];
    const value= inputValue.value;

     //get error message div to show invalid input messages
    const errorMessage = currentField.querySelector('p');
    errorMessage.style.color='red';

    console.log(labelName);
    console.log(value);

    switch (labelName) {

        case 'company':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if (validateText(value)) {
                    vehicleDetail.company = value;
                    nextField.children[0].innerHTML = 'Please Enter vehicle-model ';
                    return true;
                }
                else {
                    errorMessage.innerHTML = 'Invalid Company name... Please enter again ';
                }
                return false;
            }
            

        case 'vehicle-model':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if (validateText(value)) {
                    vehicleDetail.model = value;
                    nextField.children[0].innerHTML = 'Select Vehicle Type';
                    return true;
                }
                else {
                    errorMessage.innerHTML = 'Invalid vehicle model... Please enter again ';
                }
                return false;
            }
            
        case 'vehicle-type':
            {
                if (validateText(value)) {
                    vehicleDetail.type = value;
                    nextField.children[0].innerHTML = 'Enter vehicle Number';
                    return true;
                }
                else return false;
            }

        case 'vehicle-number':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if (validateVehicleNumber(value)) {
                    vehicleDetail.number = value;
                    nextField.children[0].innerHTML = 'Enter Employee Id ';
                    return true;
                }
                else {
                    errorMessage.innerHTML = 'Invalid vehicle number... Please enter again ';
                }
                return false;
            }
            

        case 'emp-id':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if (validateEmpId(value)) {
                    vehicleDetail.empId = value;
                    employeeDetail.empId=  value;
                    nextField.children[0].innerHTML = 'Provide any identification';
                    return true;
                }
                else {
                    errorMessage.innerHTML = 'Invalid Employee id... Please enter again ';
                    
                }
                return false;
            }
            
        case 'identification':
            {
                if (value === '') {
                    errorMessage.innerHTML="Field cannot be empty";
                }
                else if (validateText(value)) {
                    vehicleDetail.identification = value;
                    return true;
                }
                else {
                    currentField.children[0].innerHTML = 'Invalid Identification... Please enter again ';
                }
                return false;
            }

        default: return false;

    }
}


//adding event listener to employee forms so that they appear one after the other after validation.

function displayEmployeeForm(){

    const employee = document.querySelector('#employee-section');
    const formGroup = employee.querySelectorAll('.form-group');
    const input = employee.querySelectorAll('input[type=button]');
    const inputField = employee.querySelectorAll('.input-field');
    const select = employee.querySelector('select');
    const options = select.querySelectorAll('option');


    for (let i = 1; i < formGroup.length; i++) {
        formGroup[i].style.display = 'none';
    }

    //creating a paragraph element for error message
    formGroup.forEach((element)=>{
        const error = document.createElement('p');
        element.append(error);
    });


    for (let i = 0, j = 0; i < formGroup.length && j < input.length; i++) {

        if (formGroup[i].id != 'gender') {

            inputField[j].addEventListener('keydown',(e) => {

                if(e.key ==='Enter'){
                    
                    if (i + 1 < formGroup.length) {
                        if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    else {
                        if (validateEmployeeDetails(formGroup[i])) {
                            expandableContent[0].classList.toggle('active');
                            bodyContainer[0].classList.toggle('add-space');
                            formGroup[i].style.display = 'none';
                            employeeDetail.regId = generateRandomString(4, numericString);
                            successMessage=`Successfully registered your RegistrationId is : ${employeeDetail.regId}`;
                            const successDiv = employee.querySelector('.success-message');
                            successDiv.innerHTML=`<h1>Successfully registered your RegistrationId is : ${employeeDetail.regId}</h1>`;
                            successAlert(successMessage);
                        }
                    }
                }
                

            });


            input[j].addEventListener('click', () => {
               
                    if (i + 1 < formGroup.length) {
                        if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    else {
                        if (validateEmployeeDetails(formGroup[i])) {
                            expandableContent[0].classList.toggle('active');
                            bodyContainer[0].classList.toggle('add-space');
                            formGroup[i].style.display = 'none';
                            employeeDetail.regId = generateRandomString(4, numericString);
                            successMessage=`Successfully registered your RegistrationId is : ${employeeDetail.regId}`;
                            successAlert(successMessage);
                            const successDiv = employee.querySelector('.success-message');
                            successDiv.innerHTML=`<h1>Successfully registered your RegistrationId is : ${employeeDetail.regId}</h1>`;
                            successAlert(successMessage);
                        }
                    }

            });
            console.log("input field " + j);
            j++;

        }

        if (formGroup[i].children[1].id == 'password') {

            const errorMessage = formGroup[i].querySelector('p');

            formGroup[i].children[1].addEventListener('change', (e) => {
                // const password = formGroup[i].children[1].value;
                if (checkPasswordStrength(e.target.value) >= 5) {
                    formGroup[i].children[1].style.border = '2px solid green'
                    errorMessage.innerHTML='password is strong';
                    errorMessage.style.color='green';
                }
                else if (checkPasswordStrength(e.target.value) >= 4) {
                    formGroup[i].children[1].style.border = '2px solid orange'
                    errorMessage.innerHTML='password is normal';
                    errorMessage.style.color='orange';
                }
                else {
                    formGroup[i].children[1].style.border = '2px solid red';
                    errorMessage.innerHTML='password is weak';
                    errorMessage.style.color='red';
                }

            });
        }

        console.log("form-group field " + i);

        if (formGroup[i].id == 'gender') {
            select.addEventListener('change', () => {
                validateEmployeeDetails(formGroup[i], formGroup[i + 1]);
                formGroup[i + 1].style.display = 'block';
                formGroup[i].style.display = 'none';
            });
        }

    }
}
displayEmployeeForm();




//adding event listener to vehicle forms so that they appear one after the other after validation.
function displayVehicleForm() {
    const vehicle = document.querySelector('#vehicle-section');
    const formGroup = vehicle.querySelectorAll('.form-group');
    const input = vehicle.querySelectorAll('input[type=button]');
    const inputField = vehicle.querySelectorAll('.input-field');
    const select = vehicle.querySelector('select');
    const options = select.querySelectorAll('option');
    const pricingItem = document.querySelectorAll('#pricing .pricing-item');



    for (let i = 1; i < formGroup.length; i++) {
        formGroup[i].style.display = 'none';
    }

    for (let i = 0; i < pricingItem.length; i++) {
        pricingItem[i].style.display = 'none';
    }

      //creating a paragraph element for error message
      formGroup.forEach((element)=>{
        const error = document.createElement('p');
        element.append(error);
    });

    for (let i = 0, j = 0; i < formGroup.length && j < input.length; i++) {

        if (formGroup[i].id != 'vehicle-type') {

            inputField[j].addEventListener('keydown',(e) => {

                if(e.key==='Enter'){
                    if (i + 1 < formGroup.length) {
                        if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
    
                    }
                    // last form group when the user enters last field
                    else {
                        if (validateVehicleDetails(formGroup[i])) {
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            formGroup[i].style.display = 'none';
                            const successDiv = vehicle.querySelector('.success-message');
                            successDiv.innerHTML=`<h1> Vehicle registered successfully, visit price section below</h1>`;
                            navigateToSection(navItem[3]); //navigate to pricing section
                        }
                    }
                }
                
            });

            input[j].addEventListener('click', () => {

                    if (i + 1 < formGroup.length) {
                        if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
    
                        }
    
                    }
                    // last form group when the user enters last field
                    else {
                        if (validateVehicleDetails(formGroup[i])) {
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            formGroup[i].style.display = 'none';
                            const successDiv = vehicle.querySelector('.success-message');
                            successDiv.innerHTML=`<h3> Vehicle registered successfully, visit price section below</h3>`;
                            navigateToSection(navItem[3]); //navigate to pricing section
                        }
                    }
                
            });
            j++;
        }


        if (formGroup[i].id == 'vehicle-type') {
            select.addEventListener('change', () => {
                if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                    pricingItem[formGroup[i].children[1].selectedIndex - 1].style.display = 'block';
                    updateCurrency(pricingItem[formGroup[i].children[1].selectedIndex - 1]);
                    purchaseItem(pricingItem[formGroup[i].children[1].selectedIndex - 1]);
                    formGroup[i + 1].style.display = 'block';
                    formGroup[i].style.display = 'none';
                }

            });
        }
        console.log(i + " " + j);

    }

}
displayVehicleForm();

// update currency according to selected vehicle
function updateCurrency(pricingItem) {

    const currencyMenuDiv = document.querySelector('.currency-convertor');
    const currencyMenu = document.querySelector('#currency');
    const pricingCategory = pricingItem.querySelectorAll('.pricing-category');
    const pricingType = pricingItem.querySelector('.pricing-type');
    const pricingOption = pricingType.querySelectorAll('option');
    const pricingTenure = ['Daily','Monthly','Yearly'];
    //will show the conversion menu only when pricing item is visible
    currencyMenuDiv.style.display = 'block';

    // Include api for currency change
    const api = "https://api.exchangerate-api.com/v4/latest/USD";
    let resultTo;
    let resultFrom = 'USD';


    console.log(pricingCategory);
    currencyMenu.addEventListener('change', (e) => {
        resultTo = e.target.value;
        console.log(e.target.value);
        getResults();
        console.log('event listener success');
    });

    // Function getresults will fetch currency rate from api
    function getResults() {
        fetch(`${api}`)
            .then(currency => {
                return currency.json();
            }).then(convertTo);
        console.log('fetch statement success');
    }

    function convertTo(currency) {

        let fromRate = currency.rates[resultFrom];
        console.log(fromRate);
        let toRate = currency.rates[resultTo];
        console.log(toRate);
        for (let i = 0; i < pricingCategory.length; i++) {
            const price = pricingCategory[i].children[1].innerHTML;
            pricingCategory[i].children[1].innerHTML = Math.round(((toRate / fromRate) * price));
            convertSymbols(resultTo, i);
            pricingOption[i+1].innerHTML=pricingTenure[i]+" "+pricingCategory[i].children[1].innerHTML+" "+pricingCategory[i].children[2].innerHTML;
            console.log(price);
        }

        
        resultFrom = resultTo; //update the currency 
        console.log('convert to success');
    }

    function convertSymbols(resultTo, i) {
        switch (resultTo) {
            case 'USD':
                pricingCategory[i].children[2].innerHTML = '$';
                break;
            case 'INR': pricingCategory[i].children[2].innerHTML = '&#8377;';
                break;
            case 'JPY': pricingCategory[i].children[2].innerHTML = '&#165;';
                break;
            default:
                break;
        }
    }
   

}


function successAlert(successMessage){
     // Get the modal
    var modal = document.querySelector("#myModal");
    modal.style.display = "block";
   
    const modelContent = modal.querySelector('.modal-content');

    modelContent.children[1].innerHTML=successMessage;
    
    
    // Get the <span> element that closes the modal
    var span = document.querySelector(".close");
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
       modal.style.display = "none";
    
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; 
        
     }
    }
}

function purchaseItem(selectedItem){
    
    // get the pricing select menu
    const pricingOption = selectedItem.querySelector('#pricingOption');
    console.log(pricingOption);

    const pricingCategory = selectedItem.querySelectorAll('.pricing-category');
    
    //get the purchase button
    const purchaseBtn = selectedItem.querySelector('.purchase-button');
    console.log(purchaseBtn);


   let checkoutBill = "";
   let targetValue;

    pricingOption.addEventListener('change',(e)=>{
        console.log(pricingOption.selectedIndex);
        targetValue=e.target.value;
        checkoutBill=`Hey ${employeeDetail.fullName}, <br> Your total Bill is ${pricingCategory[pricingOption.selectedIndex-1].children[1].innerHTML} ${pricingCategory[pricingOption.selectedIndex-1].children[2].innerHTML}`;
    });
    console.log(checkoutBill);
    purchaseBtn.addEventListener('click', (e)=>{

            employeeDetail.totalBill=pricingCategory[pricingOption.selectedIndex-1].children[1].innerHTML+" "+pricingCategory[pricingOption.selectedIndex-1].children[2].innerHTML;
            if(targetValue){
                successAlert(checkoutBill);
                console.log(e.target.value + " success ");
            }
            else{
                successAlert('Failed... Please choose a package');
            }
    });
    

}