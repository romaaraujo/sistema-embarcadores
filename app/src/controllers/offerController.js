const offerRepository = require("../repositories/offerRepository");
const userRepository = require("../repositories/userRepository");

const create = async (req, res) => {
    const { productName, amount, unity } = req.body;
    const userId = req.session.userId;
    const user = await userRepository.getUserCompany(userId);
    const offer = await offerRepository.store(productName, amount, unity, user.companyId);
    return res.redirect('/dashboard');
}

module.exports = {
    create
}