const { Career } = require('../model/Careers');

exports.addCareer = async (req, res) => {
    const career = new Career(req.body);
    try {
        const doc = await career.save();
        res.status(201).json({
            success: true,
            data: doc
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"

        });
    }
}

exports.searchCareer = async (req, res) => {
    const { jobTitle, location, jobType } = req.body;
    try {
        const query = {};
        if (jobTitle) query.jobTitle = jobTitle;
        if (location) query.location = location;
        if (jobType) query.contractHours = jobType;

        // Find jobs based on constructed query
        const career = await Career.find(query);

        res.status(200).json({
            success: true,
            data:career

        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 
            success: false,
            data: 'Internal server error' 
        });
    }
}

exports.UpdateCareer = async (req, res) => {
    try {
        const careerId = req.params.jobId;
        const updatedCareerData = req.body;

        const updatedCareer = await Career.findByIdAndUpdate(careerId, updatedCareerData, { new: true });

        if (!updatedCareer) {
            return res.status(404).json({ 
                success: false,
                data: 'Career not found' });
        }

        res.status(200).json({
            success:true,
            data:updatedCareer
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success:false,
            data: "Internal server error"

        });
    }
}

exports.fetchAllCareers = async (req, res) => {
    try {
        const careerData = await Career.find();
        res.status(200).json({
            success:true,
            data:careerData
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success:false,
            data: "Internal server error"

        });
    }
};

exports.fetchCareerById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const career = await Career.findOne({ jobId: jobId });
        if (!career) {
            return res.status(200).json({ 
                success: false,
                data: 'Career not found' });
        }
        res.status(200).json({
            success: true,
            data:career
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ 
            success:false,
            data: 'Internal server error' });
    }
};

// Dummy data generation function
exports.generateDummyProducts = async (req, res) => {
    const dummyProducts = [];
    try {
        for (let i = 1; i <= 10; i++) {
            let newJobId = await generateUniqueJobId();
            dummyProducts.push({
                jobId: newJobId,
                title: 'Saint Rosario Sales Associate',
                location: 'Rajkot, Gujarat',
                status: 'active',
                category: 'Commercial - Stores',
                jobTitle: 'Sales Associate',
                contractHours: 'Full-time',
                minExp: '2-5 years',
                languages: ['English', 'Hindi'],
                jobDiscription: 'Join our SAINT ROSARIO Team in Harrods and be part of the exciting project of evolving in our Boutique!',
                assignment: ['Ensure the highest level of customer care, in line with Balmain\'s specific service expectations', 'Build and maintain a loyal client base, and retain customer loyalty by providing clients with personalized service', 'Help to maintain organization, cleanliness, and restock storewide', 'Work as part of a team to meet brand and store objectives', 'Comply with Balmain policies and procedures', 'Maintain and operate an efficient stock room enabling the sales team to maximize profitable sales'],
                profile: 'This position requires at least 3 years of experience on a similar assignment within a strong Couture House like ours. A first experience within a department store, at Harrods would be ideal. Candidates have to be familiar with luxury brand service standards and bring a clientbook of potential significant clients. Regular attendance and punctuality. Ability to professionally interact with management and coworkers. Excellent verbal and written communication skills in English. Strong organizational skills, multi-tasking and prioritizing capabilities.'
            });
        }
        // Insert dummy products into the database
        await Career.insertMany(dummyProducts);
        res.status(200).json({ 
            success: true,
            data: "done" });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"

        });
    }
}

exports.deleteAllProducts = async (req, res) => {
    try {
        await Career.deleteMany({}); // Delete all Customer
        res.status(200).json({ 
            success:true,
            data: "All Careers deleted successfully." });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success:false,
            data: "Internal server error"
        });
    }
};

async function generateUniqueJobId() {
    const prefix = 'ST';
    let newJobId;
    let isUnique = false;

    while (!isUnique) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        newJobId = `${prefix}${randomNumber}`;

        try {
            // Check if jobId already exists in the database
            const existingJob = await Career.findOne({ jobId: newJobId });
            if (!existingJob) {
                isUnique = true;
            }
        } catch (error) {
            throw new Error(`Error while generating an unique id : ${error.message}`);
        }
    }

    return newJobId
}