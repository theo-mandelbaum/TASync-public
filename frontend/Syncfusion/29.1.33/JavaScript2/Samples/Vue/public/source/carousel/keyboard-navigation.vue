<template>
  <div class="control-section keyboard-carousel-section">
    <div class="col-lg-12">
      <div class="carousel-sample">
        <ejs-carousel id='Carousel' cssClass="kb-carousel" :showPlayButton="true" :autoPlay="false">
          <e-carousel-items>
            <e-carousel-item :template="itemTemplate1"></e-carousel-item>
            <e-carousel-item :template="itemTemplate2"></e-carousel-item>
            <e-carousel-item :template="itemTemplate3"></e-carousel-item>
            <e-carousel-item :template="itemTemplate4"></e-carousel-item>
          </e-carousel-items>
        </ejs-carousel>
      </div>
      <div id='source_link'>Source: &nbsp;
      <table>
        <tr>
          <td>
            <a href="https://en.wikipedia.org/" target='_blank'>https://en.wikipedia.org/</a>
          </td>
        </tr>
      </table>
    </div>
    </div>
  </div>
  <div id="action-description">
    <p>
      This sample demonstrates the keyboard interactions with the <a aria-label="Vue carousel" href="https://www.syncfusion.com/vue-ui-components/vue-carousel" target="_blank">Vue Carousel</a> component.
    </p>
  </div>
  <div id="description">
    <p>
      The <code>Vue Carousel</code> component can be interacted with keyboard navigation. Below key combinations
      can be used in Carousel to initiate various actions.
    </p>
    <ul>
      <li><b>Alt + J</b> keys to focus the carousel component (done at application end).</li>
      <li><b>Arrows</b> keys to navigate between slides.</li>
      <li><b>Home</b> to navigate to the first slide.</li>
      <li><b>End</b> to navigate to the last slide.</li>
      <li><b>Space</b> to play/pause the slide transitions.</li>
      <li><b>Enter</b> to perform the respective action on its focus.</li>
    </ul>
    <p>
      More information about accessibility's of Vue Carousel component can be found in this
      <a aria-label="Carousel getting started" target="_blank" href="https://ej2.syncfusion.com/vue/documentation/carousel/getting-started/">
        documentation</a> section.
    </p>
  </div>
</template>

