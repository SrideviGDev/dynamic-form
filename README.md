# DynamicForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.

## How to Run the Project

git clone <repository-url>
cd <repository-directory>

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## JSON Structure for Dynamic Form Generation

The form's HTML and behavior are dynamically generated based on a JSON configuration. This JSON defines the form fields, their types, labels, default values, validation rules, and any additional settings like CSS classes or dependencies on other fields.

**Explanation of JSON Fields** <br />
**type**: The type of input field (select, number, date, etc.). <br />
**label**: The label that will appear next to the input field. <br />
**name**: The name of the form control, which is used as a key in the FormGroup. <br />
**options**: For select inputs, an array of options that can be chosen. <br />
**value**: The default value for the field. <br />
**validation**: An array of validation rules applied to the field (required, min, max, etc.). <br />
**cssClass**: Custom CSS class(es) applied to the input element. <br />
**dependencies**: Logic that defines how the field’s options or value depend on the value of another field. <br />

## Dynamic HTML Generation

Based on the JSON structure, the HTML for the form is generated dynamically. This approach allows the form to adapt to any changes in the JSON without requiring updates to the HTML template. This is particularly useful for forms that need to be frequently updated or customized.

## Cross-Field Manipulations

Certain fields in the form may depend on the values of other fields. <br />
Here, the ageRange field’s options may change based on the selected ageGroup. This logic is handled dynamically by subscribing to changes in the dependent fields and updating the options or values of related fields.<br />

The duration field can be dynamically calculated based on the startDate and endDate fields. This requires updating the duration field whenever either date changes.
