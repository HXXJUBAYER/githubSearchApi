const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const jubayer = {
    res: (res, success, extra = {}) => {
        res.json({
            success,
            author: 'Jubayer Ahmed',
            ...extra
        });
    }
};

app.get('/github', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return jubayer.res(res, false, {
            message: 'Missing ?id=username'
        });
    }

    try {
        const gitRes = await axios.get(`https://api.github.com/users/${id}`);
        jubayer.res(res, true, {
            username: gitRes.data.login,
            id: gitRes.data.id
        });
    } catch (e) {
        jubayer.res(res, false, {
            message: 'User not found'
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>🔍 GitHub ID Search API</h1>
        <p>Made by <strong>Jubayer Ahmed</strong></p>
    `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API by Jubayer Ahmed running on port ${port}`);
});

/*
 ░░░░░██╗██╗░░░██╗██████╗░░█████╗░██╗░░░██╗███████╗██████╗░
 ░░░░░██║██║░░░██║██╔══██╗██╔══██╗╚██╗░██╔╝██╔════╝██╔══██╗
 ░░░░░██║██║░░░██║██████╦╝███████║░╚████╔╝░█████╗░░██████╔╝
 ██╗░░██║██║░░░██║██╔══██╗██╔══██║░░╚██╔╝░░██╔══╝░░██╔══██╗
 ╚█████╔╝╚██████╔╝██████╦╝██║░░██║░░░██║░░░███████╗██║░░██║
 ░╚════╝░░╚═════╝░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝ 
 */
