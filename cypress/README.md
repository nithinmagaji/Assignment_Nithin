Task 1
Please feel free to use any language for this task. 
It is relatively common to work with large datasets within the QA team that are often too large to easily manipulate by hand using tools such as Excel. This data often needs to be crosschecked against remote systems to ensure that data processing is being handled correctly.
Another common aspect of our work involves interrogating web APIs for information. The problem laid out below combines both of these aspects of our day-to-day work. 
We have a large csv file (2017.csv) that lists dogs licensed in the US during 2017. The data is split into the following 7 sections:
LicenseType, Breed, Color, DogName, OwnerZip, ExpYear, ValidDate 
1.	Read the .csv file and extract the Breeds provided. Normalize the breed names by removing all whitespacing and making them all lowercase. Lastly create a list of unique breeds without duplicates.
2.	Create a list of number of licenses by LicenseType of each unique breed.
3.	Find out the top 5 popular name of dogs and create a list of these names along with count of dogs having these names.
Bonus
Create a method which takes date range as input and return the details of licences issues during that date. 
Notes
Please write proper comments explaining each method



Solution for this:
Solution is based in getUniqueBreeds.js file under e2e folder. To execute the file please run 

node cypress/e2e/getUniqueBreeds.js


QA API Automation Test
Task 2
Use Postman for this test.
The site https://dog.ceo/dog-api/ provides several endpoints to obtain data related to dog breeds. 
Make a request to the endpoint and create a list of individual dog breeds from the response received. 
Sample output
[ appenzeller, Australian kelpie, Australian shepherd, bakharwal Indian , basenji ,….]
Write Status code validation, Schema checks and 2 data validation tests for above endpoint.
Bonus
Identify and write any further tests that cover wider test scenarios you think should be covered.
Notes
Once your work is completed provide a link to your work with your GitHub repo with the code or collection uploaded based on the tool/framework chosen and add a concise description in comment for logic used.



Solution for this will be attached in the Mail
To execute this, import the json file in Postman and and click on send request
Please make sure to open console to see the output requested


QA UI Automation Test
Any JavaScript based UI tool can be used. Cypress is preferable.
Setup:
https://sweetshop.netlify.app/ will be used as the example project for testing.
Ensure the website is accessible.
Objectives:
Create a git repository. 
Add different quantities of at least 4 products in the basket and navigate to basket page. Write tests 
to verify that
1.	All the selected items are present in basket.
2.	Test the total price in GBP is correct i.e., matches the price of individual items based on quantity.
3.	Change the delivery type to Standard Shipping and verify the total price.
4.	Fill the details and click on checkout.
Bonus
Create a CircleCI configuration file to automate the build, test, and deployment process for a given automation project. Environments – QA, Preprod and Prod. 
Notes
Think carefully about how you organise your tests, both in directory structure and the naming conventions used within your test code.
Once your work is completed provide a link to your work with your GitHub repo with readme. Also please provide a document with detailed explanation of your steps and logic. 

Solution for this:
Solution is based in sweetShop.cy.js file under e2e folder. To execute the file please run 

npm run cy:open and click on the same file name from above to execute.
