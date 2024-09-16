const fs = require('fs');
const csv = require('csv-parser');

/**
 * Reads a CSV file and processes data to extract and normalize breeds.
 * @param {string} filePath - Path to the CSV file.
 * @returns  Set of unique normalized breed names.
 */
 getUniqueBreeds=(filePath) =>{
    return new Promise((resolve, reject) => {
        const breeds = new Set();
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const breed = row.Breed.trim().toLowerCase();
                breeds.add(breed);
            })
            .on('end', () => {
                resolve(Array.from(breeds));
            })
            .on('error', reject);
    });
}

/**
 * Counts the number of licenses by LicenseType for each unique breed.
 * @param {string} filePath - Path to the CSV file.
 * @returns  breed names and values are objects mapping LicenseType to counts.
 */
 getLicenseCountsByBreed=(filePath) =>{
    return new Promise((resolve, reject) => {
        const licenseCounts = {};
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const breed = row.Breed.trim().toLowerCase();
                const licenseType = row.LicenseType.trim();
                
                if (!licenseCounts[breed]) {
                    licenseCounts[breed] = {};
                }
                if (!licenseCounts[breed][licenseType]) {
                    licenseCounts[breed][licenseType] = 0;
                }
                licenseCounts[breed][licenseType]++;
            })
            .on('end', () => {
                resolve(licenseCounts);
            })
            .on('error', reject);
    });
}

/**
 * Finds the top 5 most popular dog names and their counts.
 * @param {string} filePath - Path to the CSV file.
 * @returns  top 5 dog names with their counts.
 */
 getTopDogNames=(filePath) =>{
    return new Promise((resolve, reject) => {
        const nameCounts = {};
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const dogName = row.DogName.trim();
                
                if (!nameCounts[dogName]) {
                    nameCounts[dogName] = 0;
                }
                nameCounts[dogName]++;
            })
            .on('end', () => {
                const topNames = Object.entries(nameCounts)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .slice(0, 5)
                    .map(([name, count]) => ({ name, count }));
                    
                resolve(topNames);
            })
            .on('error', reject);
    });
}

/**
 * Retrieves license details for a given date range.
 * @param {string} filePath - Path to the CSV file.
 * @param {string} startDate - Start date in the format 'YYYY-MM-DD'.
 * @param {string} endDate - End date in the format 'YYYY-MM-DD'.
 * @returns  licenses issued within the given date range.
 */
 getLicensesByDateRange=(filePath, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        const licenses = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const validDate = new Date(row.ValidDate);
                
                if (validDate >= start && validDate <= end) {
                    licenses.push(row);
                }
            })
            .on('end', () => {
                resolve(licenses);
            })
            .on('error', reject);
    });
}

(async () => {
    try {
        const breeds = await getUniqueBreeds('cypress/fixtures/2017.csv');
        console.log('Unique Breeds:', breeds);

        const licenseCounts = await getLicenseCountsByBreed('cypress/fixtures/2017.csv');
        console.log('License Counts by Breed:', licenseCounts);

        const topNames = await getTopDogNames('cypress/fixtures/2017.csv');
        console.log('Top 5 Dog Names:', topNames);

        const licenses = await getLicensesByDateRange('cypress/fixtures/2017.csv', '2017-01-01', '2017-01-05');
        console.log('Licenses in 2017:', licenses);
    } catch (error) {
        console.error('Error:', error);
    }
})();
