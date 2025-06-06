/**
 * Liveupdate sample for sparkline
 */
import * as React from "react";
import { SparklineComponent } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .spark {
        float: left;
        width: 95%;
        margin-left: 3%;
    }
    .index {
        z-index: 1000;
    }`;
export class LiveUpdate extends SampleBase {
    sparkInstance;
    sparkInstance1;
    sparkInstance2;
    sparkInstance3;
    temp1;
    temp3;
    temp2;
    temp4;
    timer1;
    timer2;
    timer3;
    timer4;
    load(args) {
        let theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Fluent2';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    updateSparkline1(args) {
        setTimeout(() => {
            if (this.sparkInstance == null)
                this.sparkInstance = args.sparkline;
            if (this.temp1 == null)
                this.temp1 = this.sparkInstance.dataSource.length - 1;
            if (this.timer1 != null)
                clearInterval(this.timer1);
            this.timer1 = setInterval(() => this.update(), 500);
        }, 500);
    }
    updateSparkline2(args) {
        setTimeout(() => {
            if (this.sparkInstance1 == null)
                this.sparkInstance1 = args.sparkline;
            if (this.temp3 == null)
                this.temp3 = this.sparkInstance1.dataSource.length - 1;
            if (this.timer2 != null)
                clearInterval(this.timer2);
            this.timer2 = setInterval(() => this.update2(), 500);
        }, 500);
    }
    updateSparkline3(args) {
        setTimeout(() => {
            if (this.sparkInstance2 == null)
                this.sparkInstance2 = args.sparkline;
            if (this.temp2 == null)
                this.temp2 = this.sparkInstance2.dataSource.length - 1;
            if (this.timer3 != null)
                clearInterval(this.timer3);
            this.timer3 = setInterval(() => this.update1(), 500);
        }, 500);
    }
    updateSparkline4(args) {
        setTimeout(() => {
            if (this.sparkInstance3 == null)
                this.sparkInstance3 = args.sparkline;
            if (this.temp4 == null)
                this.temp4 = this.sparkInstance3.dataSource.length - 1;
            if (this.timer4 != null)
                clearInterval(this.timer4);
            this.timer4 = setInterval(() => this.update4(), 500);
        }, 500);
    }
    update() {
        if (this.sparkInstance.element.className.indexOf('e-sparkline') > -1) {
            let value = ((Math.random() * 100) + 5) % 50;
            this.sparkInstance.dataSource.push({ x: ++this.temp1, yval: value });
            this.sparkInstance.dataSource.shift();
            this.sparkInstance.refresh();
            let cpu = document.getElementById('cpu');
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
        }
    }
    update2() {
        if (this.sparkInstance1.element.className.indexOf('e-sparkline') > -1) {
            let value = ((Math.random() * 100) + 5) % 80;
            this.sparkInstance1.dataSource.push({ x: ++this.temp3, yval: value });
            this.sparkInstance1.dataSource.shift();
            this.sparkInstance1.refresh();
            let disk = document.getElementById('disk');
            disk.innerHTML = value.toFixed(0) + '%';
        }
    }
    update1() {
        if (this.sparkInstance2.element.className.indexOf('e-sparkline') > -1) {
            let value = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            }
            else {
                value = 6 - (value / 10);
            }
            this.sparkInstance2.dataSource.push({ x: ++this.temp2, yval: value });
            this.sparkInstance2.dataSource.shift();
            this.sparkInstance2.refresh();
            let memory = document.getElementById('memory');
            let gb = parseFloat(value.toString().replace('0', '')).toFixed(1);
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
        }
    }
    update4() {
        if (this.sparkInstance3.element.className.indexOf('e-sparkline') > -1) {
            let value = ((Math.random() * 100) + 5) % 80;
            this.sparkInstance3.dataSource.push({ x: ++this.temp3, yval: value });
            this.sparkInstance3.dataSource.shift();
            this.sparkInstance3.refresh();
            let net = document.getElementById('net');
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
        }
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div id='spark-container' className="row">
                        <div className="cols-sample-area" style={{ "marginTop": "8%" }}>
                            <div className="col-lg-3 col-m-3 col-sm-6">
                                <div className="spark" id="spark-container1">
                                    <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                        <b>CPU</b>
                                    </div>
                                    <div id="cpu" className="index" style={{ "color": "#0877d6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>26% 1.2GHz</div>
                                    <SparklineComponent loaded={this.updateSparkline1.bind(this)} load={this.load.bind(this)} ref={m => this.sparkInstance = m} id='spark1-container' height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric' fill='#e8f2fc' axisSettings={{
                minY: 0,
                maxY: 150
            }} containerArea={{
                background: 'white',
                border: {
                    color: '#dcdfe0',
                    width: 2
                }
            }} border={{
                color: '#0358a0',
                width: 1
            }} dataSource={[
                { x: 0, yval: 50 },
                { x: 1, yval: 30 },
                { x: 2, yval: 20 },
                { x: 3, yval: 30 },
                { x: 4, yval: 50 },
                { x: 5, yval: 40 },
                { x: 6, yval: 20 },
                { x: 7, yval: 10 },
                { x: 8, yval: 30 },
                { x: 9, yval: 10 },
                { x: 10, yval: 40 },
                { x: 11, yval: 50 },
                { x: 12, yval: 10 },
                { x: 13, yval: 30 },
                { x: 14, yval: 50 },
                { x: 15, yval: 20 },
                { x: 16, yval: 10 },
                { x: 17, yval: 40 },
                { x: 18, yval: 30 },
                { x: 19, yval: 40 }
            ]} xName='x' yName='yval'>
                                    </SparklineComponent>
                                </div>
                            </div>
                            <div className="col-lg-3 col-m-3 col-sm-6">
                                <div className="spark" id="spark-container2">
                                    <div className='index' style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                        <b>Disk</b>
                                    </div>
                                    <div id="disk" className="index" style={{ "color": "#b247c6", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>50%</div>
                                    <SparklineComponent loaded={this.updateSparkline2.bind(this)} load={this.load.bind(this)} ref={m => this.sparkInstance2 = m} id='spark2-container' height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric' fill='#f5e8fc' axisSettings={{
                minY: 4,
                maxY: 8
            }} containerArea={{
                background: 'white',
                border: {
                    color: '#dcdfe0',
                    width: 2
                }
            }} border={{
                color: '#b247c6',
                width: 1
            }} dataSource={[
                { x: 0, yval: 6.05 },
                { x: 1, yval: 6.03 },
                { x: 2, yval: 6.02 },
                { x: 3, yval: 6.07 },
                { x: 4, yval: 6.05 },
                { x: 5, yval: 6.09 },
                { x: 6, yval: 6.08 },
                { x: 7, yval: 6.01 },
                { x: 8, yval: 6.03 },
                { x: 9, yval: 6.01 },
                { x: 10, yval: 6.07 },
                { x: 11, yval: 6.05 },
                { x: 12, yval: 6.01 },
                { x: 13, yval: 6.06 },
                { x: 14, yval: 6.05 },
                { x: 15, yval: 6.03 },
                { x: 16, yval: 6.01 },
                { x: 17, yval: 6.09 },
                { x: 18, yval: 6.06 },
                { x: 19, yval: 6.05 }
            ]} xName='x' yName='yval'>
                                    </SparklineComponent>
                                </div>
                            </div>
                            <div className="col-lg-3 col-m-3 col-sm-6">
                                <div className="spark" id="spark-container3">
                                    <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                        <b>Memory</b>
                                    </div>
                                    <div id="memory" className="index" style={{ "color": "#5bcc8f", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>6.5/15.8 GB (41%)</div>
                                    <SparklineComponent loaded={this.updateSparkline3.bind(this)} load={this.load.bind(this)} ref={m => this.sparkInstance1 = m} id='spark3-container' height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric' fill='#e0f9d1' axisSettings={{
                minY: 0,
                maxY: 130
            }} containerArea={{
                background: 'white',
                border: {
                    color: '#dcdfe0',
                    width: 2
                }
            }} border={{
                color: '#27ad66',
                width: 1
            }} dataSource={[
                { x: 0, yval: 50 },
                { x: 1, yval: 30 },
                { x: 2, yval: 20 },
                { x: 3, yval: 70 },
                { x: 4, yval: 50 },
                { x: 5, yval: 20 },
                { x: 6, yval: 80 },
                { x: 7, yval: 10 },
                { x: 8, yval: 30 },
                { x: 9, yval: 10 },
                { x: 10, yval: 70 },
                { x: 11, yval: 50 },
                { x: 12, yval: 10 },
                { x: 13, yval: 60 },
                { x: 14, yval: 50 },
                { x: 15, yval: 30 },
                { x: 16, yval: 10 },
                { x: 17, yval: 20 },
                { x: 18, yval: 60 },
                { x: 19, yval: 50 }
            ]} xName='x' yName='yval'>
                                    </SparklineComponent>
                                </div>
                            </div>
                            <div className="col-lg-3 col-m-3 col-sm-6">
                                <div className="spark" id="spark-container4">
                                    <div className="index" style={{ "fontSize": "12px", "position": "absolute", "marginTop": "10px", "marginLeft": "8%" }}>
                                        <b>Ethernet</b>
                                    </div>
                                    <div id="net" className="index" style={{ "color": "#d1a990", "position": "absolute", "marginTop": "25px", "marginLeft": "8%" }}>6.5/15.8 GB (41%)</div>
                                    <SparklineComponent loaded={this.updateSparkline4.bind(this)} load={this.load.bind(this)} ref={m => this.sparkInstance3 = m} id='spark4-container' height='130px' width='90%' lineWidth={1} type='Area' valueType='Numeric' fill='#F2D8C7' axisSettings={{
                minY: 0,
                maxY: 120
            }} containerArea={{
                background: 'white',
                border: {
                    color: '#dcdfe0',
                    width: 2
                }
            }} border={{
                color: '#AA907A',
                width: 1
            }} dataSource={[
                { x: 0, yval: 50 },
                { x: 1, yval: 30 },
                { x: 2, yval: 20 },
                { x: 3, yval: 70 },
                { x: 4, yval: 50 },
                { x: 5, yval: 20 },
                { x: 6, yval: 80 },
                { x: 7, yval: 10 },
                { x: 8, yval: 30 },
                { x: 9, yval: 10 },
                { x: 10, yval: 70 },
                { x: 11, yval: 50 },
                { x: 12, yval: 10 },
                { x: 13, yval: 60 },
                { x: 14, yval: 50 },
                { x: 15, yval: 30 },
                { x: 16, yval: 10 },
                { x: 17, yval: 20 },
                { x: 18, yval: 60 },
                { x: 19, yval: 50 }
            ]} xName='x' yName='yval'>
                                    </SparklineComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample depicts the various customization options available in sparklines.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices.
                     </p>
                </div>
            </div>);
    }
}
