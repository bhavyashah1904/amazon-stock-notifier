import got from 'got';
import {parse} from 'node-html-parser';

const productLink = "https://www.amazon.com/HP-EliteBook-Business-i5-8265U-Windows/dp/B0CBC48R3M/ref=sr_1_3?crid=J89NFZ0QHXSW&keywords=hp%2Belitebook%2Blaptop&qid=1706349024&sprefix=hp%2Belitebook%2Blaptop%2Caps%2C331&sr=8-3&th=1"

async function Monitor(){
    var myheaders = {
        'connection' : 'keep alive',
        'sec-ch-ua' : `"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`,
        'sec-ch-ua-mobile': '?0',
        'upgrade-insecure-requests' : 1,
        'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-',
        'sec-fetch-site' : 'same-origin',
        'sec-fetch-mode' : 'navigate',
        'sec-fetch-dest' : 'document',
        'sec-fetch-user' : '?1',
        'accept-encoding' : 'gzip, deflate, br',
        'accept-language' : 'en-US,en;q=0.9,gu;q=0.8',
        'rtt' : 50,
        'ect' : '4g',
        'downlink' : 10
    }
    const response = await got(productLink, {
        headers : myheaders
    });
    
    if(response && response.statusCode == 200){
        let root = parse(response.body);
        let availabilityDiv = root.querySelector('#availability');
        if(availabilityDiv){
            let productName = productLink.substring(productLink.indexOf('com/') + 4, productLink.indexOf('/dp'));
            let stockText = availabilityDiv.childNodes[1].innerText.toLowerCase();
            if(stockText == 'out of stock'){
                console.log('Out Of Stock!');
            }else{
                console.log('In Stock');
            }
        }
    }

await new Promise(r => setTimeout(r,8000));
Monitor();
return false;
}

Monitor();