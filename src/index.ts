import { JsonObjectExpression, NodeArray } from "typescript";

class Employee {
    private static counter = 1000;
    private empId: string;
    private fullName: string;
    private gender: string;
    private email : string;
    private password : string;
    private contact : string;
    private regId : number;

    public constructor(){
        this.regId=Employee.counter++;
        this.empId="";
        this.fullName="";
        this.gender="";
        this.email="";
        this.password="";
        this.contact="";
    }

    public setEmpId(empId: string){
        this.empId=empId;
    }

    public setFullName(fullName: string){
        this.fullName=fullName;
    }

    public setGender(gender: string){
        this.gender=gender;
    }

    public setEmailAddress(email:string){
        this.email=email;
    }

    public setPassword(password: string){
        this.password=password;
    }

    public setContact(contact: string){
        this.contact=contact;
    }

    public getRegId(){
        return this.regId;
    }

    public getEmpId(){
        return this.empId;
    }

    public getFullName(){
        return this.fullName;
    }

    public getGender(){
        return this.gender;
    }

    public getEmailAddress(){
        return this.email;
    }

    public getPassword(){
        return this.password;
    }

    public getContact(){
        return this.contact;
    }

}

class Vehicle{
    private vehicleName: string ="";
    private vehicleModel: string="";
    private vehicleType: string="";
    private vehicleNumber: string="";
    private identification: string="";
    
    public constructor(){

    }

    public setVehicleName(vehicleName:string){
        this.vehicleName=vehicleName;
    }

    public setVehicleModel(vehicleModel:string){
        this.vehicleModel=vehicleModel;
    }

    public setVehicleType(vehicleType: string){
        this.vehicleType=vehicleType;
    }

    public setVehicleNumber(vehicleNumber: string){
        this.vehicleNumber=vehicleNumber;
    }

    public setIdentification(identification:string){
        this.identification=identification;
    }

    public getVehicleName(){
        return this.vehicleName;
    }

    public getVehicleModel(){
        return this.vehicleModel;
    }

    public getVehicleType(){
        return this.vehicleType;
    }

    public getVehicleNumber(){
        return this.vehicleNumber;
    }

    public getIdentification(){
        return this.identification;
    }

}

class Pass {
    private passType:string="";
    private totalBill:number;

    constructor(){
        this.passType="";
        this.totalBill=0;
    }

    public setTotalBill(totalBill:number){
        this.totalBill=totalBill;
    }

    public getTotalBill(){
        return this.totalBill;
    }
}

let newEmployee : Employee = new Employee();
let newVehicle : Vehicle = new Vehicle();
let newPass : Pass = new Pass();

// two body container and two expandable content employee detail and vehicle detail
const expandableContent = document.getElementsByClassName('expandable-content');
const bodyContainer = document.getElementsByClassName('body-container');

// navItem to navigate to section
const navItem:NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('.mobile-screen .navItem');

let empName: string ="";
let successMessage: string="";

