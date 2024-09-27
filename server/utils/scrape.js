const puppeteer = require('puppeteer');

function monthsPassed(d1, d2) {
    return d2.getMonth() - d1.getMonth() + (12 * (d2.getFullYear() - d1.getFullYear()));
}

const scraper = async(rollno)=>{
    const currentDate = new Date();
    if (!rollno || rollno.length !== 8) {
        return {status:'fail', message: "Invalid Roll Number" };
    }

    let joiningYear = 2000 + Number(rollno.substr(0, 2));
    const joiningDate = new Date(`${joiningYear}-07-15`);
    let semesterscompleted = Math.floor(monthsPassed(joiningDate, currentDate) / 6);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const MAX_RETRIES = 10;
        let retries = 0;
        let pageLoaded = false;
        while (retries < MAX_RETRIES && !pageLoaded) {
            try {
                await page.goto(`http://results.nith.ac.in/scheme${rollno.substr(0, 2)}/studentresult/index.asp`, {
                    waitUntil: 'networkidle2',
                    timeout: 15000 
                });
                pageLoaded = true;
            } catch (err) {
                retries++;
                if (retries >= MAX_RETRIES) {
                    await browser.close();
                    return { status:'fail',message: "Failed to load page after multiple attempts" };
                }
            }
        }

        await page.type('input[name="RollNumber"]', rollno, { delay: 100 });
        await page.click('input[type="submit"]');
        
        await page.waitForSelector('table', { timeout: 10000 }).catch(() => {
            throw new Error("Table not found in time");
        });

        const data = await page.evaluate((semesterscompleted) => {
            const rows = Array.from(document.querySelectorAll('table tr')).map(row => {
                return Array.from(row.cells).map(cell => cell.innerText);
            });

            let backlogscount = 0;
            let studentname;
            const filteredrows = rows.filter(row => {
                if (row.length === 6 && row[4] === "F") backlogscount++;
                if (row.length === 3 && row[1].startsWith('STUDENT NAME\n\n')) studentname = row[1].substr(14);
                return row[0].startsWith('SR\n\n');
            });

            const newcgpiDetails = [];
            for (let i = 0; i < filteredrows.length; i++) {
                newcgpiDetails.push({
                    semester: parseInt(filteredrows[i][0].substr(6)),
                    sgpi: parseFloat(filteredrows[i][1].split('=')[1]),
                    cgpi: parseFloat(filteredrows[i][3].split('=')[1]),
                });
            }

            return {
                status:'success',
                studentName: studentname,
                backlogscount,
                hasActiveBacklogs: backlogscount > 0,
                cgpiDetails: newcgpiDetails.length === semesterscompleted ? newcgpiDetails : []
            };
        }, semesterscompleted);

        await browser.close();

        if (data.cgpiDetails.length < semesterscompleted) {
            return {
                status:'fail',
                message: "Partial data returned. Some semesters' results are missing.",
                data
            };
        } else {
            return data;
        }

    } catch (error) {
        console.error('Error occurred:', error.message);
        await browser.close();
        return {status:'fail', message: 'Error occurred while scraping', error: error.message };
    }
}

module.exports = scraper;