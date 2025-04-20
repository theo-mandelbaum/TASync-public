ej.base.enableRipple(window.ripple)

    // Render the PDF viewer control
    var viewer = new ej.pdfviewer.PdfViewer ({
    documentPath: "https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf",
    resourceUrl:'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib'
});
    ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.Navigation, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Annotation, ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner,ej.pdfviewer.PageOrganizer);
    
    var switchObj = new ejs.buttons.Switch({ checked: true });
    switchObj.appendTo('#checked');

    switchObj.change = function (args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    };
    viewer.appendTo('#pdfViewer');
    var isInitialLoading = true;
    viewer.documentLoad = function () {
        if (isInitialLoading) {
            viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
            isInitialLoading = false;
        }
    };
