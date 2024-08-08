"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee() {
        this.regId = Employee.counter++;
        this.empId = "";
        this.fullName = "";
        this.gender = "";
        this.email = "";
        this.password = "";
        this.contact = "";
    }
    Employee.prototype.setEmpId = function (empId) {
        this.empId = empId;
    };
    Employee.prototype.setFullName = function (fullName) {
        this.fullName = fullName;
    };
    Employee.prototype.setGender = function (gender) {
        this.gender = gender;
    };
    Employee.prototype.setEmailAddress = function (email) {
        this.email = email;
    };
    Employee.prototype.setPassword = function (password) {
        this.password = password;
    };
    Employee.prototype.setContact = function (contact) {
        this.contact = contact;
    };
    Employee.prototype.getRegId = function () {
        return this.regId;
    };
    Employee.prototype.getEmpId = function () {
        return this.empId;
    };
    Employee.prototype.getFullName = function () {
        return this.fullName;
    };
    Employee.prototype.getGender = function () {
        return this.gender;
    };
    Employee.prototype.getEmailAddress = function () {
        return this.email;
    };
    Employee.prototype.getPassword = function () {
        return this.password;
    };
    Employee.prototype.getContact = function () {
        return this.contact;
    };
    Employee.counter = 1000;
    return Employee;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle() {
        this.vehicleName = "";
        this.vehicleModel = "";
        this.vehicleType = "";
        this.vehicleNumber = "";
        this.identification = "";
    }
    Vehicle.prototype.setVehicleName = function (vehicleName) {
        this.vehicleName = vehicleName;
    };
    Vehicle.prototype.setVehicleModel = function (vehicleModel) {
        this.vehicleModel = vehicleModel;
    };
    Vehicle.prototype.setVehicleType = function (vehicleType) {
        this.vehicleType = vehicleType;
    };
    Vehicle.prototype.setVehicleNumber = function (vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    };
    Vehicle.prototype.setIdentification = function (identification) {
        this.identification = identification;
    };
    Vehicle.prototype.getVehicleName = function () {
        return this.vehicleName;
    };
    Vehicle.prototype.getVehicleModel = function () {
        return this.vehicleModel;
    };
    Vehicle.prototype.getVehicleType = function () {
        return this.vehicleType;
    };
    Vehicle.prototype.getVehicleNumber = function () {
        return this.vehicleNumber;
    };
    Vehicle.prototype.getIdentification = function () {
        return this.identification;
    };
    return Vehicle;
}());
var Pass = /** @class */ (function () {
    function Pass() {
        this.passType = "";
        this.passType = "";
        this.totalBill = 0;
    }
    Pass.prototype.setTotalBill = function (totalBill) {
        this.totalBill = totalBill;
    };
    Pass.prototype.getTotalBill = function () {
        return this.totalBill;
    };
    return Pass;
}());
var newEmployee = new Employee();
var newVehicle = new Vehicle();
var newPass = new Pass();
// two body container and two expandable content employee detail and vehicle detail
var expandableContent = document.getElementsByClassName('expandable-content');
var bodyContainer = document.getElementsByClassName('body-container');
// navItem to navigate to section
var navItem = document.querySelectorAll('.mobile-screen .navItem');
var empName = "";
var successMessage = "";
// toggle to expande and collapse employee and vehicle section
function toggleSection(sectionName) {
    if (sectionName === 'employee') {
        expandableContent[0].classList.toggle('active');
        expandableContent[1].classList.remove('active');
        bodyContainer[0].classList.toggle('add-space');
        bodyContainer[1].classList.remove('add-space');
    }
    else if (sectionName === 'vehicle') {
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
//adding event listener to employee forms so that they appear one after the other after validation.
function displayEmployeeForm() {
    var employee = document.querySelector('#employee-section');
    var formGroup = employee.querySelectorAll('.form-group');
    var inputField = employee.querySelectorAll('.input-field');
    var inputButton = employee.querySelectorAll('input[type=button]');
    var select = employee.querySelector('select');
    // changing the display of the employee form to none except for the first form
    for (var i = 1; i < formGroup.length; i++) {
        formGroup[i].style.display = 'none';
    }
    var _loop_1 = function (i, j) {
        if (formGroup[i].id !== 'gender') {
            inputField[j].addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    if (i + 1 < formGroup.length) {
                        if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    else {
                        if (validateEmployeeDetails(formGroup[i], new HTMLDivElement)) {
                            expandableContent[0].classList.toggle('active');
                            bodyContainer[0].classList.toggle('add-space');
                            alert("Successfully Registered!");
                        }
                    }
                }
            });
            inputButton[j].addEventListener('click', function () {
                if (i + 1 < formGroup.length) {
                    if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                        formGroup[i + 1].style.display = 'block';
                        formGroup[i].style.display = 'none';
                    }
                }
                else {
                    if (validateEmployeeDetails(formGroup[i], new HTMLDivElement)) {
                        expandableContent[0].classList.toggle('active');
                        bodyContainer[0].classList.toggle('add-space');
                        alert("Successfully Registered!");
                    }
                }
            });
            console.log("input field " + j);
            j++;
        }
        if (formGroup[i].children[1].id == 'password') {
            formGroup[i].children[1].addEventListener('change', function (e) {
                var target = e.target;
                // if (checkPasswordStrength(target.value) >= 5) {
                //     formGroup[i].children[1].style.border = '2px solid green'
                // }
                // else if (checkPasswordStrength(target.value) >= 4) {
                //     formGroup[i].children[1].style.border = '2px solid orange'
                // }
                // else {
                //     formGroup[i].children[1].style.border = '2px solid red';
                // }
            });
        }
        console.log("form-group field " + i);
        if (formGroup[i].id == 'gender') {
            select.addEventListener('change', function () {
                validateEmployeeDetails(formGroup[i], formGroup[i + 1]);
                formGroup[i + 1].style.display = 'block';
                formGroup[i].style.display = 'none';
            });
        }
        out_j_1 = j;
    };
    var out_j_1;
    for (var i = 0, j = 0; i < formGroup.length && j < inputButton.length; i++) {
        _loop_1(i, j);
        j = out_j_1;
    }
}
displayEmployeeForm();
// we will validate current field and update the label of next field if current field gets validated
// at the same time we will store the details into employee object
// here children[0] is label of that form
// and children[1] is the input of that form
function validateEmployeeDetails(currentField, nextField) {
    var label = currentField.children[0];
    var labelName = label.htmlFor;
    var inputValue = currentField.children[1];
    var value = inputValue.value;
    console.log(labelName);
    console.log(value);
    switch (labelName) {
        case 'fullame':
            {
                if (value === '') {
                    alert("Field cannot be empty");
                }
                else if (value.length < 2) {
                    alert("Name should be more than 1 character");
                }
                else if (validateFullName(value)) {
                    empName = value;
                    newEmployee.setFullName(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Can I know your Gender';
                    return true;
                }
                else {
                    alert('Invalid Name... Please enter again ');
                }
                return false;
            }
        case 'gender':
            {
                if (value) {
                    newEmployee.setGender(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your Email';
                    return true;
                }
                else {
                    alert('Select one of the option.');
                    return false;
                }
            }
        case 'email':
            {
                if (value === '')
                    alert("Field cannot be empty");
                else if (validateEmail(value)) {
                    newEmployee.setEmailAddress(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter a password';
                    return true;
                }
                else {
                    alert('Invalid Email... Please enter again ');
                }
                return false;
            }
        case 'password':
            {
                if (value === '')
                    alert("Field cannot be empty");
                else if (value.length < 8)
                    alert('Password length is insuffucient');
                else if (validatePassword(value) && checkPasswordStrength(value) >= 5) {
                    newEmployee.setPassword(value);
                    nextField.children[0].innerHTML = 'Confirm your password';
                    return true;
                }
                else if (validatePassword(value) && checkPasswordStrength(value) < 5) {
                    alert('Password is too weak');
                }
                else {
                    alert('Invalid password... Please enter again');
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
                    alert('Password do not match, please try again ');
                    return false;
                }
            }
        case 'contact':
            {
                if (value === '')
                    alert("Field cannot be empty");
                else if (value.length < 8 || value.length > 15)
                    alert('Number is too small or too long');
                else if (validateContact(value)) {
                    newEmployee.setContact(value);
                    return true;
                }
                else {
                    alert('Invalid phone number... Please enter again ');
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
    var label = currentField.children[0];
    var labelName = label.htmlFor;
    var inputValue = currentField.children[1];
    var value = inputValue.value;
    console.log(labelName);
    console.log(value);
    switch (labelName) {
        case 'company':
            {
                if (validateText(value)) {
                    newVehicle.setVehicleName(value);
                    nextField.children[0].innerHTML = 'Please Enter vehicle-model ';
                    return true;
                }
                else {
                    alert('Invalid Company name... Please enter again ');
                    return false;
                }
            }
        case 'vehicle-model':
            {
                if (validateText(value)) {
                    newVehicle.setVehicleModel(value);
                    nextField.children[0].innerHTML = 'Select Vehicle Type';
                    return true;
                }
                else {
                    alert('Invalid vehicle model... Please enter again ');
                    return false;
                }
            }
        case 'vehicle-type':
            {
                if (value) {
                    newVehicle.setVehicleType(value);
                    nextField.children[0].innerHTML = 'Enter vehicle Number';
                    return true;
                }
                else {
                    alert('Select one of the option.');
                    return false;
                }
            }
        case 'vehicle-number':
            {
                if (validateVehicleNumber(value)) {
                    newVehicle.setVehicleNumber(value);
                    nextField.children[0].innerHTML = 'Enter Employee Id ';
                    return true;
                }
                else {
                    alert('Invalid vehicle number... Please enter again ');
                    return false;
                }
            }
        case 'emp-id':
            {
                if (validateEmpId(value)) {
                    newEmployee.setEmpId(value);
                    nextField.children[0].innerHTML = 'Provide any identification';
                    return true;
                }
                else {
                    alert('Invalid Employee id... Please enter again ');
                    return false;
                }
            }
        case 'identification':
            {
                if (validateText(value)) {
                    newVehicle.setIdentification(value);
                    return true;
                }
                else {
                    alert('Invalid Identification... Please enter again ');
                    return false;
                }
            }
        default: return false;
    }
}
//adding event listener to vehicle forms so that they appear one after the other after validation.
function displayVehicleForm() {
    var vehicle = document.querySelector('#vehicle-section');
    var formGroup = vehicle.querySelectorAll('.form-group');
    var input = vehicle.querySelectorAll('input[type=button]');
    var inputField = vehicle.querySelectorAll('.input-field');
    var select = vehicle.querySelector('select');
    var pricingItem = document.querySelectorAll('#pricing .pricing-item');
    for (var i = 1; i < formGroup.length; i++) {
        formGroup[i].style.display = 'none';
    }
    for (var i = 0; i < pricingItem.length; i++) {
        pricingItem[i].style.display = 'none';
    }
    var _loop_2 = function (i, j) {
        if (formGroup[i].id != 'vehicle-type') {
            inputField[j].addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    if (i + 1 < formGroup.length) {
                        if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    // last form group when the user enters last field
                    else {
                        if (validateVehicleDetails(formGroup[i], new HTMLDivElement)) {
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            successMessage = "Successfully registered your RegistrationId is : ".concat(newEmployee.getRegId());
                            successAlert(successMessage);
                        }
                    }
                }
            });
            input[j].addEventListener('click', function () {
                if (i + 1 < formGroup.length) {
                    if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                        formGroup[i + 1].style.display = 'block';
                        formGroup[i].style.display = 'none';
                    }
                }
                // last form group when the user enters last field
                else {
                    if (validateVehicleDetails(formGroup[i], new HTMLDivElement)) {
                        expandableContent[1].classList.toggle('active');
                        bodyContainer[1].classList.toggle('add-space');
                        successMessage = "Successfully registered your token number is : ".concat(newEmployee.getRegId());
                        successAlert(successMessage);
                    }
                }
            });
            j++;
        }
        if (formGroup[i].id == 'vehicle-type') {
            select.addEventListener('change', function () {
                if (validateVehicleDetails(formGroup[i], formGroup[i + 1])) {
                    pricingItem[select.selectedIndex - 1].style.display = 'block';
                    updateCurrency(pricingItem[select.selectedIndex - 1]);
                    purchaseItem(pricingItem[select.selectedIndex - 1]);
                    formGroup[i + 1].style.display = 'block';
                    formGroup[i].style.display = 'none';
                }
            });
        }
        console.log(i + " " + j);
        out_j_2 = j;
    };
    var out_j_2;
    for (var i = 0, j = 0; i < formGroup.length && j < input.length; i++) {
        _loop_2(i, j);
        j = out_j_2;
    }
}
displayVehicleForm();
function validateFullName(name) {
    var fullNameRegex = /^[a-zA-Z ]{2,}$/;
    return fullNameRegex.test(name);
}
function validateEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
function validateConfirmPassword(confirmPassword) {
    if (confirmPassword === newEmployee.getPassword())
        return true;
    else
        return false;
}
function checkPasswordStrength(password) {
    var strength = 0;
    if (password.length >= 8)
        strength++;
    if (/[a-z]/.test(password))
        strength++;
    if (/[A-Z]/.test(password))
        strength++;
    if (/\d/.test(password))
        strength++;
    if (/[ @$!%*?&]/.test(password))
        strength++;
    return strength;
}
function validateContact(contact) {
    var contactRegex = /^[\d]{8,}$/;
    return contactRegex.test(contact);
}
function validateText(text) {
    var textRegex = /^[a-zA-Z0-9., ]{2,}$/;
    return textRegex.test(text);
}
function validateEmpId(empId) {
    var empIdRegex = /^[\d]{4}$/;
    return empIdRegex.test(empId);
}
function validateVehicleNumber(number) {
    var numberRegex = /^[A-Z0-9\-]{4,}$/;
    return numberRegex.test(number);
}
// we will only take numeric string for now
var numericString = '0123456789';
//generate random string for token number
function generateRandomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
function updateCurrency(pricingItem) {
    var currencyMenuDiv = document.querySelector('.currency-convertor');
    var currencyMenu = document.querySelector('#currency');
    var pricingCategory = pricingItem.querySelectorAll('.pricing-category');
    var pricingType = pricingItem.querySelector('.pricing-type');
    var pricingOption = pricingType.querySelectorAll('option');
    var pricingTenure = ['Daily', 'Monthly', 'Yearly'];
    //will show the conversion menu only when pricing item is visible
    currencyMenuDiv.style.display = 'block';
    // Include api for currency change
    var api = "https://api.exchangerate-api.com/v4/latest/USD";
    var resultTo;
    var resultFrom = 'USD';
    console.log(pricingCategory);
    currencyMenu.addEventListener('change', function (e) {
        var target = e.target;
        resultTo = target.value;
        console.log(target.value);
        getResults();
        console.log('event listener success');
    });
    function getResults() {
        fetch("".concat(api))
            .then(function (currency) {
            return currency.json();
        }).then(convertTo);
        console.log('fetch statement success');
    }
    function convertTo(currency) {
        var fromRate = currency.rates[resultFrom];
        console.log(fromRate);
        var toRate = currency.rates[resultTo];
        console.log(toRate);
        for (var i = 0; i < pricingCategory.length; i++) {
            var price = parseInt(pricingCategory[i].children[1].innerHTML);
            pricingCategory[i].children[1].innerHTML = Math.round(((toRate / fromRate) * price)).toString();
            convertSymbols(resultTo, i);
            pricingOption[i + 1].innerHTML = pricingTenure[i] + " " + pricingCategory[i].children[1].innerHTML + " " + pricingCategory[i].children[2].innerHTML;
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
            case 'INR':
                pricingCategory[i].children[2].innerHTML = '&#8377;';
                break;
            case 'JPY':
                pricingCategory[i].children[2].innerHTML = '&#165;';
                break;
            default:
                break;
        }
    }
}
function successAlert(successMessage) {
    // Get the modal
    var modal = document.querySelector("#myModal");
    modal.style.display = "block";
    var modelContent = modal.querySelector('.modal-content');
    modelContent.children[1].innerHTML = successMessage;
    // Get the <span> element that closes the modal
    var span = document.querySelector(".close");
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        navigateToSection(navItem[3]); //navigate to pricing section
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            navigateToSection(navItem[3]); //navigate to pricing section
        }
    };
}
function purchaseItem(selectedItem) {
    // get the pricing select menu
    var pricingOption = selectedItem.querySelector('#pricingOption');
    var pricingCategory = selectedItem.querySelectorAll('.pricing-category');
    //get the purchase button
    var purchaseBtn = selectedItem.querySelector('.purchase-button');
    console.log(purchaseBtn);
    var checkoutBill = "";
    var targetValue;
    pricingOption.addEventListener('change', function (e) {
        console.log(pricingOption.selectedIndex);
        var target = e.target;
        targetValue = target.value;
        checkoutBill = "Hey ".concat(newEmployee.getFullName(), ", <br> Your total Bill is ").concat(pricingCategory[pricingOption.selectedIndex - 1].children[1].innerHTML, " ").concat(pricingCategory[pricingOption.selectedIndex - 1].children[2].innerHTML);
    });
    console.log(checkoutBill);
    purchaseBtn.addEventListener('click', function (e) {
        var target = e.target;
        var totalBill = pricingCategory[pricingOption.selectedIndex - 1].children[1].innerHTML + " " + pricingCategory[pricingOption.selectedIndex - 1].children[2].innerHTML;
        newPass.setTotalBill(parseInt(totalBill));
        if (targetValue) {
            successAlert(checkoutBill);
            console.log(target.value + " success ");
        }
        else {
            successAlert('Failed... Please choose a package');
        }
    });
}
