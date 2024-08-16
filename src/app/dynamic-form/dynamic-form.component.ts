import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FieldConfig, formConfig } from './form-constants';
import * as moment from 'moment';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  dynamicForm!: FormGroup;
  fields: FieldConfig[] = formConfig;
  minEndDate = Date; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const formGroupConfig:any = {};

    this.fields.forEach((control: any) => {
      const validators = control.validation ? this.getValidators(control) : [];
      formGroupConfig[control.name] = [control.value || '', validators];
    })

    this.dynamicForm = this.fb.group(formGroupConfig);
    this.setupFormListeners()
  }

  getValidators(control: any) {
    if (typeof control.validation === 'string') {
      // Handle string-based validators
      switch (control.validation) {
        case 'min':
          return Validators.min(0);
        case 'max':
          return Validators.max(100);
        default:
          return null;
      }
    }
    return control.validation || null; 
  }

  setupFormListeners() {
    this.dynamicForm.get('ageGroup')?.valueChanges.subscribe(value => {
      this.updateAgeRange(value);
    });

    this.dynamicForm.get('startDate')?.valueChanges.subscribe(() => {
      this.updateDuration()
    });

    this.dynamicForm.get('endDate')?.valueChanges.subscribe(() => {
      this.updateDuration();
    });

    this.dynamicForm.get('duration')?.valueChanges.subscribe(() => {
      this.updateEndDateBasedOnDuration();
    });

  }

  updateAgeRange(value: string) {
    const ageRangeField = this.fields.find(field => field.name === 'ageRange');
    const dependencies = ageRangeField?.dependencies?.['ageGroup'];
    if(dependencies) {
      this.dynamicForm.get('ageRange')?.disable()
      const selectedRange = dependencies[value as keyof typeof dependencies]
      this.dynamicForm.get('ageRange')?.setValue(selectedRange)
    }
  }

  updateDuration() {
    const startDate = this.dynamicForm.get('startDate')?.value;
    this.minEndDate = startDate;
    const endDate = this.dynamicForm.get('endDate')?.value;

    if (startDate && endDate) {
      const duration = moment(endDate).diff(moment(startDate), 'days');
      this.dynamicForm.get('duration')?.setValue(duration, { emitEvent: false });
    }
  }

  updateEndDateBasedOnDuration() {
    const startDate = this.dynamicForm.get('startDate')?.value;
    const duration = this.dynamicForm.get('duration')?.value;

    if (startDate && duration >= 0) {
      const endDate = moment(startDate).add(duration, 'days').toDate();
      this.dynamicForm.get('endDate')?.setValue(endDate, { emitEvent: false });
    }
  }

}
