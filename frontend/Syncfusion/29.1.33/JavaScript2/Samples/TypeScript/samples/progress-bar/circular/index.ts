import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { ProgressBar, ProgressAnnotation, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { loadProgressBarTheme } from './theme-colors';
ProgressBar.Inject(ProgressAnnotation);

/**
 * Sample for circular progress bar sample.
 */
// tslint:disable-next-line:max-func-body-length

    
    let div: HTMLCollection = document.getElementsByClassName('progress-text-align');

    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        loadProgressBarTheme(args);
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
        || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark'|| args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark' || args.progressBar.theme === 'Fluent2HighContrast') {
            for (let i: number = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
    };

    let button: Button = new Button();
    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#reLoad');

    let circluar: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 100,
        startAngle: 180,
        endAngle: 180,
        width: '160px',
        height: '160px',
        enableRtl: false,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    circluar.appendTo('#circular-container');
    let rtl: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 70,
        width: '160px',
        height: '160px',
        secondaryProgress: 90,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    rtl.appendTo('#rtl-container');
    let track: ProgressBar = new ProgressBar({
        type: 'Circular',
        minimum: 0,
        maximum: 100,
        value: 100,
        width: '160px',
        height: '160px',
        segmentCount: 4,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    track.appendTo('#track-container');
    let rounded: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 20,
        width: '160px',
        height: '160px',
        cornerRadius: 'Round',
        isIndeterminate: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    rounded.appendTo('#rounded-container');
    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        circluar.refresh();
        rtl.refresh();
        track.refresh();
        rounded.refresh();
    };


