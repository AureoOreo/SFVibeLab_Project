@IsTest
private class AccountControllerTest {

    @TestSetup
    static void setupTestData() {
        List<Account> testAccounts = new List<Account>{
            new Account(Name = 'Alpha Tech', Industry = 'Technology', Phone = '555-0100'),
            new Account(Name = 'Beta Health', Industry = 'Healthcare', Phone = '555-0200'),
            new Account(Name = 'Gamma Retail', Industry = 'Retail', Phone = '555-0300')
        };
        insert testAccounts;
    }

    @IsTest
    static void testGetAccounts() {
        Test.startTest();
        List<Account> results = AccountController.getAccounts();
        Test.stopTest();

        Assert.areNotEqual(0, results.size(), 'La lista de cuentas no debe estar vacia');
        Assert.isNotNull(results[0].Name, 'El nombre de la cuenta no debe ser nulo');
    }
}