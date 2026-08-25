public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Industry, Phone 
            FROM Account 
            WHERE Name != null 
            ORDER BY Name ASC 
            LIMIT 50
        ];
    }
}