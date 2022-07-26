const offerRepository = require("../repositories/offerRepository");
const proposalRepository = require("../repositories/proposalRepository");
const userRepository = require("../repositories/userRepository");

const create = async (req, res) => {
    const { product, amount, budget } = req.body;
    const userId = req.session.userId;
    const user = await userRepository.getUserCompany(userId);
    const offer = await proposalRepository.store(product, user.companyId, budget, amount);
    return res.redirect('/dashboard');
}

const view = async (req, res) => {
    const id = req.params.id;
    
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
    const selectProposals = await proposalRepository.getByOffer(id);

    return res.render('dashboard', { session: req.session.userId, user: user, offers: offers, proposals: proposals, selectProposals: selectProposals });
}

const winner = async (req, res) => {
    const id = req.params.id;
    
    const winner = await proposalRepository.updateWinner(id);
    return res.redirect(req.get('referer'));
}

module.exports = {
    create,
    view,
    winner
}