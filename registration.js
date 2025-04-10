import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns

const Register = () => {
    // State to track the current step
    const [currentStep, setCurrentStep] = useState(1);

    // Personal Details
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Add state for password
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [languages, setLanguages] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [objective, setObjective] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedProficiency, setSelectedProficiency] = useState('');
    const [languageProficiencyList, setLanguageProficiencyList] = useState([]); // To store selected languages and proficiencies
    const [languageName, setLanguageName] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState('');

    // Education Details
    const [institution, setInstitution] = useState('');
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [grade, setGrade] = useState('');
    const [skill, setSkill] = useState('');
    const [certifications, setCertifications] = useState('');
    const [projects, setProjects] = useState('');
    const [achievements, setAchievements] = useState('');
    const [references, setReferences] = useState('');
    const [hobby, setHobby] = useState('');

    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedSkillProficiency, setSelectedSkillProficiency] = useState('');
    const [skillProficiencyList, setSkillProficiencyList] = useState([]); // To store selected skills and proficiencies

    const [certificateName, setCertificateName] = useState('');
    const [issuingOrganization, setIssuingOrganization] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [certificateLink, setCertificateLink] = useState('');

    const [interInstitution, setInterInstitution] = useState('');
    const [interMajor, setInterMajor] = useState('');
    const [interStartYear, setInterStartYear] = useState('');
    const [interEndYear, setInterEndYear] = useState('');
    const [interGrade, setInterGrade] = useState('');
    const [interDegreeType, setInterDegreeType] = useState(''); // State for Inter/Degree type

    const [tenthInstitution, setTenthInstitution] = useState('');
    const [tenthStartYear, setTenthStartYear] = useState('');
    const [tenthEndYear, setTenthEndYear] = useState('');
    const [tenthGrade, setTenthGrade] = useState('');

    // Work Experience
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle DatePicker

    const [currentSection, setCurrentSection] = useState(''); // State to track the current section

    // Project Details
    const [projectTitle, setProjectTitle] = useState('');
    const [technologiesUsed, setTechnologiesUsed] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');

    // Experience Details
    const [companyName, setCompanyName] = useState('');
    const [isCurrent, setIsCurrent] = useState(false);
    const [workDescription, setWorkDescription] = useState('');

    // Reference Details
    const [referenceName, setReferenceName] = useState('');
    const [referenceRelation, setReferenceRelation] = useState('');
    const [referenceContactInfo, setReferenceContactInfo] = useState('');

    // Achievement Details
    const [achievementTitle, setAchievementTitle] = useState('');
    const [achievementDescription, setAchievementDescription] = useState('');
    const [achievementDate, setAchievementDate] = useState('');

    // Declaration Details
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const [signature, setSignature] = useState('');

    const addLanguageProficiency = () => {
        if (selectedLanguage && selectedProficiency) {
            setLanguageProficiencyList(prevList => [
                ...prevList,
                `${selectedLanguage}:${selectedProficiency}`,
            ]);
            setSelectedLanguage('');
            setSelectedProficiency('');
        } else {
            Alert.alert('Error', 'Please select both language and proficiency');
        }
    };

    const addManualLanguage = () => {
        if (languageName && proficiencyLevel) {
            setLanguageProficiencyList(prevList => [
                ...prevList,
                `${languageName}:${proficiencyLevel}`,
            ]);
            setLanguageName('');
            setProficiencyLevel('');
        } else {
            Alert.alert('Error', 'Please enter both language and proficiency');
        }
    };

    const addSkillProficiency = () => {
        if (selectedSkill && selectedSkillProficiency) {
            setSkillProficiencyList(prevList => [
                ...prevList,
                `${selectedSkill}:${selectedSkillProficiency}`,
            ]);
            setSelectedSkill('');
            setSelectedSkillProficiency('');
        } else {
            Alert.alert('Error', 'Please select both skill and proficiency');
        }
    };

    const savePersonalDetails = async () => {
        try {
            const response = await fetch('http://192.168.218.244:5000/personal-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password, // Include password in the request
                    dob,
                    phone,
                    address,
                    fatherName,
                    motherName,
                    linkedinUrl,
                    githubUrl,
                    portfolioUrl,
                    objective,
                    languages: languageProficiencyList.join(', '), // Format as comma-separated string
                    hobbies,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert('Error', data.message || 'Failed to save personal details');
            } else {
                Alert.alert('Success', 'Personal details saved successfully');
            }
        } catch (error) {
            console.error('Error saving personal details:', error);
            Alert.alert('Error', 'An error occurred while saving personal details');
        }
    };

    const saveEducationDetails = async () => {
        try {
            const response = await fetch('http://192.168.218.244:5000/education-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    institution,
                    degree,
                    major,
                    startYear,
                    endYear,
                    grade,
                    interDegreeType, // Include Inter/Degree type
                    interInstitution,
                    interMajor,
                    interStartYear,
                    interEndYear,
                    interGrade,
                    tenthInstitution,
                    tenthStartYear,
                    tenthEndYear,
                    tenthGrade,
                    skillProficiency: skillProficiencyList.join(', '), // Format as comma-separated string
                    certificateName,
                    issuingOrganization,
                    issueDate,
                    certificateLink,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert('Error', data.message || 'Failed to save education details');
            }
        } catch (error) {
            console.error('Error saving education details:', error);
            Alert.alert('Error', 'An error occurred while saving education details');
        }
    };

    const saveDetails = async () => {
        try {
            console.log("Sending Other Details:", {
                projectTitle,
                technologiesUsed,
                projectDescription,
                projectLink,
                achievementTitle: achievementTitle || null,
                achievementDescription: achievementDescription || null,
                achievementDate: achievementDate || null,
                companyName,
                role,
                startDate,
                endDate: endDate || null,
                isCurrent,
                workDescription,
                referenceName,
                referenceRelation,
                referenceContactInfo,
                profilePhotoUrl: profilePhotoUrl || null,
                signature: signature || null,
            }); // Log data being sent to the backend

            const response = await fetch('http://192.168.218.244:5000/other-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 2, // Replace with actual userId if available
                    projectTitle,
                    technologiesUsed,
                    projectDescription,
                    projectLink,
                    achievementTitle: achievementTitle || null,
                    achievementDescription: achievementDescription || null,
                    achievementDate: achievementDate || null,
                    companyName,
                    role,
                    startDate,
                    endDate: endDate || null,
                    isCurrent,
                    workDescription,
                    referenceName,
                    referenceRelation,
                    referenceContactInfo,
                    profilePhotoUrl: profilePhotoUrl || null,
                    signature: signature || null,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Error response from server:", data); // Log server errors
                Alert.alert('Error', data.message || 'Failed to save other details');
            } else {
                console.log("Other details saved successfully:", data); // Log successful response
                Alert.alert('Success', 'User details saved successfully');
            }
        } catch (error) {
            console.error('Error saving other details:', error); // Log unexpected errors
            Alert.alert('Error', 'An error occurred while saving other details');
        }
    };

    const nextStep = async () => {
        if (currentStep === 1) {
            await savePersonalDetails(); // Save personal details before moving to the next step
        } else if (currentStep === 2) {
            await saveEducationDetails(); // Save education details before moving to the next step
        }
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRegister = () => {
        // Perform validation and send data to your server
        Alert.alert('Registration Successful');
    };

    return (
        <ScrollView style={styles.container}>
            {/* Conditional Rendering Based on Current Step */}
            {currentStep === 1 && (
                <View>
                    <Text style={styles.header}>Personal Details</Text>
                    <TextInput
                        value={fullname}
                        onChangeText={setFullName}
                        style={styles.input}
                        placeholder="Full Name"
                    />
                    <TextInput
                        value={fatherName}
                        onChangeText={setFatherName}
                        style={styles.input}
                        placeholder="Father Name"
                    />
                    <TextInput
                        value={motherName}
                        onChangeText={setMotherName}
                        style={styles.input}
                        placeholder="Mother Name"
                    />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true} // Enable secure text entry for password
                    />
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                        <Text style={{ color: dob ? '#000' : '#aaa' }}>
                            {dob || 'Select Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob ? new Date(dob) : new Date()} // Use selected date or current date
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false); // Hide DatePicker
                                if (selectedDate) {
                                    setDob(selectedDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
                                }
                            }}
                        />
                    )}
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        placeholder="Phone"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                        placeholder="Address"
                    />
                    <Text style={styles.label}>Languages and Proficiency</Text>
                    <View style={styles.languageContainer}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Language" value="" />
                            <Picker.Item label="Hindi" value="Hindi" />
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="Spanish" value="Spanish" />
                            {/* Add more languages as needed */}
                        </Picker>
                        <Picker
                            selectedValue={selectedProficiency}
                            onValueChange={(itemValue) => setSelectedProficiency(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Proficiency" value="" />
                            <Picker.Item label="Expert" value="Expert" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Beginner" value="Beginner" />
                        </Picker>
                        <Button title="Add Language" onPress={addLanguageProficiency} />
                    </View>
                    <Text style={styles.label}>Or Enter Language Manually</Text>
                    <View style={styles.manualLanguageContainer}>
                        <TextInput
                            value={languageName}
                            onChangeText={setLanguageName}
                            style={styles.input}
                            placeholder="Language Name"
                        />
                        <TextInput
                            value={proficiencyLevel}
                            onChangeText={setProficiencyLevel}
                            style={styles.input}
                            placeholder="Proficiency (e.g., Expert, Intermediate, Beginner)"
                        />
                        <Button title="Add Manual Language" onPress={addManualLanguage} />
                    </View>
                    <Text style={styles.label}>Selected Languages:</Text>
                    <View style={styles.languageList}>
                        {languageProficiencyList.map((item, index) => (
                            <Text key={index} style={styles.languageItem}>{item}</Text>
                        ))}
                    </View>
                    <TextInput
                        value={hobbies}
                        onChangeText={setHobbies}
                        style={styles.input}
                        placeholder="Hobbies"
                    />
                    <TextInput
                        value={linkedinUrl}
                        onChangeText={setLinkedinUrl}
                        style={styles.input}
                        placeholder="LinkedIn URL"
                    />
                    <TextInput
                        value={githubUrl}
                        onChangeText={setGithubUrl}
                        style={styles.input}
                        placeholder="GitHub URL (if applicable)"
                    />
                    <TextInput
                        value={portfolioUrl}
                        onChangeText={setPortfolioUrl}
                        style={styles.input}
                        placeholder="Portfolio URL (optional)"
                    />
                    <TextInput
                        value={objective}
                        onChangeText={setObjective}
                        style={styles.input}
                        placeholder="Objective or Summary"
                    />
                </View>
            )}

            {currentStep === 2 && (
                <View>
                    <Text style={styles.header}>Education</Text>
                    {/* Degree Details */}
                    <Text style={styles.subHeader}>Degree Details</Text>
                    <TextInput
                        value={institution}
                        onChangeText={setInstitution}
                        style={styles.input}
                        placeholder="Institution Name"
                    />
                    <Picker
                        selectedValue={degree}
                        onValueChange={(itemValue) => setDegree(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Degree" value="" />
                        <Picker.Item label="B.Tech" value="B.Tech" />
                        <Picker.Item label="MBA" value="MBA" />
                        <Picker.Item label="B.Sc" value="B.Sc" />
                        {/* Add more degrees as needed */}
                    </Picker>
                    <TextInput
                        value={major}
                        onChangeText={setMajor}
                        style={styles.input}
                        placeholder="Major"
                    />
                    <TextInput
                        value={startYear}
                        onChangeText={setStartYear}
                        style={styles.input}
                        placeholder="Start Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={endYear}
                        onChangeText={setEndYear}
                        style={styles.input}
                        placeholder="End Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={grade}
                        onChangeText={setGrade}
                        style={styles.input}
                        placeholder="Grade"
                        keyboardType="numeric"
                    />

                    {/* Inter Details */}
                    <Text style={styles.subHeader}>Inter Details</Text>
                    <Picker
                        selectedValue={interDegreeType}
                        onValueChange={(itemValue) => setInterDegreeType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Inter/Degree Type" value="" />
                        <Picker.Item label="Intermediate" value="Intermediate" />
                        <Picker.Item label="Diploma" value="Diploma" />
                    </Picker>
                    <TextInput
                        value={interInstitution}
                        onChangeText={setInterInstitution}
                        style={styles.input}
                        placeholder="Institution Name"
                    />
                    <TextInput
                        value={interMajor}
                        onChangeText={setInterMajor}
                        style={styles.input}
                        placeholder="Major"
                    />
                    <TextInput
                        value={interStartYear}
                        onChangeText={setInterStartYear}
                        style={styles.input}
                        placeholder="Start Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={interEndYear}
                        onChangeText={setInterEndYear}
                        style={styles.input}
                        placeholder="End Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={interGrade}
                        onChangeText={setInterGrade}
                        style={styles.input}
                        placeholder="Grade"
                        keyboardType="numeric"
                    />

                    {/* 10th Details */}
                    <Text style={styles.subHeader}>10th Details</Text>
                    <TextInput
                        value={tenthInstitution}
                        onChangeText={setTenthInstitution}
                        style={styles.input}
                        placeholder="Institution Name"
                    />
                    <TextInput
                        value={tenthStartYear}
                        onChangeText={setTenthStartYear}
                        style={styles.input}
                        placeholder="Start Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={tenthEndYear}
                        onChangeText={setTenthEndYear}
                        style={styles.input}
                        placeholder="End Year"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={tenthGrade}
                        onChangeText={setTenthGrade}
                        style={styles.input}
                        placeholder="Grade"
                        keyboardType="numeric"
                    />

                    {/* Skills and Certificates */}
                    <Text style={styles.label}>Skills and Proficiency</Text>
                    <View style={styles.languageContainer}>
                        <Picker
                            selectedValue={selectedSkill}
                            onValueChange={(itemValue) => setSelectedSkill(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Skill" value="" />
                            <Picker.Item label="Python" value="Python" />
                            <Picker.Item label="Java" value="Java" />
                            <Picker.Item label="JavaScript" value="JavaScript" />
                            {/* Add more skills as needed */}
                        </Picker>
                        <Picker
                            selectedValue={selectedSkillProficiency}
                            onValueChange={(itemValue) => setSelectedSkillProficiency(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Proficiency" value="" />
                            <Picker.Item label="Expert" value="Expert" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Beginner" value="Beginner" />
                        </Picker>
                        <Button title="Add Skill" onPress={addSkillProficiency} />
                    </View>
                    <Text style={styles.label}>Selected Skills:</Text>
                    <View style={styles.languageList}>
                        {skillProficiencyList.map((item, index) => (
                            <Text key={index} style={styles.languageItem}>{item}</Text>
                        ))}
                    </View>
                    <Text style={styles.label}>Certificate Details</Text>
                    <TextInput
                        value={certificateName}
                        onChangeText={setCertificateName}
                        style={styles.input}
                        placeholder="Certificate Name"
                    />
                    <TextInput
                        value={issuingOrganization}
                        onChangeText={setIssuingOrganization}
                        style={styles.input}
                        placeholder="Issuing Organization"
                    />
                    <TextInput
                        value={issueDate}
                        onChangeText={setIssueDate}
                        style={styles.input}
                        placeholder="Issue Date (YYYY-MM-DD)"
                    />
                    <TextInput
                        value={certificateLink}
                        onChangeText={setCertificateLink}
                        style={styles.input}
                        placeholder="Certificate Link (optional)"
                    />
                </View>
            )}

            {currentStep === 3 && (
                <View>
                    <Text style={styles.header}>Other Details</Text>

                    {/* Project Details */}
                    <Text style={styles.subHeader}>Project Details</Text>
                    <TextInput
                        value={projectTitle}
                        onChangeText={setProjectTitle}
                        style={styles.input}
                        placeholder="Project Title"
                    />
                    <TextInput
                        value={technologiesUsed}
                        onChangeText={setTechnologiesUsed}
                        style={styles.input}
                        placeholder="Technologies Used"
                    />
                    <TextInput
                        value={projectDescription}
                        onChangeText={setProjectDescription}
                        style={styles.input}
                        placeholder="Description"
                    />
                    <TextInput
                        value={projectLink}
                        onChangeText={setProjectLink}
                        style={styles.input}
                        placeholder="Project Link (optional)"
                    />

                    {/* Experience Details */}
                    <Text style={styles.subHeader}>Experience Details</Text>
                    <TextInput
                        value={companyName}
                        onChangeText={setCompanyName}
                        style={styles.input}
                        placeholder="Company Name"
                    />
                    <TextInput
                        value={role}
                        onChangeText={setRole}
                        style={styles.input}
                        placeholder="Role or Designation"
                    />
                    <TextInput
                        value={startDate}
                        onChangeText={setStartDate}
                        style={styles.input}
                        placeholder="Start Date (YYYY-MM-DD)"
                    />
                    <TextInput
                        value={endDate}
                        onChangeText={setEndDate}
                        style={styles.input}
                        placeholder="End Date (YYYY-MM-DD)"
                    />
                    <View style={styles.checkboxContainer}>
                        <Text>Is Current:</Text>
                        <Switch
                            value={isCurrent}
                            onValueChange={setIsCurrent}
                        />
                    </View>
                    <TextInput
                        value={workDescription}
                        onChangeText={setWorkDescription}
                        style={styles.input}
                        placeholder="Description (Responsibilities or Achievements)"
                    />

                    {/* Reference Details */}
                    <Text style={styles.subHeader}>Reference Details</Text>
                    <TextInput
                        value={referenceName}
                        onChangeText={setReferenceName}
                        style={styles.input}
                        placeholder="Reference Name"
                    />
                    <TextInput
                        value={referenceRelation}
                        onChangeText={setReferenceRelation}
                        style={styles.input}
                        placeholder="Relation"
                    />
                    <TextInput
                        value={referenceContactInfo}
                        onChangeText={setReferenceContactInfo}
                        style={styles.input}
                        placeholder="Contact Info"
                    />

                    {/* Achievement Details */}
                    <Text style={styles.subHeader}>Achievement Details</Text>
                    <TextInput
                        value={achievementTitle}
                        onChangeText={setAchievementTitle}
                        style={styles.input}
                        placeholder="Title"
                    />
                    <TextInput
                        value={achievementDescription}
                        onChangeText={setAchievementDescription}
                        style={styles.input}
                        placeholder="Description"
                    />
                    <TextInput
                        value={achievementDate}
                        onChangeText={setAchievementDate}
                        style={styles.input}
                        placeholder="Date (optional)"
                    />

                    {/* Declaration Details */}
                    <Text style={styles.subHeader}>Declaration</Text>
                    <TextInput
                        value={profilePhotoUrl}
                        onChangeText={setProfilePhotoUrl}
                        style={styles.input}
                        placeholder="Profile Photo URL"
                    />
                    <TextInput
                        value={signature}
                        onChangeText={setSignature}
                        style={styles.input}
                        placeholder="Signature URL"
                    />
                </View>
            )}

            <View style={styles.buttonContainer}>
                <Button title="Previous" onPress={prevStep} disabled={currentStep === 1} />
                {currentStep === 3 ? (
                    <Button title="Submit" onPress={handleRegister} />
                ) : (
                    <Button title="Next" onPress={nextStep} />
                )}
            </View>

            <Button title="Submit" onPress={saveDetails} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 'bold',
        color: '#444',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        height: 50,
        marginBottom: 12,
        backgroundColor: '#f0f0f0', // Light background for better visibility
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc', // Subtle border color
        paddingHorizontal: 8, // Add padding for better alignment
        fontSize: 16, // Increase font size for readability
        color: '#333', // Text color
    },
    pickerItem: {
        fontSize: 16, // Font size for dropdown items
        color: '#333', // Text color for dropdown items
    },
    languageContainer: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd', // Subtle border for the container
    },
    manualLanguageContainer: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd', // Subtle border for the container
    },
    languageList: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#e9e9e9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc', // Subtle border for the list
    },
    languageItem: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
});

export default Register;
