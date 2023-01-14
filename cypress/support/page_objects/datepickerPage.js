

export class datePickerPage{


    selectCommonDatepickerDateFromToday(){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click().type('Jan 28, 2023')
        })
    }

}



export const selectDate = new datePickerPage