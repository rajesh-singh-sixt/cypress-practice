describe('cypress test', () => {

  it('TC001 - Verify title', () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/")
    cy.url().should('include', 'orangehrmlive')
      .and('contain', 'orange')
      .and('not.contain', 'apple')
    cy.title().should('eq', 'OrangeHRM')
    cy.xpath("//a").should('have.length', '5')
  }
  )

  it('TC002 - Identify locators', () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("input[value='radio2']").should('be.visible')
    cy.get("input[value='radio2']").check().should('be.checked')
    cy.get("input[value='radio1']").should('not.be.checked')

    cy.get("input#autocomplete").type("test")

    cy.get("div[class='cen-right-align'] fieldset legend").contains("Dropdown")
    cy.get("#dropdown-class-example").select('Option3').should('have.value', 'option3')

    cy.get("div[id='checkbox-example'] fieldset legend").contains("Checkbox")
    cy.get("#checkBoxOption2").should('be.visible')
    cy.get("#checkBoxOption2").check().should('be.checked')
    cy.get("#checkBoxOption2").uncheck().should('not.be.checked')
    cy.xpath("//input[@type='checkbox']").check().should('be.checked')
    cy.xpath("//input[@type='checkbox']").uncheck().should('not.be.checked')
    cy.xpath("//input[@type='checkbox']").first().check().should('be.checked')
    cy.xpath("//input[@type='checkbox']").last().check().should('be.checked')
    cy.xpath("//button[@class='btn-style class1']").should('be.visible')
    cy.xpath("//button[@class='btn-style class1']").contains("Window")
    //cy.xpath("//button[@class='btn-style class1']").click()
  }
  )

  it('TC003 - Handle tables', () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("table.table-display>tbody>tr").should('have.length', '11')
    cy.get("table.table-display>tbody>tr>th").should('have.length', '3')
    cy.get("table.table-display>tbody>tr:nth-child(4)>td:nth-child(2)").should('contain', 'Selenium')
    cy.get("table.table-display>tbody>tr:nth-child(4)>td:nth-child(3)").contains('30')

    cy.get("table.table-display>tbody>tr")
      .each(($row, index, $rows) => {
        cy.wrap($row).within(() => {
          cy.get("td")
            .each(($col, index, $cols) => {
              cy.log($col.text())
            })
        })
      })
  })

  it.only('TC003 - Handle tables', () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#mousehover").trigger('mouseover').click()
    cy.get("a[href='#top']").should('be.visibile') 

  }
  )

})