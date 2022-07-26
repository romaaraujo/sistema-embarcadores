const userRepository = require("../repositories/userRepository");
const md5 = require("md5");

const index = async (req, res) => {
    return res.render('login', { error: req.query.error || '' });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepository.getByEmail(email);

    if (!user) {
        const error = encodeURIComponent("Usuário não encontrado");
        return res.redirect('/login?error=' + error);
    }
    else if (user.password === md5(password)) {
        req.session.userId = user.id;
        return res.redirect('/dashboard');
    } else {
        const error = encodeURIComponent("Usuário ou senha incorretos");
        return res.redirect('/login?error=' + error);
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userRepository.store({
        name: name,
        email: email,
        password: password
    });

    return res.json(user);
}

module.exports = {
    index,
    login,
    register
}