// Middleware to authenticate user by role
export const authenticateUserByRole = (allowedRoles) => (req, res, next) => {
  // Extract the user's role from the request object
  const userRole = req.user.role; // Assuming the role is available in the request object

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ success: false, message: 'You do not have permission to access this resource.' });
  }

  // If the user's role is allowed, proceed to the next middleware
  next();
};
