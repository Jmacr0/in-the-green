const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (_req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});