const offerRepository = require("../repositories/offerRepository");
const proposalRepository = require("../repositories/proposalRepository");
const userRepository = require("../repositories/userRepository");

const dashboard = async (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
        const error = encodeURIComponent("A sessão foi finalizada");
        return res.redirect('/login?error=' + error);
    } 
    const user = await userRepository.get(userId);

    if(!user) {
        const error = encodeURIComponent("Usuário não localizado na base");
        return res.redirect('/login?error=' + error);
    }
    
    const offers = await offerRepository.getAll();
    const proposals = await proposalRepository.getAll();
    return res.render('dashboard', { session: req.session.userId, user: user, offers: offers, proposals: proposals });
}

module.exports = {
    dashboard
}