<style>
  .keyboard-carousel-section .carousel-sample {
    background-color: #f5f9fd;
    border-radius: 1.5em;
    margin: 0 auto 2em;
    max-width: 80%;
    height: 500px;
  }

  .kb-carousel .e-carousel-items .e-carousel-item .product-container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 1em;
  }

  .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading {
    font-size: 1.5em;
    color: #1a1a1a;
    letter-spacing: 0;
    font-weight: 500;
    margin: 1rem 0 1.6rem;
  }

  .kb-carousel .e-carousel-items .e-carousel-item .product-container .description {
    font-size: 1.5rem;
    color: #1a1a1a;
    letter-spacing: 0.2px;
    line-height: 2.7rem;
    padding: 0 0 5rem;
    text-align: justify;
  }

  .kb-carousel .e-carousel-items .e-carousel-item .product-container .description a {
    text-decoration: underline;
  }

  .kb-carousel .e-carousel-navigators .e-previous .e-btn:not(:disabled) .e-btn-icon,
  .kb-carousel .e-carousel-navigators .e-next .e-btn:not(:disabled) .e-btn-icon,
  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn:not(:disabled) .e-btn-icon {
    color: #4d8fe4;
    font-size: 1.5rem;
    line-height: normal;
  }

  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn {
    height: 5rem;
    width: 5rem;
  }

  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn:not(:disabled) .e-btn-icon {
    font-size: 2.4rem;
  }

  .kb-carousel .e-carousel-navigators .e-previous .e-btn:not(:disabled):hover,
  .kb-carousel .e-carousel-navigators .e-next .e-btn:not(:disabled):hover,
  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn:not(:disabled):hover,
  .kb-carousel .e-carousel-navigators .e-previous .e-btn:not(:disabled):focus,
  .kb-carousel .e-carousel-navigators .e-next .e-btn:not(:disabled):focus,
  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn:not(:disabled):focus,
  .kb-carousel .e-carousel-navigators .e-previous .e-btn:not(:disabled):active,
  .kb-carousel .e-carousel-navigators .e-next .e-btn:not(:disabled):active,
  .kb-carousel .e-carousel-navigators .e-play-pause .e-btn:not(:disabled):active {
    background-color: #d2e3f8;
  }

  .kb-carousel .e-carousel-indicators.e-default .e-indicator-bar .e-indicator div {
    background-color: #e5e5e5;
    border: 0px !important;
  }

  .kb-carousel .e-carousel-indicators.e-default .e-indicator-bar.e-active .e-indicator div {
    background-color: #4d8fe4 !important;
  }

  @media screen and (max-width: 480px) {
    .keyboard-carousel-section .carousel-sample {
      max-height: 400px;
      max-width: 100%;
    }

    .kb-carousel .e-carousel-items .e-carousel-item .product-container .description {
      font-size: 1.25rem;
    }

    .kb-carousel .e-carousel-items .e-carousel-item .product-container .image-container {
      display: none;
    }
  }

  #source_link {
    float: right;
    margin-right: 10px;
  }

  .bootstrap5-dark .keyboard-carousel-section .carousel-sample,
  .bootstrap5\.3-dark .keyboard-carousel-section .carousel-sample,
  .fluent-dark .keyboard-carousel-section .carousel-sample,
  .tailwind-dark .keyboard-carousel-section .carousel-sample,
  .tailwind3-dark .keyboard-carousel-section .carousel-sample,
  .material-dark .keyboard-carousel-section .carousel-sample,
  .fabric-dark .keyboard-carousel-section .carousel-sample,
  .bootstrap-dark .keyboard-carousel-section .carousel-sample,
  .highcontrast .keyboard-carousel-section .carousel-sample,
  .material3-dark .keyboard-carousel-section .carousel-sample,
  .fluent2-dark .keyboard-carousel-section .carousel-sample,
  .fluent2-highcontrast .keyboard-carousel-section .carousel-sample {
    background-color: #26292E;
  }

  .bootstrap5-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .fluent-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .tailwind-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .tailwind3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .material-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .fabric-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .bootstrap-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .highcontrast .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .material3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .fluent2-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading,
  .fluent2-highcontrast .kb-carousel .e-carousel-items .e-carousel-item .product-container .heading {
    color: #bbbbbb;
  }

  .bootstrap5-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .fluent-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .tailwind-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .tailwind3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .material-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .fabric-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .bootstrap-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .highcontrast .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .material3-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .fluent2-dark .kb-carousel .e-carousel-items .e-carousel-item .product-container .description,
  .fluent2-highcontrast .kb-carousel .e-carousel-items .e-carousel-item .product-container .description {
    color: #9f9f9f
  }

  .bootstrap5-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .bootstrap5-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .fluent-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .fluent-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .tailwind-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .tailwind3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .tailwind-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .tailwind3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .material-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .material-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .fabric-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .fabric-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .bootstrap-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .bootstrap-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .material3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .material3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .fluent2-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .fluent2-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus,
  .fluent2-highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):hover,
  .fluent2-highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled):focus {
    background-color: #4e4e4e;
  }

  .bootstrap5-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .fluent-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .tailwind-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .tailwind3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .material-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .fabric-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .bootstrap-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .material3-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .fluent2-dark .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon,
  .fluent2-highcontrast .kb-carousel .e-carousel-navigators .e-btn:not(:disabled) .e-btn-icon {
    color: #dfdfdf;
  }

  .bootstrap5-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .bootstrap5\.3-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .fluent-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .tailwind-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .tailwind3-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .material-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .fabric-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .bootstrap-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .highcontrast .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .material3-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .fluent2-dark .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div,
  .fluent2-highcontrast .kb-carousel .e-carousel-indicators .e-indicator-bar .e-indicator div {
    background-color: #626262;
  }

  .kb-carousel .e-carousel-indicators {
    margin: 16px;
  }

  .kb-carousel .e-carousel-navigators .e-play-pause span.e-play-icon {
    margin-left: 4px;
    margin-top: 2px;
  }
