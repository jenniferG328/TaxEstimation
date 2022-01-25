function onFormSubmit(){
    if(validate()){
    var formData = readFormData();
    insertResult(formData);
    resetForm();
    }
}

function readFormData(){
    var formData={};
    formData["resident"] = document.getElementById("resident").value;
    formData["maritalstatus"] = document.getElementById("maritalstatus").value;
    formData["age"] = document.getElementById("age").value;
    formData["dependentof"] = document.getElementById("dependentof").value;
    formData["wage"] = document.getElementById("wage").value;
    formData["interestincome"] = document.getElementById("interestincome").value;
    formData["tuition"] = document.getElementById("tuition").value;
    formData["loanInt"] = document.getElementById("loanInt").value;
    formData["withholding"] = document.getElementById("withholing").value;

    return formData;
}

function insertResult(data){
    var totalIncome = data.wage + data.interestincome-data.loanInt;
    var tax;
    if (data.resident.toLowerCase()="no"){
        var incometax = totalIncome*0.3;
        tax = incometax-data.withholding;
    }
    else{
       if(data.dependentof.toLowerCase()="yes"){
        tax = "No need to file tax return for this period"
       }
       else{

        function tuitioncredit(totalIncome, data);
       }
   }

    var table = document.getElementById("result").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.resident;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = '<a onClick= "onDelete(this)">Delete</a>';
}


function resetForm(){
    document.getElementById("resident").value ="";
    document.getElementById("maritalstatus").value ="";
    document.getElementById("age").value ="";
    document.getElementById("dependentof").value ="";
    document.getElementById("wage").value ="";
    document.getElementById("interestincome").value ="";
    document.getElementById("tuition").value ="";
    document.getElementById("loanInt").value ="";


}

function onDelete(td){
    if (confirm('Are you sure to delete this record ?'))
    row =td.parentElement.parentElement;
    document.getElementById('result').deleteRow(row.rowIndex);
     resetForm();
}

function validate(){
    isValid = true;
    if (document.getElementById("resident").value == ""){
        isValid = false;
        document.getElementById("residentValidationError").classList.remove("hide");
    } else {
        isValid=true;
        if (!document.getElementById("residentValidationError").classList.contains("hide"))
            document.getElementById("residentValidationError").classList.add("hide");
    }
    return isValid;
}

function tuitioncredit(income, data){
    var ssd;
    var agi;
    var incometax;
    if (data.maritalstatus.toLowerCase()= "single" ){
        ssd=12550;
        agi = income-ssd;
        incometax=incometaxS(agi);
    }
    else if(data.maritalstatus.toLowerCase()="maried file jointly"){
        ssd= 25100;
        agi = income-ssd;
        incometax=incometaxMFJ(agi);
    }
    else if (data.maritalstatus.toLowerCase()="maried file separately"){
        ssd =12550;
        agi = income-ssd;
        incometax=incometaxMFS(agi);
    }
   
}

function incometaxS(taxableincome){
    var owentax;
    if (taxableincome <=9950 ){
        owentax = taxableincome * 0.1;
    }
    if (taxableincome >9950 && taxableincome <= 40525){
        owentax = 995 + (taxableincome-9950)*0.12;
    }
    
}

function incometaxMFJ(taxableincome){

}

function incometaxMFS(taxableincome){

}