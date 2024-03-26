const { CareerApply } = require('../model/CareerApply');

exports.addCandidate = async (req, res) => {
    const careerApply = new Candidate(req.body);
    try {
        const doc = await careerApply.save();
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

exports.UpdateCandidate = async (req, res) => {
    try {
        const id = req.params.id;
        const candidateData = req.body;

        const updatedCandidate = await CareerApply.findByIdAndUpdate(id, candidateData, { new: true });

        if (!updatedCandidate) {
            return res.status(404).json({
                success: false,
                data: 'Candidate not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCandidate
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"

        });
    }
}

exports.fetchAllCandidates = async (req, res) => {
    try {
        const candidateData = await CareerApply.find();
        res.status(200).json({
            success: true,
            data: candidateData

        });

    } catch (err) {
    console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchCandidateById = async (req, res) => {
    const { id } = req.params;

    try {
        const candidate = await CareerApply.findById(id);
        res.status(200).json({
            success: true,
            data: candidate
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

// Dummy data generation function
exports.generateDummyProducts = async (req, res) => {
    const dummyProducts = [];
    try {
        for (let i = 1; i <= 10; i++) {
            dummyProducts.push({
                firstName: `Harshang`,
                lastName: 'Thakar',
                email: 'harshangthakar@gmail.com',
                password: 'harshangthakar',
                policyAccepted: true
            });
        }
        // Insert dummy products into the database
        await CareerApply.insertMany(dummyProducts);
        res.status(200).json({
            success: true,
            data: "done"
        });
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
        await CareerApply.deleteMany({}); // Delete all Customer
        res.status(200).json({
            success: true,
            data: "All Careers deleted successfully."
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};