// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.4.22 < 0.9 .0;

//0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
//0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
//0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB

contract Healthcare {


    //struct Prescription

    struct Prescription {
        string prescription;
        bytes32 key;
        bytes32 otp;
        address[] authorizedPersons;
        bool exist;

    }


    mapping(uint256 => Prescription) public PrescriptionList;

    // struct Patient

    struct Patient {
        uint256 aadhaar;
        uint256[] prescriptions;
        bytes32 otp;
        bool exist;
    }


    mapping(address => Patient) public PatientList;


    address public admin;

    // constructor

    constructor() public{
        admin = msg.sender; // make admin who deployed the contract
    }
    
    function isAdmin() external view returns(string memory _status, string memory _msg) {
        if(msg.sender == admin){
            _status = "success";
            _msg = "Welcome Admin!";
            return (_status, _msg);
        }else{
            
            _status = "fail";
            _msg = "You are not admin!";
        }
    }
    function isDoctor() external view returns(string memory _status, string memory _msg) {
        if(DoctorList[msg.sender].exist == true){
            _status = "success";
            _msg = "You are a doctor!";
            return (_status, _msg);
        }else{
            
            _status = "fail";
            _msg = "You are not a doctor!";
        }
    }
    
    function isPatient() external view returns(string memory _status, string memory _msg) {
        if (PatientList[msg.sender].exist == true){
            _status = "success";
            _msg = "You are a patient!";
            return (_status, _msg);
        }else{
            
            _status = "fail";
            _msg = "You are not a patient!";
        }
    }
    function isPharmacy() external view returns(string memory _status, string memory _msg) {
        if (PharmacyList[msg.sender].exist == true){
            _status = "success";
            _msg = "It is a Pharmacy!";
            return (_status, _msg);
        }else{
            
            _status = "fail";
            _msg = "It is not a Pharmacy!";
        }
    }
    /*
     **
     **  function addPatient(address patientAddr, uint256 _aadhaar, string calldata _name,  string calldata _dob,  string calldata _gender, 
     *                       string calldata _bloodGroup, uint256 _emergencyContact)
     **
     **  Parameters          :   patientAddr         - Patient Address
     **                          _aadhaar            - Aadhaar number of the Patient
     **                          
     **  
     **  Description: Only admin can register a patient if patient is not already exist 
     **
     **
     */

    function addPatient(address patientAddr, uint256 _aadhaar) external returns(string memory _status, string memory _msg) {

        if (msg.sender != admin) {

            _status = "fail";
            _msg = "Only admin can add";
            return (_status, _msg);

        } else if (PatientList[patientAddr].exist == true) {

            _status = "fail";
            _msg = "Patient already exists!";
            return (_status, _msg);

        }
        PatientList[patientAddr].aadhaar = _aadhaar;
        PatientList[patientAddr].exist = true;

        _status = "success";
        _msg = "Patient Successfully added!";
        return (_status, _msg);

    }

    /*function modifyPatient( string calldata _name,  string calldata _dob,  string calldata _gender, 
    string calldata _bloodGroup, uint256 _emergencyContact) external{
        require(PatientList[msg.sender].exist==true, 'patient not  exists');
        PatientList[msg.sender].name = _name;
        PatientList[msg.sender].dob = _dob;
        PatientList[msg.sender].gender = _gender;
        PatientList[msg.sender].bloodGroup = _bloodGroup;
        PatientList[msg.sender].emergencyContact = _emergencyContact;
    }
    */
    function resetOTP(string calldata _otp) external returns(string memory _status, string memory _msg) {

        if (PatientList[msg.sender].exist != true) {
            _status = "fail";
            _msg = "patient not  exists";
            return (_status, _msg);
        }
        PatientList[msg.sender].otp = keccak256(abi.encodePacked(_otp, msg.sender));
        _status = "success";
        _msg = "OTP has been reset successfully!";
        return (_status, _msg);
    }

    /*function getPatDetails(address patientAddr) public view returns(uint256 _aadhaar, string memory _name, string memory _dob,
    string memory _gender, string memory _bloodGroup, uint256 _emergencyContact){
         require(msg.sender==admin || msg.sender==patientAddr, 'You are not authorized!');
        _aadhaar = PatientList[patientAddr].aadhaar;
        _name = PatientList[patientAddr].name; 
        _dob = PatientList[patientAddr].dob; 
        _gender = PatientList[patientAddr].gender; 
        _bloodGroup = PatientList[patientAddr].bloodGroup; 
        _emergencyContact = PatientList[patientAddr].emergencyContact; 
        
   }*/

    struct Doctor {
        string RegNo;
        string medCouncilName;
        string name;
        string areaExpertize;
        uint256 contactNo;
        bool exist;
    }

    mapping(address => Doctor) public DoctorList;

    /*
     **
     **  function addDoctor(address docAddr, string calldata _RegNo, string calldata _medCouncilName,  string calldata _name,  string calldata _areaExpertize, uint256 _contactNo)
     **
     **  Parameters          :   _docAddr            - Doctor Address
     **                          _RegNo              - Registration number of the Doctor
     **                          _medCouncilName     - Medical Council Name of the Doctor
     **                          _name               - Name of the Doctor
     **                          _areaExpertize      - Area of Expertize of the Doctor
     **  
     **  Description: Only admin can register a Doctor if Doctor is not already exist 
     **
     **
     */

    function addDoctor(address _docAddr, string calldata _RegNo, string calldata _medCouncilName, string calldata _name, string calldata _areaExpertize, uint256 _contactNo) external returns(string memory _status, string memory _msg){
       
        if (msg.sender != admin) {
            _status = "fail";
            _msg = "Only admin can register a doctor!";
            return (_status, _msg);
        }else if (DoctorList[_docAddr].exist == true) {
            _status = "fail";
            _msg = "Doctor already exists";
            return (_status, _msg);
        }
        DoctorList[_docAddr] = Doctor(_RegNo, _medCouncilName, _name, _areaExpertize, _contactNo, true);
        _status = "success";
        _msg = "Doctor has been added successfully!";
        return (_status, _msg);
        
        
    }

    function getDocDetails(address docAddr) public view returns(string memory _RegNo, string memory _name, string memory _status, string memory _msg) {

        if (msg.sender != admin) {
            _status = "fail";
            _msg = "Only admin can add";
            return ("", "", _status, _msg);
        }
        _RegNo = DoctorList[docAddr].RegNo;
        _name = DoctorList[docAddr].name;
        _status = "success";
        _msg = "success";
        return (_RegNo, _name, _status, _msg);
    }



    // struct Pharmacy

    struct Pharmacy {
        string RegNo;
        string name;
        uint256 contactNo;
        bool exist;
    }
    mapping(address => Pharmacy) public PharmacyList;

    /*
     **
     **  function addPharmacy(address _pharmAddr, string calldata _RegNo,  string calldata _name, uint256 _contactNo)
     **
     **  Parameters          :   _pharmAddr          - Pharmacy Address
     **                          _RegNo              - Registration number of the Pharmacy
     **                          _name               - Name of the Pharmacy
     **                          _contactNo          - Contact number of the Pharmacy
     **  
     **  Description: Only admin can register a Pharmacy if Pharmacy is not already exist 
     **
     **
     */

    function addPharmacy(address _pharmAddr, string calldata _RegNo, string calldata _name, uint256 _contactNo) external returns(string memory _status, string memory _msg) {

        if (msg.sender != admin) {

            _status = "fail";
            _msg = "Only admin can add";
            return (_status, _msg);

        } else if (PharmacyList[_pharmAddr].exist == true) {

            _status = "fail";
            _msg = "Pharmacy already exists!";
            return (_status, _msg);
        }

        PharmacyList[_pharmAddr] = Pharmacy(_RegNo, _name, _contactNo, true);
        _status = "success";
        _msg = "Pharmacy Successfully added!";
        return (_status, _msg);
    }

    event PrescriptionEvent(
        address _docAddr,
        address _patAddr,
        uint256 _value
    );


    function createPrescriptionID(address _patientAddr) public view returns(uint256) {
        uint prescriptionID = (PatientList[_patientAddr].aadhaar) * 1000 + (PatientList[_patientAddr].prescriptions.length + 1);
        return prescriptionID;
    }



    /*
     **
     **  function addPrescription(address _patientAddr, string memory _patOtp,string memory _prescription) 
     **
     **  Parameters           :   _patientAddr       - Patient Address
     **                           _patOtp            - OTP of the Patient 
     **                           _prescription      - Prescription
     **
     **  Description         :   If the user already registered as Doctor, and he/she has Patient Address, and Patient OTP
     **                          then he/she can add the Prescription
     ** 
     **
     */

    function addPrescription(address _patientAddr, string memory _patOtp, string memory _prescription) public returns(string memory _status, string memory _msg){
        
        
        if (DoctorList[msg.sender].exist != true) {

            _status = "fail";
            _msg = "You are not a doctor";
            return (_status, _msg);

        }else  if (PatientList[_patientAddr].otp != keccak256(abi.encodePacked(_patOtp, _patientAddr))) {

            _status = "fail";
            _msg = "Invalid OTP";
            return (_status, _msg);

        }  

        uint256 prescriptionID = createPrescriptionID(_patientAddr);
        bytes32 key = keccak256(abi.encodePacked(_patientAddr, msg.sender));

        PrescriptionList[prescriptionID].prescription = _prescription;
        PrescriptionList[prescriptionID].key = key;
        PrescriptionList[prescriptionID].authorizedPersons.push(msg.sender);
        PrescriptionList[prescriptionID].authorizedPersons.push(_patientAddr);
        PrescriptionList[prescriptionID].exist = true;

        PatientList[_patientAddr].prescriptions.push(prescriptionID);
        emit PrescriptionEvent(msg.sender, _patientAddr, prescriptionID);
        
        _status = "success";
        _msg = "Prescription Successfully added!";
        return (_status, _msg);
    }




    /*
     **
     **  function editPrescription(uint256 _prescriptionID, string memory _prescriptionOtp,address _patientAddr, string memory _prescription)
     **
     **  Parameters           :   _prescriptionID    - Prescription Id
     **                           _prescriptionOtp   - OTP of the Prescription 
     **                           _patientAddr       - Patient Address
     **                           _prescription      - New Prescription
     **
     **  Description         :   If the user already registered as Doctor, and he/she has Patient Address, and Prescription OTP
     **                          key which is generated from patient address and msg.sender, is matched with the Prescription key 
     **                          then he/she can edit the Prescription
     ** 
     **
     */

    function editPrescription(uint256 _prescriptionID, string memory _prescriptionOtp, address _patientAddr, string memory _prescription) public returns(string memory _status, string memory _msg){
      
        if (DoctorList[msg.sender].exist != true) {

            _status = "fail";
            _msg = "You are authorized to view this.";
            return (_status, _msg);

        }else  if (PrescriptionList[_prescriptionID].key != keccak256(abi.encodePacked(_patientAddr, msg.sender))) {

            _status = "fail";
            _msg = "Key verification failed";
            return (_status, _msg);

        }else  if (PatientList[_patientAddr].otp != keccak256(abi.encodePacked(_prescriptionOtp, _patientAddr))) {

            _status = "fail";
            _msg = "Invalid OTP";
            return (_status, _msg);

        }    

        PrescriptionList[_prescriptionID].prescription = _prescription;
        _status = "success";
        _msg = "Prescription has been edited successfully!";
       return (_status, _msg);
    }




    /*
     **
     **  function resetPrescriptionOTP( address _docAddr, uint256 _prescriptionID, string calldata _otp) 
     **
     **  Parameters           :   _docAddr           - Doctor Address
     **                           _prescriptionID    - Prescription Id
     **                           _otp               - OTP of the Prescription which is going to set
     **
     **  Description         :   If the user already registered as Patient, and he/she has Doctor Address, and
     **                          key which is generated from msg.sender and doctor address is matched with the Prescription key 
     **                          then he/she can set the OTP of the Prescription
     ** 
     **
     */

    function resetPrescriptionOTP(address _docAddr, uint256 _prescriptionID, string calldata _otp) external returns(string memory _status, string memory _msg){

        if (PatientList[msg.sender].exist != true) {

            _status = "fail";
            _msg = "patient not  exists";
            return (_status, _msg);

        }else  if (PrescriptionList[_prescriptionID].key !=  keccak256(abi.encodePacked(msg.sender, _docAddr))) {

            _status = "fail";
            _msg = "Key verification failed";
            return (_status, _msg);

        }

        PrescriptionList[_prescriptionID].otp = keccak256(abi.encodePacked(_otp, msg.sender));
        
        _status = "success";
        _msg = "Prescription OTP reset successfully!";
        return (_status, _msg);

    }




    /*
     **
     **  function addAuthPerson( address _docAddr, uint256 _prescriptionID, address _authrizedPerson)
     **
     **  Parameters           :   _docAddr           - Doctor Address
     **                           _prescriptionID    - Prescription Id
     **                           _authrizedPerson   - address of the user, who will be authorized to view the Prescription
     **
     **  Description         :   If the user already register as Patient or Doctor or Pharmacy, and he/she has otp, and authorized person 
     **                          then he/she can view the Prescription
     ** 
     **
     */

    function addAuthPerson(address _docAddr, uint256 _prescriptionID, address _authrizedPerson) external returns(string memory _status, string memory _msg){
       
        if (PatientList[msg.sender].exist != true) {

            _status = "fail";
            _msg = "patient not  exists";
            return (_status, _msg);

        }else  if (PrescriptionList[_prescriptionID].key !=  keccak256(abi.encodePacked(msg.sender, _docAddr))) {

            _status = "fail";
            _msg = "Key verification failed";
            return (_status, _msg);

        }
        PrescriptionList[_prescriptionID].authorizedPersons.push(_authrizedPerson);
        
        _status = "success";
        _msg = "Authorized person added successfully!";
        return (_status, _msg);

    }




    /*
     **
     **  function getPrescription(address _patientAddr, uint256 _prescriptionID, string  memory _otp)
     **
     **  Parameters           :   _patientAddr       - Patient Address
     **                           _prescriptionID    - Prescription Id
     **                           _otp               - OTP for accessing Prescription
     **
     **  Return             :    _prescription       - Prescription
     **  
     **
     **  Description         :   If the user already register as Patient or Doctor or Pharmacy, and he/she has otp, and authorized person 
     *                           then he/she can view the Prescription
     ** 
     **
     */

    function getPrescription(address _patientAddr, uint256 _prescriptionID, string memory _otp) public view returns(string memory _prescription, string memory _status, string memory _msg) {
        
        _prescription = "";
        if (DoctorList[msg.sender].exist != true || PharmacyList[msg.sender].exist != true || PatientList[msg.sender].exist != true) {

            _status = "fail";
            _msg = "You are not authorized!";
            return (_prescription, _status, _msg);

        }else  if (PrescriptionList[_prescriptionID].exist != true) {

            _status = "fail";
            _msg = "Wrong Prescription ID!";
            return (_prescription, _status, _msg);

        }
        
        bool authorized = false;

        //check user is authorized person or not

        for (uint i = 0; i < PrescriptionList[_prescriptionID].authorizedPersons.length; i++) {
            if (PrescriptionList[_prescriptionID].authorizedPersons[i] == msg.sender) {
                authorized = true; // if user address exists in authorizedPersons array of PrescriptionList, then change the authorized value to true
                break;
            }
        }

        if (authorized == true && PrescriptionList[_prescriptionID].otp == keccak256(abi.encodePacked(_otp, _patientAddr))) {

            _prescription = PrescriptionList[_prescriptionID].prescription;
            _status = "success";
            _msg = "success";
            return (_prescription, _status, _msg);

        }else{
            
            _status = "fail";
            _msg = "You are not authorized to view the prescription!";
            return (_prescription, _status, _msg);
        }
       

    }

}