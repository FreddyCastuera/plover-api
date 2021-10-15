const puppeteer = require('puppeteer');

//async function profesionalExist() {
//}

async function searchProLicense (name, lastName, profesionalLicense) {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  // .: Open Page
  await page.goto('https://cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action', {
    waitUntil: 'load',
    // .: Remove time
    timeout: 0
  });
  const lastNameArr = lastName.split(" ")
  console.log(lastNameArr)
  // : Screenshot of the page
  //await page.screenshot({ path: 'example.png' });

  // .: Select input
  await page.type('#nombre', `${name}`)
  await page.type('#paterno', lastNameArr[0])
  await page.type('#materno', lastNameArr[1])
  console.log(profesionalLicense)
  // .: Submit button click
  await page.click('.dijitButton',)
  await page.waitForSelector('.dojoxGridScrollbox')

    const profesional = await page.evaluate( () => {
    const links = []
    const dentists = document.querySelectorAll('tr .dojoxGridCell')     

    for (let dentist of dentists) {
        if(dentist.textContent) links.push(dentist.textContent)
    }

    //const proLicense = links.includes(`${profesionalLicense}`)
    //console.log(proLicense)
    return links
  });
  const proLicense = profesional.includes(`${profesionalLicense}`)
  console.log(proLicense)
  console.log('array',profesional)
  await browser.close();
  return proLicense
}


module.exports = {
  searchProLicense
}