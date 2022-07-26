const { pool } = require("./../db/connect");

const offerRepository = {
    store: async (productName, amount, unity, shipperId) => {
        return await pool.query('INSERT INTO "Offers" ("productName", amount, unity, "companyId") VALUES ($1, $2, $3, $4)', [productName, parseFloat(amount), unity, shipperId]);
    },
    getAll: async () => {
        return (await pool.query('SELECT offers.id, offers."productName", offers.amount, offers.unity, company.name as companyName FROM "Offers" as offers JOIN "Companies" as company ON company.id = offers."companyId"')).rows;
    }
}

module.exports = offerRepository;

