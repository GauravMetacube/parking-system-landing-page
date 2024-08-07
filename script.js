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
function validateEmployeeDetails(currentField, nextField) {
    console.log(currentField.children[0].htmlFor);
    console.log(currentField.children[1].value);


    switch (currentField.children[0].htmlFor) {

        case 'fullname':
            if (currentField.children[1].value === '') alert("Field cannot be empty");
            if (validateFullName(currentField.children[1].value)) {
                empName = currentField.children[1].value;
                employeeDetail.fullname = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Hi ' + empName + ', Can I know your Gender';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid FirstName... Please enter again ';
                return false;
            }

        case 'gender':
            employeeDetail.gender = currentField.children[1].value;
            nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your Email';
            return true;


        case 'email':
            if (currentField.children[1].value === '') alert("Field cannot be empty");
            if (validateEmail(currentField.children[1].value)) {
                employeeDetail.email = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter a password';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid Email... Please enter again ';
                return false;
            }

        case 'password':
            if (currentField.children[1].value === '') alert("Field cannot be empty");
            if (validatePassword(currentField.children[1].value)) {
                employeeDetail.password = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Hi ' + empName + 'Confirm your password';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid password... Please enter again ';
                return false;
            }


        case 'confirm-password':
            if (validateConfirmPassword(currentField.children[1].value)) {
                nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your phone number';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Password do not match, please try again ';
                return false;
            }

        case 'contact':
            if (currentField.children[1].value === '') alert("Field cannot be empty");
            if (validateContact(currentField.children[1].value)) {
                employeeDetail.contact = currentField.children[1].value;
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid phone number... Please enter again ';
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
    console.log(currentField.children[0].htmlFor);
    console.log(currentField.children[1].value);


    switch (currentField.children[0].htmlFor) {

        case 'company':
            if (validateText(currentField.children[1].value)) {
                vehicleDetail.company = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Please Enter vehicle-model ';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid Company name... Please enter again ';
                return false;
            }

        case 'vehicle-model':
            if (validateText(currentField.children[1].value)) {
                vehicleDetail.model = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Select Vehicle Type';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid vehicle model... Please enter again ';
                return false;
            }

        case 'vehicle-type':
            if (validateText(currentField.children[1].value)) {
                vehicleDetail.type = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Enter vehicle Number';
                return true;
            }
            else return false;

        case 'vehicle-number':
            if (validateVehicleNumber(currentField.children[1].value)) {
                vehicleDetail.number = currentField.children[1].value;
                nextField.children[0].innerHTML = 'Enter Employee Id ';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid vehicle number... Please enter again ';
                return false;
            }

        case 'emp-id':
            if (validateEmpId(currentField.children[1].value)) {
                vehicleDetail.empId = currentField.children[1].value;
                employeeDetail.empId=  currentField.children[1].value;
                nextField.children[0].innerHTML = 'Provide any identification';
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid Employee id... Please enter again ';
                return false;
            }

        case 'identification':
            if (validateText(currentField.children[1].value)) {
                vehicleDetail.identification = currentField.children[1].value;
                return true;
            }
            else {
                currentField.children[0].innerHTML = 'Invalid Identification... Please enter again ';
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
                            alert(`Successfully Registered!`);
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
                            alert(`Successfully Registered!`);
                        }
                    }

            });
            console.log("input field " + j);
            j++;

        }

        if (formGroup[i].children[1].id == 'password') {

            formGroup[i].children[1].addEventListener('change', (e) => {
                // const password = formGroup[i].children[1].value;
                if (checkPasswordStrength(e.target.value) >= 5) {
                    formGroup[i].children[1].style.border = '2px solid green'
                }
                else if (checkPasswordStrength(e.target.value) >= 4) {
                    formGroup[i].children[1].style.border = '2px solid orange'
                }
                else {
                    formGroup[i].children[1].style.border = '2px solid red';
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
                            vehicleDetail.tokenNumber = generateRandomString(4, numericString);
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            successMessage=`Successfully registered your RegistrationId is : ${vehicleDetail.tokenNumber}`;
                            successAlert(successMessage);
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
                            vehicleDetail.tokenNumber = generateRandomString(4, numericString);
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            successMessage=`Successfully registered your token number is : ${vehicleDetail.tokenNumber}`;
                            successAlert(successMessage);
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

    // Function getresults
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
       navigateToSection(navItem[3]); //navigate to pricing section
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; 
        navigateToSection(navItem[3]); //navigate to pricing section
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
        checkoutBill=`Hey ${employeeDetail.firstName}, <br> Your total Bill is ${pricingCategory[pricingOption.selectedIndex-1].children[1].innerHTML} ${pricingCategory[pricingOption.selectedIndex-1].children[2].innerHTML}`;
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