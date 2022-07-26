const { pool } = require("./../db/connect");

const proposalRepository = {
    store: async (offerId, companyId, budget, amount) => {
        return await pool.query('INSERT INTO "Proposals" ("offerId", "companyId", budget, amount) VALUES ($1, $2, $3, $4)', [offerId, companyId, parseFloat(budget), parseFloat(amount)]);
    },
    getAll: async () => {
        return (await pool.query('SELECT proposals.id, offers."productName", offers.amount, proposals.winner, offers.unity, proposals.budget, companies.name FROM "Offers" as offers JOIN "Proposals" as proposals ON proposals."offerId" = offers.id JOIN "Companies" as companies ON companies.id = offers."companyId" ORDER BY proposals.id')).rows;
    },
    getByOffer: async (id) => {
        return (await pool.query('SELECT proposals.id, offers."productName", offers.amount, proposals.winner, offers.unity, proposals.budget, companies.name FROM "Offers" as offers JOIN "Proposals" as proposals ON proposals."offerId" = offers.id JOIN "Companies" as companies ON companies.id = proposals."companyId" WHERE offers.id = $1 ORDER BY proposals.id', [id])).rows;
    },
    updateWinner: async (id) => {
        return (await pool.query('UPDATE "Proposals" SET winner = true WHERE id = $1', [id]));
    }
}

module.exports = proposalRepository;