</style>

<script>
import { createApp } from 'vue';
import { CarouselComponent, CarouselItemDirective, CarouselItemsDirective } from "@syncfusion/ej2-vue-navigations";

var app = createApp();
var itemTemplate1Vue = app.component("itemTemplate1", {
    template: `<div class="product-container">
      <div class="col-sm-5 component-container">
        <div class="heading">San Francisco</div>
        <div class="description">
          San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California.
        </div>
        <a class="demo" href="https://en.wikipedia.org/wiki/San_Francisco"
          target="_blank">READ MORE</a>
      </div>
      <div class="col-sm-5 image-container">
        <picture>
          <img style="width:100%; height:100%" src="src/carousel/images/san-francisco.jpg" alt="San Francisco" />
        </picture>
      </div>
    </div>`,
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    methods: {}
});

var itemTemplate2Vue = app.component("itemTemplate2", {
    template: `<div class="product-container">
      <div class="col-sm-5 component-container">
        <div class="heading">London</div>
        <div class="description">
          London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.
        </div>
        <a class="demo"
          href="https://en.wikipedia.org/wiki/London"
          target="_blank">READ MORE</a>
      </div>
      <div class="col-sm-5 image-container">
        <picture>
          <img style="width:100%; height:100%" src="src/carousel/images/london.jpg" alt="London" />
        </picture>
      </div>
    </div>`,
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    methods: {}
});

var itemTemplate3Vue = app.component("itemTemplate3", {
    template: `<div class="product-container">
      <div class="col-sm-5 component-container">
        <div class="heading">Tokyo</div>
        <div class="description">
          Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.
        </div>
        <a class="demo" href="https://en.wikipedia.org/wiki/Tokyo"
          target="_blank">READ MORE</a>
      </div>
      <div class="col-sm-5 image-container">
        <picture>
          <img style="width:100%; height:100%" src="src/carousel/images/tokyo.jpg" alt="Tokyo" />
        </picture>
      </div>
    </div>`,
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    methods: {}
});

var itemTemplate4Vue = app.component("itemTemplate4", {
    template: `<div class="product-container">
      <div class="col-sm-5 component-container">
        <div class="heading">Moscow</div>
        <div class="description">
          Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia's symbolic center.
        </div>
        <a class="demo" href="https://en.wikipedia.org/wiki/Moscow"
          target="_blank">READ MORE</a>
      </div>
      <div class="col-sm-5 image-container">
        <picture>
          <img style="width:100%; height:100%" src="src/carousel/images/moscow.jpg" alt="Moscow" />
        </picture>
      </div>
    </div>`,
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    methods: {}
});

export default {
  components: {
    'ejs-carousel': CarouselComponent,
    'e-carousel-items': CarouselItemsDirective,
    'e-carousel-item': CarouselItemDirective
    },
    mounted: function () {
      document.body.addEventListener('keydown', (e) => {
        let carouselElement = document.querySelector('.e-carousel .e-carousel-slide-container');
        if (e.altKey && e.keyCode === 74 && carouselElement) {
          carouselElement.focus();
        }
      });
    },
    data: function () {
      return {
        itemTemplate1: function (e) {
          return {
            template: itemTemplate1Vue
          };
        },
        itemTemplate2: function (e) {
          return {
            template: itemTemplate2Vue
          };
        },
        itemTemplate3: function (e) {
          return {
            template: itemTemplate3Vue
          };
        },
        itemTemplate4: function (e) {
          return {
            template: itemTemplate4Vue
          };
        }
      }
    },
    methods: {}
};
</script>
