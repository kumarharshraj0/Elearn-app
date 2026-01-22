const express = require('express');
const { signup, signin, getEnrolledCourses, createUser, getUsers, getUserById, updateUser, deleteUser,uploadProfilePicture } = require('../controllers/authcontrollers'); // file ka exact naam aur lowercase function
const { protect, authorize } = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadMiddleware');
const passport = require("passport");

const jwt = require("jsonwebtoken");
const router = express.Router();

// ✅ Route path "/" ke andar aayega, yaha tumne "authrouter/..." likh diya tha
router.post('/signup', signup);
router.post('/signin', signin);
router.put("/update/:id", protect, upload.single("profileImage"), updateUser);
router.get('/enrolled-courses', protect, getEnrolledCourses);
router.post('/upload-profile-picture', protect,upload.single("profileImage"), uploadProfilePicture); // Add route for profile picture upload



router.get("/google", passport.authenticate("google", {scope:["profile", "email"]}))

router.get("/google/callback", 

    passport.authenticate("google", {session:false}),
    (req, res)=>{
        try {
            const token = jwt.sign({id:req.user._id, email:req.user.email}, process.env.JWT_SECRET, {expiresIn:"7d"})
            res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`)
        } catch (error) {
            console.error("Google login error:", error)
            res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
        }
    }
)





// Admin User Management Routes
router.route('/admin/users')
  .post(protect, authorize('admin'), createUser)
  .get(protect, authorize('admin'), getUsers);

router.route('/admin/users/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
