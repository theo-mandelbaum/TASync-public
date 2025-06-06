import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Carousel } from '@syncfusion/ej2-navigations';


    

    const carouselObj: Carousel = new Carousel({
        cssClass: 'partial-carousel',
        items: [
            { template: '<figure class="img-container"><img src="//npmci.syncfusion.com/development/demos/src/carousel/images/bridge.jpg" alt="bridge" style="height:100%;width:100%;" /><figcaption class="img-caption">Golden Gate Bridge, San Francisco</figcaption></figure>' },
            { template: '<figure class="img-container"><img src="//npmci.syncfusion.com/development/demos/src/carousel/images/trees.jpg" alt="trees" style="height:100%;width:100%;" /><figcaption class="img-caption">Spring Flower Trees</figcaption></figure>' },
            { template: '<figure class="img-container"><img src="//npmci.syncfusion.com/development/demos/src/carousel/images/waterfall.jpg" alt="waterfall" style="height:100%;width:100%;" /><figcaption class="img-caption">Oddadalen Waterfalls, Norway</figcaption></figure>' },
            { template: '<figure class="img-container"><img src="//npmci.syncfusion.com/development/demos/src/carousel/images/sea.jpg" alt="sea" style="height:100%;width:100%;" /><figcaption class="img-caption">Anse Source d`Argent, Seychelles</figcaption></figure>' },
            { template: '<figure class="img-container"><img src="//npmci.syncfusion.com/development/demos/src/carousel/images/rocks.jpeg" alt="rocks" style="height:100%;width:100%;" /><figcaption class="img-caption">Stonehenge, England</figcaption></figure>' }
        ],
        autoPlay: true,
        partialVisible: true
    });
    carouselObj.appendTo('#carousel');
