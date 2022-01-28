function onFormSubmit(){
    if(validate()){
    var formData = readFormData();
    // var result = resulttax(formData);
    var result = {};
    result["taxoutcome"]=resulttax(formData);
    // result["taxoutcome"] = 'ss';
    insertResult(result);
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
    formData["withholding"] = document.getElementById("withholding").value;
    return formData;
}

function resulttax(data){
    var totalIncome = data.wage + data.interestincome-data.loanInt;
    var tax;
    // var data={};
    var incometax;
    var tuitioncredits;

    if (data.resident.toLowerCase()=="no"){
        incometax = (totalIncome-5000)*0.3;
        tax = incometax-data.withholding;
        // data["taxoutcome"]=tax;
        return tax;
    }
    else if (data.resident.toLowerCase()=="yes"){
       if(data.dependentof.toLowerCase()=="yes"){
        tax = "No need to file tax return for this period";
        // data["taxoutcome"]=tax;
        // return data;
        return tax;
       }
       else{
        tuitioncredits = tuitioncredit(totalIncome, data);
        if (data.maritalstatus.toLowerCase()== "single" ){
            ssd=12550;
            agi = income-ssd;
            incometax=incometaxS(agi);
        }
        else if(data.maritalstatus.toLowerCase()== "maried file jointly"){
            ssd= 25100;
            agi = income-ssd;
            incometax=incometaxMFJ(agi);
        }
        else if (data.maritalstatus.toLowerCase()== "maried file separately"){
            ssd =12550;
            agi = income-ssd;
            incometax=incometaxMFS(agi);
        }
        tax = incometax-tuitioncredits-data.withholding;
        // return data;
        return tax;
       }
   }
}
function insertResult(result){

    var table = document.getElementById("result").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = result.taxoutcome;
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
    var refundcredit;
    var nonrefundcredit;
    var totalcredit;
    // calculate agi and income tax
    if (data.maritalstatus.toLowerCase()== "single" ){
        ssd=12550;
        agi = income-ssd;
        incometax=incometaxS(agi);
    }
    else if(data.maritalstatus.toLowerCase()== "maried file jointly"){
        ssd= 25100;
        agi = income-ssd;
        incometax=incometaxMFJ(agi);
    }
    else if (data.maritalstatus.toLowerCase()== "maried file separately"){
        ssd =12550;
        agi = income-ssd;
        incometax=incometaxMFS(agi);
    }
    // situtations that not qualified for this credit
    if (agi >= 90000 && data.maritalstatus.toLowerCase()=="single"){
        totalcredit = 0;
        return totalcredit;
    }
    else if( agi >= 900000 && data.maritalstatus.toLowerCase()== "maried file separately"){
        totalcredit = 0;
        return totalcredit;
    }
    else if ( agi >= 180000 && data.maritalstatus.toLowerCase()== "maried file jointly"){
        totalcredit = 0;
        return totalcredit;
    }
    // divide user as two kinds, one has qualified tuition of more than $40000 and the other has qualified tution less than $4000. then calculate refundable tax credit and non refundable credit based on agi. 
    if (data.tuition >=4000){
        refundcredit = 1000;
        nonrefundcredit = min(incometax,1500);
        totalcredit = refundcredit+nonrefundcredit;
        return totalcredit;
    }
    else if (data.tuition >=2000 && data.tuition <4000){
        refundcredit = (2000+(data.tuition-2000)*0.25)*0.4;
        nonrefundcredit = min(incometax,(2000+(data.tuition-2000)*0.25)-refundcredit);
        totalcredit = refundcredit+nonrefundcredit;
        return totalcredit;
    }
    else if (data.tuition <2000){
        refundcredit = data.tuition * 0.4;
        // nonrefundcredit = min(incometax, (data.tuition-refundcredit));
        totalcredit = refundcredit+nonrefundcredit;
        return totalcredit;
    }
}

function incometaxS(taxableincome){
    var owentax;
    if (taxableincome <=9950 ){
        owentax = taxableincome * 0.1;
        return owentax;
    }
    if (taxableincome >9950 && taxableincome <= 40525){
        owentax = 995 + (taxableincome-9950)*0.12;
        return owentax;
    }
    if (taxableincome >40525 && taxableincome <=86375){
        owentax = 4664 + (taxableincome-40525)*0.22;
        return owentax;
    }
    if (taxableincome>86375 && taxableincome <90000){
        owentax = 14751 + (taxableincome-86375)*0.24;
        return owentax;
    }
}

function incometaxMFJ(taxableincome){
    var owentax;
    if (taxableincome <=19900 ){
        owentax = taxableincome * 0.1;
        return owentax;
    }
    if (taxableincome >19900 && taxableincome <= 81050){
        owentax = 1990 + (taxableincome-19900)*0.12;
        return owentax;
    }
    if (taxableincome >81050 && taxableincome <=172750){
        owentax = 9328 + (taxableincome-81050)*0.22;
        return owentax;
    }
    if (taxableincome>172750 && taxableincome <180000){
        owentax = 29502 + (taxableincome-172750)*0.24;
        return owentax;
    }
}

function incometaxMFS(taxableincome){
    var owentax;
    if (taxableincome <=9950 ){
        owentax = taxableincome * 0.1;
        return owentax;
    }
    if (taxableincome >9950 && taxableincome <= 40525){
        owentax = 995 + (taxableincome-9950)*0.12;
        return owentax;
    }
    if (taxableincome >40525 && taxableincome <=86375){
        owentax = 4664 + (taxableincome-40525)*0.22;
        return owentax;
    }
    if (taxableincome>86375 && taxableincome <90000){
        owentax = 14751 + (taxableincome-86375)*0.24;
        return owentax;
    }
}

function nonrefundablecredit(){
    
}