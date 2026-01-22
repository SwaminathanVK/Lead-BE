import Lead from '../Models/Lead.js';

// Get all leads for logged-in user
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Get Leads Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Get single lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error('Get Lead Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Create new lead
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const newLead = new Lead({
      name,
      email,
      phone,
      status: status || 'New',
      userId: req.user._id
    });

    await newLead.save();

    return res.status(201).json({
      message: 'Lead created successfully',
      lead: newLead
    });
  } catch (error) {
    console.error('Create Lead Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    // Find lead
    const lead = await Lead.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Update fields
    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (status) lead.status = status;

    await lead.save();

    return res.status(200).json({
      message: 'Lead updated successfully',
      lead
    });
  } catch (error) {
    console.error('Update Lead Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Delete lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete Lead Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};