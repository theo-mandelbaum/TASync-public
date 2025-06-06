import { Route } from 'react-router-dom';
import * as React from 'react';
import { Ean8 } from './ean8';
import { Code128 } from './code128';
import { Code128A } from './code128A';
import { Code128B } from './code128B';
import { Code128C } from './code128C';
import { Code93 } from './code93';
import { Code32 } from './code32';
import { Default } from './default-functionality';
import { Ean13 } from './ean13';
import { UpcA } from './upca';
import { UpcE } from './upce';
import { Code39 } from './code39';
import { Code39Extd } from './code39Extd';
import { QrCode } from './qrcode';
import { DataMatrix } from './datamatrix';
export const barcodeRoutes = (<>
         <Route path='/:theme/barcode/ean8' Component={Ean8}/>
         <Route path='/:theme/barcode/code128' Component={Code128}/>
         <Route path='/:theme/barcode/code128A' Component={Code128A}/>
         <Route path='/:theme/barcode/code128B' Component={Code128B}/>
         <Route path='/:theme/barcode/code128C' Component={Code128C}/>
         <Route path='/:theme/barcode/code93' Component={Code93}/>
         <Route path='/:theme/barcode/code32' Component={Code32}/>
         <Route path='/:theme/barcode/default-functionality' Component={Default}/>
         <Route path='/:theme/barcode/ean13' Component={Ean13}/>
         <Route path='/:theme/barcode/upca' Component={UpcA}/>
         <Route path='/:theme/barcode/upce' Component={UpcE}/>
         <Route path='/:theme/barcode/code39' Component={Code39}/>
         <Route path='/:theme/barcode/code39Extd' Component={Code39Extd}/>
         <Route path='/:theme/barcode/qrcode' Component={QrCode}/>
         <Route path='/:theme/barcode/datamatrix' Component={DataMatrix}/>

    </>);
export const barcodeCategory = { "ean8": { "name": "EAN-8", "category": "Getting Started" }, "code128": { "name": "Code 128", "category": "Getting Started" }, "code128A": { "name": "Code 128A", "category": "Getting Started" }, "code128B": { "name": "Code 128B", "category": "Getting Started" }, "code128C": { "name": "Code 128C", "category": "Getting Started" }, "code93": { "name": "Code 93", "category": "Getting Started" }, "code32": { "name": "Code 32", "category": "Getting Started" }, "default-functionality": { "name": "Codabar", "category": "Getting Started" }, "ean13": { "name": "EAN-13", "category": "Getting Started" }, "upca": { "name": "UPC-A", "category": "Getting Started" }, "upce": { "name": "UPC-E", "category": "Getting Started" }, "code39": { "name": "Code39", "category": "Getting Started" }, "code39Extd": { "name": "Code 39 Extended", "category": "Getting Started" }, "qrcode": { "name": "QR Code", "category": "Getting Started" }, "datamatrix": { "name": "Data Matrix", "category": "Getting Started" }, "defaultSample": "barcode/ean8" };
