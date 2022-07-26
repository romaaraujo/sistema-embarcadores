const { pool } = require("./../db/connect");

const userRepository = {

    get: async (id) => {
        return (await pool.query('SELECT users.id, users.name, users.email, users.password, company.name as "companyName", company.type "companyType" FROM "Users" as users JOIN "UserCompany" as user_company ON user_company."userId" = users.id JOIN "Companies" as company ON company.id = user_company."companyId" WHERE users.id = $1 LIMIT 1', [id])).rows[0];
    },
    getUserCompany: async (id) => {
        return (await pool.query('SELECT company.name, company.id as "companyId" FROM "Users" as users JOIN "UserCompany" as user_company ON user_company."userId" = users.id JOIN "Companies" as company ON company.id = user_company."companyId" WHERE users.id = $1 LIMIT 1', [id])).rows[0];
    },
    getByEmail: async (email) => {
        return (await pool.query('SELECT id, name, email, password FROM "Users" WHERE email = $1 LIMIT 1', [email])).rows[0];
    },
    store: async ({ name, email, password }) => {
        return await User.create({ name: name, email: email, password: password });
    },
    getAll: async () => {
        return await User.findAll();
    },
}

module.exports = userRepository;

