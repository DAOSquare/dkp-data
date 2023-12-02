const path = require('path');
const fs = require('fs');
const https = require('https');
const directoryPath = path.join(__dirname, 'metadata');
const files = fs.readdirSync(directoryPath);

async function fetchImage() {
    for (let index = 0; index < files.length; index++) {
        const fileName = files[index];
        const data = fs.readFileSync(path.join(__dirname, 'metadata', fileName));
        const metadata = JSON.parse(data)
        const imageUrl = metadata.image;
        if (imageUrl) {
            const imageName = String(imageUrl).split("/").pop();
            const file = fs.createWriteStream(`./images/${imageName}`);

            https.get(imageUrl, response => {
                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    console.log(`Image downloaded as ${imageName}`);
                });
            }).on('error', err => {
                fs.unlink(imageName);
                console.error(`Error downloading image: ${err.message}`);
            });

        }

    }
}

fetchImage()