const { pool } = require("./../src/db/connect");

test('compare 1=1 from database to give true', async () => {
    const result = (await pool.query('SELECT 1=1 as result')).rows[0].result;
    await pool.end();
    expect(result).toBe(true);
})