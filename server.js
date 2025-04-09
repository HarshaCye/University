const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'university'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { fullname, email, password, contactnumber, gender, address } = req.body;

    if (!fullname || !email || !password || !contactnumber || !gender || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email already exists
        const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(emailCheckQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the user into the database
            const query = 'INSERT INTO users (fullname, email, password, contactnumber, gender, address) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(query, [fullname, email, hashedPassword, contactnumber, gender, address], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.status(201).json({ message: 'Registration successful' });
            });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length > 0) {
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Personal details endpoint
app.post('/personal-details', (req, res) => {
    const {
        fullname,
        email,
        dob,
        phone,
        address,
        fatherName,
        motherName,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        objective,
        languages,
        hobbies,
    } = req.body;

    if (!fullname || !email || !dob || !phone || !address || !fatherName || !motherName) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO personal_details 
        (full_name, email, dob, phone, address, father_name, mother_name, linkedin_url, github_url, portfolio_url, objective, languages_proficiency, hobby) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [fullname, email, dob, phone, address, fatherName, motherName, linkedinUrl, githubUrl, portfolioUrl, objective, languages, hobbies],
        (err, result) => {
            if (err) {
                console.error('Error inserting personal details:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json({ message: 'Personal details saved successfully' });
        }
    );
});

// Education details endpoint
app.post('/education-details', (req, res) => {
    const {
        institution,
        degree,
        major,
        startYear,
        endYear,
        grade,
        interDegreeType, // Added Inter/Degree type
        interInstitution,
        interMajor,
        interStartYear,
        interEndYear,
        interGrade,
        tenthInstitution,
        tenthStartYear,
        tenthEndYear,
        tenthGrade,
        skillProficiency,
        certificateName,
        issuingOrganization,
        issueDate,
        certificateLink,
    } = req.body;

    console.log("Received Education Details:", req.body); // Log the received data

    if (
        !institution || !degree || !major || !startYear || !endYear || !grade ||
        !interDegreeType || !interInstitution || !interMajor || !interStartYear || !interEndYear || !interGrade ||
        !tenthInstitution || !tenthStartYear || !tenthEndYear || !tenthGrade || !skillProficiency
    ) {
        console.log("Validation Error: Missing required fields"); // Log validation errors
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO education_details 
        (institution_name_degree, degree, major_degree, start_year_degree, end_year_degree, grade_degree, 
        degree_inter_diploma, institution_name_inter_diploma, major_inter_diploma, start_year_inter_diploma, end_year_inter_diploma, grade_inter_diploma,
        institution_name_tenth, start_year_tenth, end_year_tenth, grade_tenth,
        skill_proficiency, certificate_name, issuing_organization, issue_date, certificate_link) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            institution, degree, major, startYear, endYear, grade,
            interDegreeType, interInstitution, interMajor, interStartYear, interEndYear, interGrade,
            tenthInstitution, tenthStartYear, tenthEndYear, tenthGrade,
            skillProficiency, certificateName, issuingOrganization, issueDate, certificateLink || null,
        ],
        (err, result) => {
            if (err) {
                console.error('Error inserting education details:', err); // Log database errors
                return res.status(500).json({ message: 'Server error' });
            }
            console.log("Education details inserted successfully:", result); // Log successful insertion
            res.status(201).json({ message: 'Education details saved successfully' });
        }
    );
});

// Other details endpoint
app.post('/other-details', (req, res) => {
    const {
        userId, // Assuming userId is passed to associate the data with a user
        projectTitle,
        technologiesUsed,
        projectDescription,
        projectLink,
        achievementTitle,
        achievementDescription,
        achievementDate,
        companyName,
        role,
        startDate,
        endDate,
        isCurrent,
        workDescription,
        referenceName,
        referenceRelation,
        referenceContactInfo,
        profilePhotoUrl,
        signature,
    } = req.body;

    console.log("Received Other Details:", req.body); // Log incoming data for debugging

    if (
        !userId || !projectTitle || !technologiesUsed || !projectDescription ||
        !companyName || !role || !startDate || (!endDate && !isCurrent) || !workDescription ||
        !referenceName || !referenceRelation || !referenceContactInfo
    ) {
        console.log("Validation Error: Missing required fields"); // Log validation errors
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    const query = `
        INSERT INTO project_experience 
        (user_id, project_title, technologies_used, description, project_link, 
        achievement_title, achievement_description, achievement_date, 
        company_name, role_or_designation, start_date, end_date, is_current, work_description, 
        reference_name, reference_relation, reference_contact_info, 
        profile_photo_url, signature) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            userId, projectTitle, technologiesUsed, projectDescription, projectLink || null,
            achievementTitle || null, achievementDescription || null, achievementDate || null,
            companyName, role, startDate, endDate || null, isCurrent || false, workDescription,
            referenceName, referenceRelation, referenceContactInfo,
            profilePhotoUrl || null, signature || null,
        ],
        (err, result) => {
            if (err) {
                console.error('Error inserting other details:', err); // Log database errors
                return res.status(500).json({ message: 'Server error' });
            }
            console.log("Other details inserted successfully:", result); // Log successful insertion
            res.status(201).json({ message: 'Other details saved successfully' });
        }
    );
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});