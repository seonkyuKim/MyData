const router = require("express").Router();

const auth = require("./auth");

const { userSignupValidator } = require("../validators/userValidator.js");
const { catchValidationError } = require("../validators/validator");

const { userSignup, userLogin } = require('../controllers/userController');

/*
 * @ Author: Seonkyu Kim
 * @ Entry URL: /api/users
 *
 */

// 회원가입
router.post('/signup', userSignupValidator, catchValidationError, userSignup);


// 로그인
router.post("/login", userLogin);

// 프로필 확인
router.get("/profile", auth.required, userLogin);

// 프로필 수정
router.put(
  "/profile",
  auth.required,
  // userValidator.updateProfile,
  // userController.updateProfile
);


module.exports = router;
