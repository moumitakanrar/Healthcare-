/*const displayPatient = async (healthcare, contract) => {
  healthcare = await contract.methods.sayHello().call();
  $("h2").html(healthcare);
};

const updateGreeting = (healthcare, contract, accounts) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods
      .updateGreeting(input)
      .send({ from: accounts[0], gas: 40000 });
    displayGreeting(healthcare, contract);
  });
};
*/
async function myAlert(message,status){
  if(status=="success"){
    type = "success"
  }else{
    type = "danger"
  }
var wrapper = document.createElement("div");
wrapper.innerHTML = '<div class="alert alert-'+type+' fade in" role="alert" data-dismiss="alert" >'+message+'</div>'
document.getElementById("msg-box").appendChild(wrapper);
}

const addPatient = async (healthcare, contract, accounts)=>{
  let patientAddr,aadhaar,name,dob, gender, bloodGroup, emergencyContact;

 $("#addPatForm").on("submit", async (e) => {
    e.preventDefault();

  patientAddr = $("#patAddress").val();
  aadhaar = $("#patAadhar").val();
  console.log(dob);
  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
  const receipt = await contract.methods
      .addPatient(patientAddr,aadhaar)
      //.addPatient(patientAddr,aadhaar,name,dob, gender, bloodGroup, emergencyContact)
      .send({ from: myAccount, gas: 4500000});
  contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    var event1 = events[events.length-1].returnValues;
    
    myAlert(event1._msg, event1._status);
    console.log(event1);
  });
  $("#addPatForm")[0].reset();

});
};


const addDoctor = async (healthcare, contract, accounts)=>{
  let docAddr, docRegNo, medCouncilName, docName, areaExpertize, docContactNo;

 $("#addDoctorForm").on("submit", async (e) => {
    e.preventDefault();

  docAddr = $("#docAddr").val();
  docRegNo = $("#docRegNo").val();
  medCouncilName = $("#medCouncilName").val();
  docName = $("#docName").val();
  areaExpertize = $("#areaExpertize").val();
  docContactNo = $("#docContactNo").val();

  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .addDoctor(docAddr, docRegNo, medCouncilName, docName, areaExpertize, docContactNo)
      .send({ from: myAccount, gas: 4500000});
  contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    var event1 = events[events.length-1].returnValues;
    
    myAlert(event1._msg, event1._status);
    console.log(event1);
  });
  $("#addDoctorForm")[0].reset();

});
};                       

const addPharmacy = async (healthcare, contract, accounts)=>{
  let pharmAddr, pharmRegNo, pharmName, pharmContactNo;

 $("#addPharmacyForm").on("submit", async (e) => {
    e.preventDefault();

  pharmAddr = $("#pharmAddr").val();
  pharmRegNo = $("#pharmRegNo").val();
  pharmName = $("#pharmName").val();
  pharmContactNo = $("#pharmContactNo").val();

  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .addPharmacy(pharmAddr, pharmRegNo, pharmName, pharmContactNo)
      .send({ from: myAccount, gas: 4500000});
  contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    var event1 = events[events.length-1].returnValues;
    
    myAlert(event1._msg, event1._status);
    console.log(event1);
  });
  $("#addPharmacyForm")[0].reset();
    
});
}; 

const addPrescription = async (healthcare, contract, accounts)=>{
  let patAddress2, patOTP2, prescription;
  var flag,prescriptionID;
 $("#addPrescription").on("submit", async (e) => {
    e.preventDefault();

  patAddress2 = $("#patAddress2").val();
  patOTP2 = $("#patOTP2").val();
  prescription = $("#prescription").val();

  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .addPrescription(patAddress2, patOTP2, prescription)
      .send({ from: myAccount, gas: 4500000});

  
  
  await contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    event1 = events[events.length-1].returnValues;
    flag = event1._status;
    myAlert(event1._msg, event1._status);
    console.log(flag);
    
  });
      
    await contract.getPastEvents("PrescriptionEvent", { filter: {_docAddr: myAccount, _patAddr: patAddress2.toUpperCase()},
    fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    prescriptionEvent = events[events.length-1].returnValues;
    prescriptionID = prescriptionEvent._value;
    //if(prescriptionEvent._value != )
    

  });

  if(flag=="success"){
    alert("Prescription ID:"+prescriptionID);
  }
  
  $("#addPrescription")[0].reset();
    
});
}; 

const editPrescription = async (healthcare, contract, accounts)=>{
 let prescriptionId3, presOTP2, patAddress3, prescription2;
 $("#editPrescription").on("submit", async (e) => {
    e.preventDefault();

  
  prescriptionId3 = $("#prescriptionId3").val();
  patAddress3 = $("#patAddress3").val();
  presOTP2 = $("#presOTP2").val();
  prescription2 = $("#prescription2").val();

  console.log(prescriptionId3);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .editPrescription(prescriptionId3, presOTP2, patAddress3, prescription2)
      .send({ from: myAccount, gas: 4500000});  
  
  await contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    event1 = events[events.length-1].returnValues;
    flag = event1._status;
    myAlert(event1._msg, event1._status);
    console.log(flag);
    
  });

  
  $("#editPrescription")[0].reset();
    
});
}; 

