import { selectDate } from "../support/page_objects/datepickerPage"
import { fillInForm } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"



describe('Test With Page Objects', () =>{

     beforeEach('open application', () => {
         cy.openHomePage()
     })

     it('verify navigations accross the pages', () => {
         navigateTo.formLayoutsPage()
         navigateTo.datePickerPage()
         navigateTo.smartTablePage()
         navigateTo.tooltipPage()
         navigateTo.toasterPage()
         
         


     })

     it('should submit Inline and Basic form and select tomorrow date in calendar', () => {
         navigateTo.formLayoutsPage()
         fillInForm.submitItems('Andrei', 'test@mail.com')
         fillInForm.submitBascicForm('test@test.com', 'password')
         navigateTo.datePickerPage()
         selectDate.selectCommonDatepickerDateFromToday()
         navigateTo.smartTablePage()
         onSmartTablePage.addNewRecordWithFirstAndLastName('Andrei', 'Boncu')
         onSmartTablePage.updateAgeByFirstName('Andrei', '37')
         onSmartTablePage.deleteRowByIndex(1)     
     })

    


})