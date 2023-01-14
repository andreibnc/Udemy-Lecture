/// <reference types="cypress" />

const exp = require("constants")

describe('Our first suite', () =>{
   
    it('first test', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()



        //by Tag Name 
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by  Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by Two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by Tag Name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended wat by Cypress
        cy.get('[data-cy="imputEmail1"]')

    }),

    it('Second test', () =>{
        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Form Layouts').click()
        cy.wait(1000) 

        

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

        
    })


    it('then and wrap methods', ()  => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Form Layouts').click()
        cy.wait(1000) 


        cy.contains('nb-card', 'Using the Grid').find('[data-cy="signInButton"]').should('contain', 'Sign in')


        //Using the Grid Form

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //Basic Form

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        
        //selenium style

        const firstForm = cy.contains('nb-card', 'Using the Grid')
        const secondForm = cy.contains('nb-card', 'Basic form')

        firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')


        //cypress style

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passLabelFirst).to.equal('Password')     
        })

        cy.contains('nb-card', 'Basic form').then( secondForm => {

            const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
            const passLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
            expect(emailLabelSecond).to.equal('Email address')
            expect(passLabelSecond).to.equal('Password')


            cy.contains('nb-card', 'Basic form').then( secondForm => {

                const passLabelSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passLabelSecond).to.equal(passLabelSecondText)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

                
            })

        // cy.contains('nb-card', 'Block form').then( blockform => {
        //     const text = blockform.find('[for="inputWebsite"]').text()
        //     expect("Website").to.equal(text)
            
        // })

        // cy.get('[class="label"][for="inputWebsite"]').should('contain', 'Website')

          
        })
    })


    it('Invoke Command', () => {


        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Form Layouts').click()
        cy.wait(1000) 

        //1

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2

        cy.get('[for="exampleInputEmail1"]').then( label  =>{
            expect(label.text()).to.equal('Email address')

        })

        //3

        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')

        })

        //4
        cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'custom-checkbox checked')
        .then(classValue  => {
            expect(classValue).to.contain('custom-checkbox checked')
        })

             

    })

    it('assert property', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Datepicker').click()
        cy.wait(1000) 

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then( input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-picker-row').contains('21').click()
                cy.wrap(input).invoke('prop','value').should('contain', 'Dec 21, 2022')



            })


    })

    it('radio buttons', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Form Layouts').click()
        cy.wait(1000) 


        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{

            cy.wrap(radioButtons)
            .first()
            .check({force: true})
            .should('be.checked')


            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')


        })

    })


    it('check boxes', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Modal & Overlays').click()
        cy.wait(1000) 
        cy.contains('Toastr').click()
        cy.wait(1000) 


        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})

    })   

    it('lists and dropdowns', () => {

        cy.visit('/')
        cy.wait(1000) 


        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.wait(1000) 
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Cosmic').click()
        cy.get('nav nb-select').should('contain', 'Cosmic')
        cy.wait(1000) 
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(50, 50, 89)')

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Corporate').click()
        cy.get('nav nb-select').should('contain', 'Corporate')
        cy.wait(1000) 
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(255, 255, 255)')

        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3){
                  cy.wrap(dropdown).click()
                }

            })

        })
        
    })   

    it('Web Tables', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Tables & Data').click()
        cy.wait(1000)
        cy.contains('Smart Table').click()
        cy.wait(1000)


        cy.get('tbody').contains('tr', 'Larry').then ( tableRow  => {

            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        })


        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="ID"]').type('10')
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Andrei')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Boncu')
            cy.wrap(tableRow).find('[placeholder="Username"]').type('Aboncu')
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('aboncu@yahoo.com')
            cy.wrap(tableRow).find('[placeholder="Age"]').type('37')
            cy.wrap(tableRow).find('.nb-checkmark').click()


        })

        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(1000)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', "No data found")
                } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })


        })
          
    })

    it('assert property', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Datepicker').click()
        cy.wait(1000) 

        let date = new Date()
        date.setDate(date.getDate() + 20)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})

        
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()

            cy.get('nb-calendar-pageable-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }else {
                    cy.get('nb-calendar-day-picker').contains(futureDay).click()
    
    
                }
            })
            //cy.get('nb-calendar-picker-row').contains('21').click()
            //cy.wrap(input).invoke('prop','value').should('contain', 'Dec 21, 2022')
        })


    })


    it('PopUps and Tooltips', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Modal & Overlays').click()
        cy.wait(1000) 
        cy.contains('Tooltip').click()
        cy.wait(1000) 

        cy.contains('nb-card', 'Colored Tooltips')
           .contains("Default").click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })


    it('Dialog box', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Tables & Data').click()
        cy.wait(1000) 
        cy.contains('Smart Table').click()
        cy.wait(1000) 

        //1
        cy.get('tbody tr').first().find('.nb-trash').click()        
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2

        const  stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

    })


    it.only('Cypress Assertions', () => {

        cy.visit('/')
        cy.wait(1000)
        cy.contains('Forms').click()
        cy.wait(1000) 
        cy.contains('Form Layouts').click()
        cy.wait(1000)

        cy.get('[class="label"]')
        .should('contain', 'Email address')
        .should('have.class', 'label')
        
        cy.get('[for="exampleInputEmail1"]')
        .should('contain', 'Email address')
        .should('have.class', 'label')
        .and('have.text', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then( label  =>{
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.contain('Email address')


        })

    })


    
})




    






    

       


       

