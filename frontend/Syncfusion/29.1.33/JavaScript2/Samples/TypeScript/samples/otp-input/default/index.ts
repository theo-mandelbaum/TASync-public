import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { OtpInput } from "@syncfusion/ej2-inputs";


    

    let numberOtp: OtpInput = new OtpInput({
        value: "1234",
        type: 'number'
    });
    numberOtp.appendTo('#numberOtp');

    let textOtp: OtpInput = new OtpInput({
        value: "e3c7",
        type: 'text'
    });
    textOtp.appendTo("#textOtp");

    let passwordOtp: OtpInput = new OtpInput({
        value: "1234",
        type: 'password'
    });
    passwordOtp.appendTo("#passwordOtp");

