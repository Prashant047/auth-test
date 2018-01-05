export const homePage = (req, res) => {
    res.render('pages/home');
};

export const loginPage = (req, res) => {
    res.render('pages/login');
};

export const signupPage = (req, res) => {
    res.render('pages/signup');
};

export const login = (req, res) => {
    const {email, password} = req.body;
    console.log({email, password});
    res.send('login done');
};

export const signup = (req, res) => {
    const {userName, password, email} = req.body;
    console.log({userName, password, email});
    res.send('SignUp done');
};