describe('Shopping Basket Tests', () => {
  let basketTotal=0.0
  let dataName = 'RadomData'

  beforeEach(() => {
      // Add items to the basket
      cy.visit('/'); // Navigate to the shop page
      cy.get('div.card-footer a').eq(0).click(); // Add first product
      cy.get('div.card-footer a').eq(1).click(); // Add second product
      cy.get('div.card-footer a').eq(2).click(); // Add third product
      cy.get('div.card-footer a').eq(3).click(); // Add fourth product
      
      // Adjust quantities if necessary
      cy.visit('/basket'); // Navigate to the basket page
  });

  it('should display all selected items in the basket', () => {
      cy.get('ul li.list-group-item div h6').should('have.length', 4); // Assuming 4 items are added
      cy.get('ul li.list-group-item div h6').eq(0).should('contain.text', 'Sherbert Straws');
      cy.get('ul li.list-group-item div h6').eq(1).should('contain.text', 'Strawberry Bon Bons');
      cy.get('ul li.list-group-item div h6').eq(2).should('contain.text', 'Chocolate Cups');
      cy.get('ul li.list-group-item div h6').eq(3).should('contain.text', 'Sherbet Discs');
  });

  it('should calculate the total price correctly', () => {
      cy.get('span.text-muted').eq(1).invoke('text').then(price1 => {
        cy.get('span.text-muted').eq(1).invoke('text').then(quantity1 => {
              const total1 = parseFloat(price1.replace('£', '')) * parseInt(quantity1);
              
              cy.get('span.text-muted').eq(2).invoke('text').then(price2 => {
                  cy.get('span.text-muted').eq(2).invoke('text').then(quantity2 => {
                      const total2 = parseFloat(price2.replace('£', '')) * parseInt(quantity2);

                      cy.get('span.text-muted').eq(3).invoke('text').then(price3 => {
                          cy.get('span.text-muted').eq(3).invoke('text').then(quantity3 => {
                              const total3 = parseFloat(price3.replace('£', '')) * parseInt(quantity3);

                              cy.get('span.text-muted').eq(4).invoke('text').then(price4 => {
                                cy.get('span.text-muted').eq(4).invoke('text').then(quantity4 => {
                                      const total4 = parseFloat(price4.replace('£', '')) * parseInt(quantity4);

                                      const expectedTotal = total1 + total2 + total3 + total4;
                                      cy.log(expectedTotal)

                                      cy.get('ul li.list-group-item').eq(4).find('strong').invoke('text').then(totalText => {
                                           basketTotal = parseFloat(totalText.replace('£', ''));
                                          cy.log('basketTotal- '+basketTotal)
                                          expect(basketTotal).to.equal(expectedTotal);
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });

  it('should update total price when changing delivery type to Standard Shipping', () => {
      cy.get('div.custom-control.custom-radio label[for="exampleRadios2"]').click({force:true})
      cy.get('label.custom-control-label').invoke('text').then(deliveryCostText => {
          const deliveryCost = parseFloat(deliveryCostText.replace('£', ''));

          cy.get('ul li.list-group-item').eq(4).invoke('text').then(totalText => {
              const basketTotal = parseFloat(totalText.replace('£', ''));
              
              // Check if the updated total price is correct with delivery cost included
              const updatedTotal = basketTotal + deliveryCost;
              cy.get('ul li.list-group-item').eq(4).find('strong').invoke('text').then(updatedTotalText => {
                  const finalTotal = parseFloat(updatedTotalText.replace('£', ''));
                  expect(finalTotal).to.equal(updatedTotal);
              });
          });
      });
  });

  it('should proceed to checkout when clicking checkout button', () => {
    cy.get('input.form-control').eq(1).type(dataName)
    cy.get('input.form-control').eq(2).type(dataName)
    cy.get('input.form-control').eq(3).type(dataName+'@'+dataName+'.com')
    cy.get('input.form-control').eq(4).type(dataName)
    cy.get('input.form-control').eq(4).type(555555)
    cy.get('input.form-control').eq(5).type(dataName)
    cy.get('input.form-control').eq(6).type(dataName)
    cy.get('input.form-control').eq(7).type(dataName)

    cy.get('input.form-control').eq(8).type(44562422265522)
    cy.get('input#cc-expiration').type(5524)
    cy.get('input.form-control').eq(10).type(444)

    cy.get('select#country').select('United Kingdom');
    cy.get('select#city').select('Cardiff');

      cy.contains("button[type='submit']","Continue to checkout").click(); // Click the checkout button
  });
});
