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
  isDoctor(healthcareData, contract, accounts);
  isPatient(healthcareData, contract, accounts);
  isPharmacy(healthcareData, contract, accounts);
  isAdmin(healthcareData, contract, accounts);
 
  resetPatientOTP(healthcareData, contract, accounts);
 

}




healthcareApp();