const resetPrescriptionOTP = async (healthcare, contract, accounts)=>{
  let docAddress1, prescriptionId1, prescriptionOTP1;
 $("#resetPrescriptionOTP").on("submit", async (e) => {
    e.preventDefault();

  
  docAddress1 = $("#docAddress1").val();
  prescriptionId1 = $("#prescriptionId1").val();
  prescriptionOTP1 = $("#prescriptionOTP1").val();

  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .resetPrescriptionOTP(docAddress1, prescriptionId1, prescriptionOTP1)
      .send({ from: myAccount, gas: 4500000});  
  
  await contract.getPastEvents("ReturnValue", { fromBlock: 0 , toBlock: 'latest'}).then((events) =>{ 
    event1 = events[events.length-1].returnValues;
    flag = event1._status;
    myAlert(event1._msg, event1._status);
    console.log(flag);
    
  });  
  $("#resetPrescriptionOTP")[0].reset();
    
});
}; 

const getPrescription = async (healthcare, contract, accounts)=>{
  let patAddress5, prescriptionId5, presOTP5; 
  var flag, prescription;
 $("#getPrescription").on("submit", async (e) => {
    e.preventDefault();

  
  patAddress5 = $("#patAddress5").val();
  prescriptionId5 = $("#prescriptionId5").val();
  presOTP5 = $("#presOTP5").val();

  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .getPrescription(patAddress5, prescriptionId5, presOTP5)
      .call({ from: myAccount}).then((result) => {
        console.log(result._status);
        console.log(result._prescription);
        flag = result._status;
        prescription =  result._prescription;
        
      });    
  if(flag == "success"){
          console.log(prescription);
          $("#prescriptionDetails").html(prescription);
        }else{
          $("#prescriptionDetails").html();
        }
  $("#getPrescription")[0].reset();
    
});
}; 
/*

const isAdmin = async (healthcare, contract, accounts)=>{
   await contract.methods
      .isAdmin().call().then((result) => {
        if(result._status=="success"){
          console.log(result);
          $(".dashboard-1").show();
          $(".dashboard-2").hide();
          $(".dashboard-3").hide();
          $(".dashboard-4").hide();
      }
      });
}; */
const isDoctor = async (healthcare, contract, accounts)=>{
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
   await contract.methods
      .isDoctor().call({ from: myAccount}).then((result) => {
        
        if(result._status=="success"){
          console.log(result);
          $(".dashboard-3").show();
          $(".dashboard-1").hide();
          $(".dashboard-2").hide();
          $(".dashboard-4").hide();
        }
      });

        
}; 
const isPatient = async (healthcare, contract, accounts)=>{
   var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
   await contract.methods
      .isPatient().call({ from: myAccount}).then((result) => {
        
        if(result._status=="success"){
          console.log(result);
          $(".dashboard-2").show();
          $(".dashboard-1").hide();
          $(".dashboard-3").hide();
          $(".dashboard-4").hide();
        }
      });
}; 
const isPharmacy = async (healthcare, contract, accounts)=>{
   var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
   await contract.methods
      .isPharmacy().call({ from: myAccount}).then((result) => {
        if(result._status=="success"){
          console.log(result);
          $(".dashboard-4").show();
          $(".dashboard-1").hide();
          $(".dashboard-2").hide();
          $(".dashboard-3").hide();
        }
      });
}; 

const isAdmin = async (healthcare, contract, accounts)=>{
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
   await contract.methods
      .isAdmin().call({ from: myAccount}).then((result) => {
        if(result._status=="success"){
          console.log(result);
          $(".dashboard-1").show();
          $(".dashboard-2").hide();
          $(".dashboard-3").hide();
          $(".dashboard-4").hide();
      }else{
          $(".dashboard-3").hide();
          $(".dashboard-1").hide();
          $(".dashboard-2").hide();
          $(".dashboard-4").hide();
      }
      });
}; 
/*
const resetPatientOTP = async (healthcare, contract, accounts)=>{
  let patOTP1;

 $("#patientOtpReset").on("submit", async (e) => {
    e.preventDefault();

  patOTP1 = $("#patOTP1").val();
  
  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .resetOTP(patOTP1)
      .send({ from: myAccount, gas: 4500000}, function (err, res) {
    if (err) {
      console.log("An error occured", err);
      return;
    }
    console.log("Hash of the transaction: " + res);
    myAlert(res);
  });
    
});
};  
*/
const resetPatientOTP = async (healthcare, contract, accounts)=>{
  let patOTP1;

 $("#patientOtpReset").on("submit", async (e) => {
    e.preventDefault();

  patOTP1 = $("#patOTP1").val();
 

  console.log(patOTP1);
  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
  await contract.methods
      .resetOTP(patOTP1)
      .send({ from: myAccount, gas: 4500000}, function (err, res) {
    if (err) {
      console.log("An error occured", err);
      return;
    }
    console.log("Hash of the transaction: " + res);
    myAlert(res,"success");
  });
    
});
};
async function healthcareApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);

  ethereum.on('accountsChanged', (accounts) => {
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.
  window.location.reload();
  });

  // check balance
  var bal =  web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
    $( function() {
    $("#myBalance").html(bal);
    $("#myAddress").html(accounts[0]);
  }); 


  let healthcareData;
  addPatient(healthcareData, contract, accounts);
  addDoctor(healthcareData, contract, accounts);  
  addPharmacy(healthcareData, contract, accounts);
  //

  isAdmin(healthcareData, contract, accounts);
  isDoctor(healthcareData, contract, accounts);
  isPatient(healthcareData, contract, accounts);
  isPharmacy(healthcareData, contract, accounts);
 
  resetPatientOTP(healthcareData, contract, accounts);
  resetPrescriptionOTP(healthcareData, contract, accounts);
  
  addPrescription(healthcareData, contract, accounts);
  editPrescription(healthcareData, contract, accounts);
  getPrescription(healthcareData, contract, accounts);

}




healthcareApp();