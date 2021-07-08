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
const addPatient = async (healthcare, contract, accounts)=>{
  let patientAddr,aadhaar,name,dob, gender, bloodGroup, emergencyContact;

 $("#addPatForm").on("submit", async (e) => {
    e.preventDefault();

  patientAddr = $("#patAddress").val();
  aadhaar = $("#patAadhar").val();
  //name = $("#patName").val();
  //dob = $("#patDob").val();
  //gender = $("#patGender").val();
  //bloodGroup = $("#patBloodGroup").val();
  //emergencyContact = $("#patEmergencyContact").val();


  console.log(dob);
  console.log(accounts[0]);
  var myAcc = accounts[0];
  var myAccount = myAcc.toUpperCase();
    await contract.methods
      .addPatient(patientAddr,aadhaar)
      //.addPatient(patientAddr,aadhaar,name,dob, gender, bloodGroup, emergencyContact)
      .send({ from: myAccount, gas: 4500000});
    
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


const isAdmin = async (healthcare, contract, accounts)=>{
   await contract.methods
      .isAdmin().call().then((result) => {
        console.log(result);
        $( ".dashboard-1" ).show();
        $( ".dashboard-2" ).hide();
        $( ".dashboard-3" ).hide();
        $( ".dashboard-4" ).hide();
      });
}; 
const isDoctor = async (healthcare, contract, accounts)=>{
   await contract.methods
      .isDoctor().call().then((result) => {
        console.log(result);
        $( ".dashboard-2" ).show();
        $( ".dashboard-1" ).hide();
        $( ".dashboard-3" ).hide();
        $( ".dashboard-4" ).hide();
      });
}; 
const isPatient = async (healthcare, contract, accounts)=>{
   await contract.methods
      .isPatient().call().then((result) => {
        console.log(result);
        $( ".dashboard-3" ).show();
        $( ".dashboard-1" ).hide();
        $( ".dashboard-2" ).hide();
        $( ".dashboard-4" ).hide();
      });
}; 
const isPharmacy = async (healthcare, contract, accounts)=>{
   await contract.methods
      .isPharmacy().call().then((result) => {
        console.log(result);
        $( ".dashboard-4" ).show();
        $( ".dashboard-1" ).hide();
        $( ".dashboard-2" ).hide();
        $( ".dashboard-3" ).hide();
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
  isAdmin(healthcareData, contract, accounts);
  isDoctor(healthcareData, contract, accounts);
  isPatient(healthcareData, contract, accounts);
  isPharmacy(healthcareData, contract, accounts);
 

}




healthcareApp();