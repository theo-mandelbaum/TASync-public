"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericTextBoxOrder = void 0;
exports.NumericTextBoxOrder = [
    { 'path': 'numerictextbox/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Numeric Textbox', 'description': 'The NumericTextBox is used to get the numbered inputs from the users and the currency and percentage text boxes to get the currency and percentage inputs.', 'api': '{"NumericTextBoxComponent":["value","format","min","max","step"] }' },
    { 'path': 'numerictextbox/range-validation', 'component': 'Range', 'name': 'Range Validation', 'order': '01', 'category': 'Numeric Textbox', 'description': 'The NumericTextBox has options to restrict the input value between a specific range using min, max, and strictMode properties.', 'api': '{"NumericTextBoxComponent":["value","min","max","step"] }' },
    { 'path': 'numerictextbox/custom-format', 'component': 'Format', 'name': 'Custom Format', 'order': '01', 'category': 'Numeric Textbox', 'description': 'The NumericTextBox provides an option to customize the display format of the numeric value using the format property.', 'api': '{"NumericTextBoxComponent":["value","format","min","max"] }' },
    { 'path': 'numerictextbox/restrict-decimals', 'component': 'Restrict', 'name': 'Restrict Decimals', 'order': '01', 'category': 'Numeric Textbox', 'description': 'The NumericTextBox provides an option to restrict the number of decimal values, by using the decimals property. So, it can only accept the integer value alone.', 'api': '{"NumericTextBoxComponent":["value","format","min","max","step","decimals","validateDecimalOnType"] }' }
];
