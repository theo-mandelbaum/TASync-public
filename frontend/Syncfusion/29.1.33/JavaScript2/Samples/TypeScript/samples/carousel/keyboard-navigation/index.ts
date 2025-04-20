import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Carousel } from '@syncfusion/ej2-navigations';


    

    const carouselObj: Carousel = new Carousel({
        autoPlay: false,
        cssClass: 'kb-carousel',
        items: [
            { template: '#itemTemplate1' },
            { template: '#itemTemplate2' },
            { template: '#itemTemplate3' },
            { template: '#itemTemplate4' }
        ],
        showPlayButton: true
    });
    carouselObj.appendTo('#carousel');
    //Focus the Carousel Control (alt+j) key combination
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.altKey && e.keyCode === 74 && carouselObj.element.firstElementChild) {
            (carouselObj.element.firstElementChild as HTMLElement).focus();
        }
    });

