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
//    formData["withholding"] = document.getElementById("withholing").value;

    return formData;
}

function insertResult(data){
//    var totalIncome = data.wage + data.interestincome-data.loanInt;
//    var tax;
//    if (data.resident.toLowerCase()="no"){
//        tax = totalIncome*0.3;
//        document.getElementById("result").Value= tax;
//    }
//    else{
//        if(data.dependentof.toLowerCase()="yes"){
//            document.getElementById("result").Value= "No need to file tax return"
//        }
//        else{
//
//        }
//    }

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