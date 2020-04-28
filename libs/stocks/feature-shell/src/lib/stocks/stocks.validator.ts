import { Validators, FormControl, FormGroup } from '@angular/forms';

export class CustomDateValidator extends Validators {
   
    static fromToDateValidator(fDate: string, tDate: string) {
        return (group: FormGroup) => {
            let fromDate = group.controls[fDate];
            let toDate = group.controls[tDate];
            if (fromDate.dirty && toDate.dirty) {
                if (new Date(fromDate.value) > new Date(toDate.value)) {

                    toDate.setValue(fromDate.value);
                    return {
                        dateError: "To Date should be greater than From Date"
                    }
                } else if (new Date(fromDate.value).getTime() === new Date(toDate.value).getTime()) {
                    return {
                        dateError: "To Date should be greater than From Date"
                    }
                }
            }
            return null;
        }
    }
}