// toggle to expande and collapse employee and vehicle section
function toggleSection(sectionName: string) {

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
function navigateToSection(selectElement : HTMLInputElement) {
    const selectedValue : string = selectElement.value;
    if (selectedValue) {
        // Smooth scroll to the selected section
        document.querySelector<HTMLOptionElement>(selectedValue)!.scrollIntoView({
            behavior: 'smooth'
        });
    }
}



//adding event listener to employee forms so that they appear one after the other after validation.
function displayEmployeeForm() {
    const employee : HTMLElement = document.querySelector<HTMLElement>('#employee-section')!;
    const formGroup: NodeListOf<HTMLDivElement>= employee.querySelectorAll<HTMLDivElement>('.form-group');
    const inputField: NodeListOf<HTMLInputElement> = employee.querySelectorAll<HTMLInputElement>('.input-field');
    const inputButton : NodeListOf<HTMLInputElement> = employee.querySelectorAll<HTMLInputElement>('input[type=button]');
    const select : HTMLSelectElement = employee.querySelector<HTMLSelectElement>('select')!;
    

    // changing the display of the employee form to none except for the first form
    for (let i = 1; i < formGroup.length; i++) {
        formGroup[i].style.display = 'none';
    }


    for (let i = 0, j = 0; i < formGroup.length && j < inputButton.length; i++) {

        if (formGroup[i].id !== 'gender') {

            inputField[j].addEventListener('keydown',(e) => {

                if(e.key ==='Enter'){
                    if (i + 1 < formGroup.length) {
                        if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    else {
                        if (validateEmployeeDetails(formGroup[i],new HTMLDivElement)) {
                            expandableContent[0].classList.toggle('active');
                            bodyContainer[0].classList.toggle('add-space');
                            alert(`Successfully Registered!`);
                        }
                    }
                }
                

            });


            inputButton[j].addEventListener('click', () => {
               
                    if (i + 1 < formGroup.length) {
                        if (validateEmployeeDetails(formGroup[i], formGroup[i + 1])) {
                            formGroup[i + 1].style.display = 'block';
                            formGroup[i].style.display = 'none';
                        }
                    }
                    else {
                        if (validateEmployeeDetails(formGroup[i],new HTMLDivElement)) {
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
                const target = e.target as HTMLSelectElement;

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
            select.addEventListener('change', () => {
                validateEmployeeDetails(formGroup[i], formGroup[i + 1]);
                formGroup[i + 1].style.display = 'block';
                formGroup[i].style.display = 'none';
            });
        }

    }
}
displayEmployeeForm();


// we will validate current field and update the label of next field if current field gets validated
// at the same time we will store the details into employee object
// here children[0] is label of that form
// and children[1] is the input of that form
function validateEmployeeDetails(currentField : HTMLDivElement, nextField: HTMLDivElement) {

    const label : HTMLLabelElement = currentField.children[0] as HTMLLabelElement;
    const labelName : string = label.htmlFor;

    const inputValue : HTMLInputElement = currentField.children[1] as HTMLInputElement;
    const value : string = inputValue.value;

    console.log(labelName);
    console.log(value);

    switch (labelName) {

        case 'fullame':
            {
                if (value === '') {
                    alert("Field cannot be empty");
                    
                }
                else if(value.length<2){
                    alert("Name should be more than 1 character");
                    
                }
                else if (validateFullName(value)) {
                    empName = value;
                    newEmployee.setFullName(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Can I know your Gender';
                    return true;
                }
                else{
                    alert('Invalid Name... Please enter again ');
                }
                return false;
            }

        case 'gender':
            {
                if(value){
                    newEmployee.setGender(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter your Email';
                    return true;
                }
                else{
                    alert('Select one of the option.');
                    return false;
                }
            }
            
        case 'email':
            {
                if (value === '') alert("Field cannot be empty");
                else if(validateEmail(value)) {
                    newEmployee.setEmailAddress(value);
                    nextField.children[0].innerHTML = 'Hi ' + empName + ', Enter a password';
                    return true;
                }
                else{
                    alert('Invalid Email... Please enter again ');
                }
                return false;
            }
        
        case 'password':
            {
                if (value === '') alert("Field cannot be empty");
                else if(value.length < 8) alert('Password length is insuffucient');
                else if(validatePassword(value) && checkPasswordStrength(value)>=5 ){
                    newEmployee.setPassword(value);
                    nextField.children[0].innerHTML = 'Confirm your password';
                    return true;
                }
                else if(validatePassword(value) && checkPasswordStrength(value)<5){
                    alert('Password is too weak');
                }
                else{
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
                if (value === '') alert("Field cannot be empty");
                else if(value.length<8 || value.length>15) alert('Number is too small or too long');
                else if(validateContact(value)){
                    newEmployee.setContact(value);
                    return true;
                }
                else{
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
function validateVehicleDetails(currentField:HTMLDivElement, nextField:HTMLDivElement) {

    const label : HTMLLabelElement = currentField.children[0] as HTMLLabelElement;
    const labelName : string = label.htmlFor;

    const inputValue : HTMLInputElement = currentField.children[1] as HTMLInputElement;
    const value : string = inputValue.value;

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
                else{
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
                    alert( 'Invalid vehicle number... Please enter again ');
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
    const vehicle : HTMLElement = document.querySelector<HTMLElement>('#vehicle-section')!;
    const formGroup:NodeListOf<HTMLDivElement> = vehicle.querySelectorAll<HTMLDivElement>('.form-group');
    const input:NodeListOf<HTMLInputElement> = vehicle.querySelectorAll<HTMLInputElement>('input[type=button]');
    const inputField:NodeListOf<HTMLInputElement> = vehicle.querySelectorAll<HTMLInputElement>('.input-field');
    const select:HTMLSelectElement = vehicle.querySelector<HTMLSelectElement>('select')!;
    const pricingItem:NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('#pricing .pricing-item');


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
                        if (validateVehicleDetails(formGroup[i],new HTMLDivElement)) {
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            successMessage=`Successfully registered your RegistrationId is : ${newEmployee.getRegId()}`;
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
                        if (validateVehicleDetails(formGroup[i],new HTMLDivElement)) {
                            expandableContent[1].classList.toggle('active');
                            bodyContainer[1].classList.toggle('add-space');
                            successMessage=`Successfully registered your token number is : ${newEmployee.getRegId()}`;
                            successAlert(successMessage);
                        }
                    }
                
            });
            j++;
        }


        if (formGroup[i].id == 'vehicle-type') {
            select.addEventListener('change', () => {
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

    }

}
displayVehicleForm();


function validateFullName(name:string): boolean {
    const fullNameRegex = /^[a-zA-Z ]{2,}$/;
    return fullNameRegex.test(name);
}


function validateEmail(email : string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password : string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateConfirmPassword(confirmPassword : string) {
    if (confirmPassword === newEmployee.getPassword()) return true;
    else return false;
}

function checkPasswordStrength(password : string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[ @$!%*?&]/.test(password)) strength++;
    return strength;
}

function validateContact(contact : string) {
    const contactRegex = /^[\d]{8,}$/;
    return contactRegex.test(contact);
}

function validateText(text : string) {
    const textRegex = /^[a-zA-Z0-9., ]{2,}$/;
    return textRegex.test(text);
}
function validateEmpId(empId : string) {
    const empIdRegex = /^[\d]{4}$/;
    return empIdRegex.test(empId);
}

function validateVehicleNumber(number : string) {
    const numberRegex = /^[A-Z0-9\-]{4,}$/;
    return numberRegex.test(number);
}



// we will only take numeric string for now
const numericString: string = '0123456789';
//generate random string for token number
function generateRandomString(length:number, chars: string) {
    var result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}



function updateCurrency(pricingItem: HTMLDivElement) {

    const currencyMenuDiv:HTMLDivElement = document.querySelector<HTMLDivElement>('.currency-convertor')!;
    const currencyMenu:HTMLSelectElement = document.querySelector<HTMLSelectElement>('#currency')!;
    const pricingCategory:NodeListOf<HTMLDivElement> = pricingItem.querySelectorAll<HTMLDivElement>('.pricing-category');
    const pricingType:HTMLDivElement = pricingItem.querySelector<HTMLDivElement>('.pricing-type')!;
    const pricingOption: NodeListOf<HTMLOptionElement> = pricingType.querySelectorAll<HTMLOptionElement>('option');
    const pricingTenure :string[] = ['Daily','Monthly','Yearly'];
    //will show the conversion menu only when pricing item is visible
    currencyMenuDiv.style.display = 'block';

    // Include api for currency change
    const api:string = "https://api.exchangerate-api.com/v4/latest/USD";
    
    let resultTo : string;
    let resultFrom:string = 'USD';


    console.log(pricingCategory);
    currencyMenu.addEventListener('change', (e:Event) => {
        const target = e.target as HTMLSelectElement;
        resultTo = target.value;
        console.log(target.value);
        getResults();
        console.log('event listener success');
    });

    function getResults() {
        fetch(`${api}`)
            .then(currency => {
                return currency.json();
            }).then(convertTo);
        console.log('fetch statement success');
    }

    function convertTo(currency: { rates: { [x: string]: number; }; }) {

        let fromRate : number = currency.rates[resultFrom];
        console.log(fromRate);
        let toRate : number = currency.rates[resultTo];
        console.log(toRate);
        for (let i = 0; i < pricingCategory.length; i++) {
            const price:number = parseInt(pricingCategory[i].children[1].innerHTML);
            pricingCategory[i].children[1].innerHTML = Math.round(((toRate / fromRate) * price)).toString();
            convertSymbols(resultTo, i);
            pricingOption[i+1].innerHTML=pricingTenure[i]+" "+pricingCategory[i].children[1].innerHTML+" "+pricingCategory[i].children[2].innerHTML;
            console.log(price);
        }

        
        resultFrom = resultTo; //update the currency 
        console.log('convert to success');
    }

    function convertSymbols(resultTo : string, i:number) {
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


function successAlert(successMessage:string){
     // Get the modal
    const modal:HTMLDivElement = document.querySelector("#myModal")!;
    modal.style.display = "block";
   
    const modelContent:HTMLDivElement = modal.querySelector<HTMLDivElement>('.modal-content')!;

    modelContent.children[1].innerHTML=successMessage;
    
    
    // Get the <span> element that closes the modal
    const span: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".close")!;
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

function purchaseItem(selectedItem: HTMLDivElement){
    
    // get the pricing select menu
    const pricingOption: HTMLSelectElement = selectedItem.querySelector<HTMLSelectElement>('#pricingOption')!;
  
    const pricingCategory : NodeListOf<HTMLDivElement>= selectedItem.querySelectorAll<HTMLDivElement>('.pricing-category');
    
    //get the purchase button
    const purchaseBtn:HTMLButtonElement = selectedItem.querySelector<HTMLButtonElement>('.purchase-button')!;
    console.log(purchaseBtn);


   let checkoutBill:string = "";
   let targetValue:string;

    pricingOption.addEventListener('change',(e)=>{
        console.log(pricingOption.selectedIndex);
        const target = e.target as HTMLSelectElement;
        targetValue=target.value;
        checkoutBill=`Hey ${newEmployee.getFullName()}, <br> Your total Bill is ${pricingCategory[pricingOption.selectedIndex-1].children[1].innerHTML} ${pricingCategory[pricingOption.selectedIndex-1].children[2].innerHTML}`;
    });
    console.log(checkoutBill);
    purchaseBtn.addEventListener('click', (e)=>{
            const target = e.target as HTMLButtonElement;
            const totalBill=pricingCategory[pricingOption.selectedIndex-1].children[1].innerHTML+" "+pricingCategory[pricingOption.selectedIndex-1].children[2].innerHTML;
            newPass.setTotalBill(parseInt(totalBill));
            if(targetValue){
                successAlert(checkoutBill);
                console.log(target.value + " success ");
            }
            else{
                successAlert('Failed... Please choose a package');
            }
    });
    

}