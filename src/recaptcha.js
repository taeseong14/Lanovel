const https = require("https");

class Recaptcha {

    static request(data) {
        return new Promise(resolve => {
            const req = https.request({
                host: "www.google.com",
                port: "443",
                path: "/recaptcha/api/siteverify",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(data)
                }
            }, res => {
                let response = '';

                res.on('data', chunk => {
                    response += chunk;
                });

                res.on('end', () => {
                    resolve(response);
                });
            });

            req.write(data);
            req.end();
        }); 
    }

    static async verify(secretKey, token, ip) {
        return JSON.parse(await Recaptcha.request(`secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}${ip ? `&remoteip=${encodeURIComponent(ip)}` : ''}`));
    }

}

module.exports = Recaptcha;