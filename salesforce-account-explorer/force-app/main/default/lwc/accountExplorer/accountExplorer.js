import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountExplorer extends LightningElement {
    accounts = [];
    filteredAccounts = [];
    searchTerm = '';
    isLoading = true;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.accounts = data.map(acc => ({
                ...acc,
                IndustryDisplay: acc.Industry || 'No especificada',
                PhoneDisplay: acc.Phone || 'Sin teléfono registrado'
            }));
            this.applyFilter();
        } else if (error) {
            console.error('Error al consultar cuentas:', error);
            this.accounts = [];
            this.filteredAccounts = [];
        }
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.applyFilter();
    }

    applyFilter() {
        if (!this.searchTerm) {
            this.filteredAccounts = this.accounts;
        } else {
            this.filteredAccounts = this.accounts.filter(acc => 
                acc.Name.toLowerCase().includes(this.searchTerm) || 
                (acc.Industry && acc.Industry.toLowerCase().includes(this.searchTerm))
            );
        }
    }

    get hasAccounts() {
        return this.filteredAccounts && this.filteredAccounts.length > 0;
    }
}