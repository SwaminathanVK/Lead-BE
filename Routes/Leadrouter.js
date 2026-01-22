import express from 'express';
import { 
  getAllLeads, 
  getLeadById, 
  createLead, 
  updateLead, 
  deleteLead 
} from '../Controllers/LeadController.js';
import auth from '../Middleware/Auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/leads
// @desc    Get all leads for logged-in user
// @access  Private
router.get('/', getAllLeads);

// @route   GET /api/leads/:id
// @desc    Get single lead by ID
// @access  Private
router.get('/:id', getLeadById);

// @route   POST /api/leads
// @desc    Create new lead
// @access  Private
router.post('/', createLead);

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private
router.put('/:id', updateLead);

// @route   DELETE /api/leads/:id
// @desc    Delete lead
// @access  Private
router.delete('/:id', deleteLead);

export default router;