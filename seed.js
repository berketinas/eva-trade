module.exports = async (Client, Share, Portfolio) => {
    await Client.sync({ force: true });
    await Share.sync({ force: true });
    await Portfolio.sync({ force: true });

    let client = await Client.create({ name: 'test client 1' });
    let share = await Share.create({ symbol: 'EVA', price: 25 });

    await client.addShare(share, { through: { amount: 100 } });

    client = await Client.create({ name: 'test client 2' });
    share = await Share.create({ symbol: 'XTR', price: 79 });

    await client.addShare(share, { through: { amount: 50 } });

    client = await Client.create({ name: 'test client 3' });
    share = await Share.create({ symbol: 'GAW', price: 15 });

    await client.addShare(share, { through: { amount: 20 } });

    client = await Client.create({ name: 'test client 4' });
    share = await Share.create({ symbol: 'YSL', price: 46 });

    await client.addShare(share, { through: { amount: 30 } });

    client = await Client.create({ name: 'test client 5' });
    share = await Share.create({ symbol: 'KDN', price: 64 });

    await client.addShare(share, { through: { amount: 70 } });

    client = await Client.create({ name: 'test client 6' });
    share = await Share.create({ symbol: 'OVO', price: 55 });

    await client.addShare(share, { through: { amount: 200 } });

    await Share.create({ symbol: 'LTR', price: 81 });
};
