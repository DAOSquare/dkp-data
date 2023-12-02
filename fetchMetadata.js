const { writeFileSync } = require('fs');
const disableCards = require('./config/disableCards.json');
async function fetchMetadata() {
    [].includes
    for (let index = 1; index < 51; index++) {
        if (!disableCards.includes(index)) {
            const res = await fetch(`https://daodkp.oss-ap-southeast-1.aliyuncs.com/dkp/metadata/${index}.json`);
            const data = await res.json()
            writeFileSync(`./metadata/${index}.json`, JSON.stringify(data, null, 2), 'utf8');
        }
    }
}

fetchMetadata()