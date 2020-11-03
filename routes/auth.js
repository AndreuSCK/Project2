var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const withAuth = require("../helpers/middleware");

const User = require('../models/user')
const DBQuestions = require('../models/dbquestions')
const CustomQuestions = require('../models/custom-questions')



const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
    res.render('signup');
});



router.post('/addquestion', withAuth, async (req, res, next) => {
    const { question, correct_answer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3 } = req.body
    const incorrect_answers = [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]
    const author = res.locals.currentUserInfo._id

    try {
        await CustomQuestions.create({
            incorrect_answers,
            question,
            correct_answer,
            author
        })
        res.render("addquestion", {
            message: `Question succesfully created.`,
        });
    } catch (error) {
        console.log(error)
        res.render("addquestion", { errorMessage: "Something went wrong." })
    }

})



router.post('/signup', async (req, res, next) => {
    const { name, email, password } = req.body
    if (email === "" || password === "" || name === "") {
        res.render("signup", {
            errorMessage: "Enter name, email and password to sign up.",
        });
        return;
    }
    try {
        const localUsuarioSignup = await User.findOne({ 'email': email })

        if (localUsuarioSignup !== null) {
            res.render("signup", {
                errorMessage: "Email already in use.",
            });
        }
        else {
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            await User.create({
                name,
                email,
                password: hashPass
            })
            res.render("login", {
                message: `User created succesfully.`,
            });


        }
    } catch (error) {
        res.render("login", {
            errorMessage: error,
        });
    }
});


router.get('/play', withAuth, (req, res, next) => {
    if (res.locals.isUserLoggedIn) {
        res.render('play')
    } else {
        res.redirect('/');
    }
})
router.post('/play', withAuth, async (req, res, next) => {

    const { category, difficulty, numberOfQuestions } = req.body
    const settings = { category, difficulty, numberOfQuestions: Number(numberOfQuestions) }
    let mongoResponse = []

    mongoResponse = await DBQuestions.find({ difficulty: difficulty, category: category });
    let mongoResponseLength = mongoResponse.length

    let arrayOfQuestions = []

    for (i = 0; i < numberOfQuestions; i++) {
        let randomPosition = Math.round(Math.random() * mongoResponseLength + 1)
        arrayOfQuestions.push(mongoResponse[randomPosition])
    }
    console.log(arrayOfQuestions[0].question)
    console.log(arrayOfQuestions.length)


    res.locals.currentQuestions = arrayOfQuestions[0].question
    // res.render('letsplay', settings)

    res.render('letsplay', arrayOfQuestions)
    // res.redirect('/letsplay')
})
router.get('/letsplay', withAuth, async (req, res, next) => {





})



router.get('/profile', withAuth, async (req, res, next) => {
    const questionsCreatedByUser = await CustomQuestions.find({ author: res.locals.currentUserInfo._id });
    // console.log(questionsCreatedByUser)



    if (res.locals.isUserLoggedIn) {
        res.render('profile', { userQuestions: questionsCreatedByUser, })

    } else {
        res.redirect('/');
    }
})
router.get('/addquestion', withAuth, (req, res, next) => {

    if (res.locals.isUserLoggedIn) {
        res.render('addquestion')
    } else {
        res.redirect('/');
    }
})


router.get('/editquestion/:id', withAuth, async (req, res, next) => {
    const singleQuestion = await CustomQuestions.findOne({ '_id': req.params.id })

    res.render('editquestion', { singleQuestion })

})
router.post('/editquestion/:id', withAuth, async (req, res, next) => {

    const { question, correct_answer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3 } = req.body
    const incorrect_answers = [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]

    try {
        await CustomQuestions.findByIdAndUpdate(req.params.id, {
            incorrect_answers,
            question,
            correct_answer,
        })
        // res.render("addquestion", {
        //     message: `Question succesfully created.`,
        // });
        res.locals.updated = "updated succesfully"
        res.redirect("/profile")

    } catch (error) {
        console.log(error)
        res.redirect("/addquestion")
    }
})
router.get('/deletequestion/:id', withAuth, async (req, res, next) => {
    await CustomQuestions.deleteOne({ "_id": req.params.id })
    res.redirect("/profile")

})






router.post('/login', async (req, res, next) => {
    res.locals.message = ""

    if (req.body.email === "" || req.body.password === "") {
        res.render("login", {
            errorMessage: "Please enter both, username and password to sign up.",
        });
        return;
    }
    // desestructuramos el email y el password de req.body
    const { email, password } = req.body;

    try {
        // revisamos si el usuario existe en BD
        const user = await User.findOne({ email });
        // si el usuario no existe, renderizamos la vista de auth/login con un mensaje de error
        if (!user) {
            res.render("login", {
                errorMessage: "The email doesn't exist",
            });
            return;
        } else if (bcrypt.compareSync(password, user.password)) {
            // generamos el token
            const userWithoutPass = await User.findOne({ email }).select("-password");
            // const payload = { userWithoutPass };
            const payload = { userID: userWithoutPass._id };
            // creamos el token usando el método sign, el string de secret session y el expiring time
            const token = jwt.sign(payload, process.env.SECRET_SESSION, {
                expiresIn: "2h",
            });
            // enviamos en la respuesta una cookie con el token y luego redirigimos a la home
            res.cookie("token", token, { httpOnly: true });



            res.status(200).redirect("/");
        } else {
            // en caso contrario, renderizamos la vista de auth/login con un mensaje de error
            res.render("login", {
                errorMessage: "Incorrect password",
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }

})



router.get('/', withAuth, async function (req, res, next) {

    if (res.locals.isUserLoggedIn) {
        res.render('home')
    } else {
        res.render('login');
    }
    // res.render('login');

});

module.exports = router;
