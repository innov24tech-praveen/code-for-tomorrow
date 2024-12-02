import { check, validationResult, body    } from 'express-validator';

export const inquiryValidation = [
    check('name', 'Name is required').trim().not().isEmpty(),
    check('mobile', 'Please enter a correct mobile no.').isLength({ min: 10 }).not().isEmpty().isMobilePhone('any', { strictMode: false }),
    check('type', 'Please select type').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('company', 'Company is required').trim().not().isEmpty(),
    check('refer_by', 'Referenced by is required').not().isEmpty(),
];

export const createContactValidation = [
    check('first_name', 'First Name is required').trim().not().isEmpty(),
    check('last_name', 'Last Name is required').trim().not().isEmpty(),
    check('customer_type', 'Customer Type is required').trim().not().isEmpty(),
    check('contact_type', 'Contact Type is required').trim().not().isEmpty(),
    check('mobile', 'Please enter a valid 10-digit mobile number').isMobilePhone('any'),
    check('other_number', 'Other Number must be a valid phone number').optional().isMobilePhone('any'),
    check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('description', 'Description is required').trim().not().isEmpty(),
    check('city', 'City is required').trim().not().isEmpty(),
    check('source', 'Source is required').trim().not().isEmpty(),
];

export const updateValidation = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('customer_type').notEmpty().withMessage('Customer type is required'),
    body('contact_type').notEmpty().withMessage('Contact type is required'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('description').notEmpty().withMessage('Description is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('source').notEmpty().withMessage('Source is required')
  ];


export default {
    inquiryValidation,
    validationResult,
    createContactValidation,
    updateValidation
};