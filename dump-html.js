const https = require('https');
const fs = require('fs');

https.get('https://globalsecuritysolutions.co.za', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        fs.writeFileSync('page_dump.html', data);
        console.log('Downloaded page_dump.html');
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
