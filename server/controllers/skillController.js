const Skill = require('../models/Skill');

// Get all skills
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new skill
exports.createSkill = async (req, res) => {
    const { name, proficiency, category, icon, description } = req.body;

    try {
        const skill = await Skill.create({
            name,
            proficiency,
            category,
            icon,
            description
        });
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a skill
exports.updateSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true });
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
