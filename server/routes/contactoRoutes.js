const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user")
const contactoController = require("../controllers/contactoController");
const auth = require("../middlewares/auth")

router.get("/contactos/:userId", contactoController.getContactosByUserId);
router.get("/contacto/:id",  contactoController.getContactoById);
router.post("/contacto",  contactoController.createContacto);
router.put("/contacto/:id",  contactoController.updateContacto);
router.delete("/contacto/:id",  contactoController.deleteContacto);
router.post("/signup", userCtrl.signUp);
router.post("/signin", userCtrl.signIn);
router.get('/user',auth, userCtrl.getUserId);

module.exports = router;
