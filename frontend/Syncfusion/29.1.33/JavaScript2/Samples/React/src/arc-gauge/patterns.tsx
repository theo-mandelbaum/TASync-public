/**
 * Sample for pointers in the Circular Gauge
 */

 import * as React from "react";
 import {
   CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs,
   PointersDirective, PointerDirective, Annotations, AnnotationDirective, AnnotationsDirective, GaugeTheme, Gradient, RangesDirective,
   RangeDirective
 } from '@syncfusion/ej2-react-circulargauge';
 import { SampleBase } from '../common/sample-base';
 
 const SAMPLE_CSS = `
   .control-fluid {  padding: 0px !important;  }
   .annotationText { font-family:inherit; font-size:22px; text-align:center; margin-top: 20px; }
   .e-view.tailwind div.annotationText, .e-view.tailwind-dark div.annotationText { font-size:22px; text-align:center; margin-top: 0px; }
   .titleText { font-family:inherit; margin-top: 0px; margin-left: -2px; }
   .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { margin-top: 7px; margin-left: -7px; }
   .gaugeOneText { margin-left: 1px;margin-top: -6px; }
   .e-view.tailwind div.gaugeOneText, .e-view.tailwind-dark div.gaugeOneText { margin-left: -2px;margin-top: -3px;  }
   .e-view.material div.gaugeOneText, .e-view.material-dark div.gaugeOneText,
   .e-view.bootstrap-dark div.gaugeOneText,
   .e-view.bootstrap div.gaugeOneText, .e-view.bootstrap4 div.gaugeOneText,
   .e-view.fabric div.gaugeOneText, .e-view.fabric-dark div.gaugeOneText { margin-left: 0px;margin-top: -4px; }
   @media screen and (max-width: 420px) {
     .titleText { margin-top: 0px; margin-left: 0px; }
     .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { margin-top: 7px; margin-left: -3px; }
   }
   .gaugeAlign { width: 50%; }
     `;
 
 export class Patterns extends SampleBase<{}, {}> {
 
   public loadOne(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 188;
       args.gauge.axes[0].annotations[0].radius = "15%";
     }
     // custom code end
   }
 
   public loadTwo(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 12;
       args.gauge.axes[0].annotations[0].radius = "18%";
       args.gauge.axes[0].annotations[1].angle = 258;
       args.gauge.axes[0].annotations[1].radius = "102%";
       args.gauge.axes[0].annotations[2].angle = 102;
       args.gauge.axes[0].annotations[2].radius = "105%";
     }
     // custom code end
   }
 
   public loadThree(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 194;
       args.gauge.axes[0].annotations[0].radius = "8%";
     }
     // custom code end
   }
 
   public loadFour(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 100;
       args.gauge.axes[0].annotations[0].radius = "10%";
     }
     // custom code end
   }
 
   public loadFive(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 174;
       args.gauge.axes[0].annotations[0].radius = "12%";
     }
     // custom code end
   }
 
   public loadSix(args: ILoadedEventArgs): void {
     // custom code start
     let selectedTheme: string = location.hash.split('/')[1];
     selectedTheme = selectedTheme ? selectedTheme : 'Material';
     args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
       selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
     if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
       args.gauge.axes[0].annotations[0].angle = 180;
       args.gauge.axes[0].annotations[0].radius = "6%";
     }
     // custom code end
   }
 
   public rangeLinearGradient: Object = {
     startValue: '65%',
     endValue: '100%',
     colorStop: [
       { color: '#ffe852', offset: '20%', opacity: 0.9 },
       { color: '#ed5e4b', offset: '100%', opacity: 0.9 },
     ],
   };
 
   render() {
     return (
       <main><div className='control-section' style={{overflow: 'auto'}}>
         <style>
           {SAMPLE_CSS}
         </style>
         <table role='none'>
          <tbody>
           <tr>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadOne.bind(this)} background="transparent" id="container1" width="280px" height="300px">
                 <Inject services={[Annotations]} />
                 <AxesDirective>
                   <AxisDirective startAngle={230} endAngle={130} radius="100%" minimum={0} maximum={100} lineStyle={{ width: 30, color: '#f6f7f9', }}
                     majorTicks={{ height: 0, interval: 10, }} minorTicks={{ height: 0, }} labelStyle={{ font: { fontFamily: 'inherit', size: '12px' }, position: 'Outside', offset: 20, }}   >
                     <PointersDirective>
                       <PointerDirective type="RangeBar" description='RangeBar pointer value : 38' color="#7edfb4" value={38} radius="120%" pointerWidth={28} />
                       <PointerDirective type="Marker" description='Marker pointer value : 38' markerShape="Rectangle" markerWidth={28} markerHeight={3} radius="98%" color="black" value={38} />
                     </PointersDirective>
                     <RangesDirective>
                       <RangeDirective start={0} end={38} startWidth={10} endWidth={10} color="#7edfb4" radius="86%" />
                       <RangeDirective start={38} end={50} startWidth={10} endWidth={10} color="#7edfb4" radius="87%" />
                       <RangeDirective start={50} end={75} startWidth={10} endWidth={10} color="#f99d4c" radius="87%" />
                       <RangeDirective start={75} end={100} startWidth={10} endWidth={10} color="#e96920" radius="87%" />
                     </RangesDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='38' content='<div class="gaugeOneText" style="font-size:30px;font-family:inherit;">38</div>' angle={5} zIndex="1" radius="-20%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadTwo.bind(this)} centerY="60%" background="transparent" id="container2" width="280px" height="300px" >
                 <Inject services={[Annotations]} />
                 <AxesDirective>
                   <AxisDirective startAngle={270} endAngle={90} radius="80%" minimum={0} maximum={100} lineStyle={{ width: 30, color: '#f6f7f9', }}
                     majorTicks={{ height: 0, }} minorTicks={{ height: 0, width: 0, }} labelStyle={{ format:'{value} %', position: 'Outside', font: { size: '0px' }, }}   >
                     <PointersDirective>
                       <PointerDirective type="RangeBar" description= 'RangeBar pointer value: 75' pointerWidth={40} color="#d6f5e8" value={80} radius="128%" />
                       <PointerDirective type="RangeBar" description= 'RangeBar pointer value :75' pointerWidth={30} color="#7edfb4" value={80} radius="115%" />
                     </PointersDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='75%' content='<div style="font-size:25px;font-family:inherit;">75%</div>' angle={1} zIndex="1" radius="0%" />
                       <AnnotationDirective description='Annotation value : 0 %' content='<div style="font-size:22px;font-family:inherit;">0%</div>' angle={255} zIndex="1" radius="102%" />
                       <AnnotationDirective description='Annotation value : 100 %' content='<div style="font-size:22px;font-family:inherit;">100%</div>' angle={105} zIndex="1" radius="105%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadThree.bind(this)} centerY="55%" background="transparent" id="container3" width="280px" height="300px" >
                 <Inject services={[Annotations]} />
                 <AxesDirective>
                   <AxisDirective startAngle={220} endAngle={140} radius="80%" minimum={0} maximum={600} lineStyle={{ width: 0 }} majorTicks={{ height: 0, }} minorTicks={{ height: 0, }}
                     labelStyle={{ format:' {value}%', position: 'Outside', font: { size: '0px', color: '#1E7145' }, }} >
                     <PointersDirective>
                       <PointerDirective color="white" type="Marker" value={450} markerShape="Circle" radius="94%" markerWidth={17} markerHeight={17} animation={{ enable: false }} border={{ color: '#77e6b4', width: 7, }} />
                     </PointersDirective>
                     <RangesDirective>
                       <RangeDirective start={0} end={298} startWidth={12} endWidth={12} color="#ff5353" roundedCornerRadius={10} />
                       <RangeDirective start={300} end={397} startWidth={12} endWidth={12} color="#ffd223" roundedCornerRadius={10} />
                       <RangeDirective start={400} end={497} startWidth={12} endWidth={12} color="#77e6b4" roundedCornerRadius={10} />
                       <RangeDirective start={500} end={600} startWidth={12} endWidth={12} color="#21d683" roundedCornerRadius={10} />
                     </RangesDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='450' content='<div style="font-size:30px;font-family:inherit;">450 </div>' angle={0} zIndex="1" radius="-10%" />
                       <AnnotationDirective description='300' content='<div style="font-size:12px;font-family:inherit;"> 300 </div>' angle={0} zIndex="1" radius="112%" />
                       <AnnotationDirective description='400' content='<div style="font-size:12px;font-family:inherit;"> 400 </div>' angle={48} zIndex="1" radius="112%" />
                       <AnnotationDirective description='500' content='<div style="font-size:12px;font-family:inherit;"> 500 </div>' angle={93} zIndex="1" radius="112%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
           </tr>
           <tr>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadFour.bind(this)} background="transparent" id="container4" width="280px" height="300px" >
                 <Inject services={[Annotations, Gradient]} />
                 <AxesDirective>
                   <AxisDirective startAngle={220} endAngle={140} radius="80%" minimum={0} maximum={100} lineStyle={{ width: 0 }} majorTicks={{ height: 0, }} minorTicks={{ height: 0, }}
                     labelStyle={{ format:'Pointer {value} % ', position: 'Outside', font: { size: '0px' }, }} >
                     <PointersDirective>
                       <PointerDirective description='RangeBar pointer value : 21' type="RangeBar" radius="90%" value={21} animation={{ enable: false, }} roundedCornerRadius={10} color="#a8f789" pointerWidth={25} />
                       <PointerDirective description='Marker pointer value :22' type="Marker" markerShape="Circle" markerWidth={30} markerHeight={30} animation={{ enable: false, }} color="white" radius="80%" value={22} />
                       <PointerDirective description='Marker pointer value: 22' type="Marker" markerShape="Circle" markerWidth={18} markerHeight={18} animation={{ enable: false, }} color="#a8f789" radius="80%" value={22} />
                     </PointersDirective>
                     <RangesDirective>
                       <RangeDirective start={0} end={100} startWidth={25} endWidth={25} color="#E0E0E0" roundedCornerRadius={20} radius="90%" />
                       <RangeDirective start={70} end={100} startWidth={25} endWidth={25} color="#ed5e4b" radius="90%" roundedCornerRadius={20} />
                       <RangeDirective start={21} end={75} startWidth={25} endWidth={25} radius="90%" color="#ffe852" linearGradient={this.rangeLinearGradient} />
                     </RangesDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='21%' content='<div class="titleText" style="font-size:30px;">21%</div>' angle={120} zIndex="1" radius="10%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadFive.bind(this)} background="transparent" id="container5" width="280px" height="300px"  >
                 <Inject services={[Annotations]} />
                 <AxesDirective>
                   <AxisDirective startAngle={220} endAngle={140} radius="80%" minimum={0} maximum={100} lineStyle={{ width: 0, }} majorTicks={{ height: 0, interval: 15, }} minorTicks={{ height: 0, }} labelStyle={{ format:'$ {value} ', position: 'Outside', font: { size: '0px' }, }}   >
                     <PointersDirective>
                       <PointerDirective description='RangeBar pointer value : 54' roundedCornerRadius={20} value={54} type="RangeBar" radius="90%" color="#ffe852" animation={{ enable: false, }} border={{ color: 'grey', width: 0, }} pointerWidth={30} />
                     </PointersDirective>
                     <RangesDirective>
                       <RangeDirective start={0} end={100} startWidth={30} endWidth={30} radius="90%" color="#E0E0E0" roundedCornerRadius={20} />
                       <RangeDirective start={3} end={30} startWidth={10} endWidth={10} radius="105%" color="#a8f789" roundedCornerRadius={10} />
                       <RangeDirective start={31} end={70} radius="105%" startWidth={10} endWidth={10} color="#ffe852" roundedCornerRadius={10} />
                       <RangeDirective start={71} end={96} startWidth={10} radius="105%" endWidth={10} color="#ed5e4b" roundedCornerRadius={10} />
                     </RangesDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='54%' content='<div style="font-size:30px;font-family:inherit;">54%</div>' angle={170} zIndex="1" radius="12%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
             <td className='gaugeAlign'>
               <CircularGaugeComponent load={this.loadSix.bind(this)} background="transparent" id="container6" width="280px" height="300px" >
                 <Inject services={[Annotations]} />
                 <AxesDirective>
                   <AxisDirective startAngle={220} endAngle={140} radius="80%" minimum={0} maximum={100} lineStyle={{ width: 0 }} majorTicks={{ height: 0, }} minorTicks={{ height: 0, }} labelStyle={{ format:'{value} % Completed', position: 'Outside', font: { size: '0px', color: '#1E7145' }, }} >
                     <PointersDirective>
                       <PointerDirective description='Marker pointer value : 0' color="#7edfb4" type="Marker" value={0} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 1' color="#7edfb4" type="Marker" value={1} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 2' color="#7edfb4" type="Marker" value={2} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 3' color="#7edfb4" type="Marker" value={3} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 4' color="#7edfb4" type="Marker" value={4} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 5' color="#7edfb4" type="Marker" value={5} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 6' color="#7edfb4" type="Marker" value={6} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 7' color="#7edfb4" type="Marker" value={7} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 8' color="#7edfb4" type="Marker" value={8} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 9' color="#7edfb4" type="Marker" value={9} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 10' color="#7edfb4" type="Marker" value={10} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 11' color="#7edfb4" type="Marker" value={11} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 12' color="#7edfb4" type="Marker" value={12} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 13' color="#7edfb4" type="Marker" value={13} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 14' color="#7edfb4" type="Marker" value={14} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 15' color="#7edfb4" type="Marker" value={15} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 16' color="#7edfb4" type="Marker" value={16} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 17' color="#7edfb4" type="Marker" value={17} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 18' color="#7edfb4" type="Marker" value={18} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 19' color="#7edfb4" type="Marker" value={19} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 20' color="#7edfb4" type="Marker" value={20} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 21' color="#7edfb4" type="Marker" value={21} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 22' color="#7edfb4" type="Marker" value={22} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 23' color="#7edfb4" type="Marker" value={23} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 24' color="#7edfb4" type="Marker" value={24} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 25' color="#7edfb4" type="Marker" value={25} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 26' color="#7edfb4" type="Marker" value={26} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 27' color="#7edfb4" type="Marker" value={27} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 28' color="#7edfb4" type="Marker" value={28} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 29' color="#7edfb4" type="Marker" value={29} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 30' color="#7edfb4" type="Marker" value={30} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 31' color="#7edfb4" type="Marker" value={31} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 32' color="#7edfb4" type="Marker" value={32} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 33' color="#7edfb4" type="Marker" value={33} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 34' color="#7edfb4" type="Marker" value={34} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 35' color="#7edfb4" type="Marker" value={35} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 36' color="#7edfb4" type="Marker" value={36} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 37' color="#7edfb4" type="Marker" value={37} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 38' color="#7edfb4" type="Marker" value={38} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 39' color="#7edfb4" type="Marker" value={39} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 40' color="#7edfb4" type="Marker" value={40} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 41' color="#7edfb4" type="Marker" value={41} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 42' color="#7edfb4" type="Marker" value={42} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 43' color="#7edfb4" type="Marker" value={43} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 44' color="#7edfb4" type="Marker" value={44} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 45' color="#7edfb4" type="Marker" value={45} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 46' color="#7edfb4" type="Marker" value={46} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 47' color="#7edfb4" type="Marker" value={47} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 48' color="#7edfb4" type="Marker" value={48} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 49' color="#7edfb4" type="Marker" value={49} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 50' color="#7edfb4" type="Marker" value={50} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 51' color="#7edfb4" type="Marker" value={51} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 52' color="#7edfb4" type="Marker" value={52} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 53' color="#7edfb4" type="Marker" value={53} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 54' color="#7edfb4" type="Marker" value={54} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 55' color="#7edfb4" type="Marker" value={55} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 56' color="#7edfb4" type="Marker" value={56} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 57' color="#7edfb4" type="Marker" value={57} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 58' color="#7edfb4" type="Marker" value={58} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 59' color="#7edfb4" type="Marker" value={59} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 60' color="#7edfb4" type="Marker" value={60} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 61' color="#7edfb4" type="Marker" value={61} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 62' color="#7edfb4" type="Marker" value={62} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 63' color="#7edfb4" type="Marker" value={63} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 64' color="#7edfb4" type="Marker" value={64} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 65' color="#7edfb4" type="Marker" value={65} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 66' color="#7edfb4" type="Marker" value={66} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 67' color="#7edfb4" type="Marker" value={67} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 68' color="#7edfb4" type="Marker" value={68} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 69' color="#7edfb4" type="Marker" value={69} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 70' color="#7edfb4" type="Marker" value={70} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 71' color="#7edfb4" type="Marker" value={71} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 72' color="#7edfb4" type="Marker" value={72} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 73' color="#7edfb4" type="Marker" value={73} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 74' color="#7edfb4" type="Marker" value={74} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 75' color="#7edfb4" type="Marker" value={75} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 76' color="#7edfb4" type="Marker" value={76} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 77' color="#7edfb4" type="Marker" value={77} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 78' color="#7edfb4" type="Marker" value={78} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 79' color="#7edfb4" type="Marker" value={79} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                       <PointerDirective description='Marker pointer value : 80' color="#7edfb4" type="Marker" value={80} markerShape="Rectangle" markerWidth={38} markerHeight={3} animation={{ enable: false, }} />
                     </PointersDirective>
                     <RangesDirective>
                       <RangeDirective start={0} end={100} startWidth={37} endWidth={37} color="#f6f7f9" radius="115%" />
                     </RangesDirective>
                     <AnnotationsDirective>
                       <AnnotationDirective description='80% Completed' content='<div class="annotationText">80% <br/> <div> Completed </div> </div>' angle={10} zIndex="1" radius="7%" />
                     </AnnotationsDirective>
                   </AxisDirective>
                 </AxesDirective>
               </CircularGaugeComponent>
             </td>
            </tr>
           </tbody>
          </table>
        </div>
           <section id="action-description" aria-label="Description of Circular Gauge sample">
             <p>
               This sample includes a wide range of arc gauges with varying appearances based on the built-in features and customization options.
             </p>
           </section>
           <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
             <p>
               In this example, you can see how to render an arc gauge in various styles. You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel">axes</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/">ranges</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/">pointers</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a> oriented properties to customize the appearance of the arc gauge, in order to achieve the desired outcome.
             </p>
             <p>
               More information on the arc gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
             </p>
           </section>
       </main>
     )
   }
 }