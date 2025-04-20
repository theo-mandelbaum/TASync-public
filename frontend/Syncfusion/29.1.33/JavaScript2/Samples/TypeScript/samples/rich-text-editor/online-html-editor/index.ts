import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

/**
 * RichTextEditor Online Html Editor sample
 */
import { createElement, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, ToolbarType, Table, PasteCleanup,EmojiPicker, Audio ,Video, FormatPainter } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, PasteCleanup, EmojiPicker, Audio ,Video, FormatPainter);
import { Splitter } from '@syncfusion/ej2-layouts';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';


    
  let textArea: HTMLTextAreaElement;
  let srcArea: HTMLElement;
  let myCodeMirror: any;
  let defaultRTE: RichTextEditor;
  let splitObj: Splitter;
  // Add the styles and script referrence for code-mirror.
    splitObj = new Splitter({
      height: '450px', width: '100%',
      resizing: onResizing,
      paneSettings: [{ resizable: true, size: '50%',min: '40%' }, {min: '40%'}],
      created: updateOrientation,
    });
    splitObj.appendTo('#splitter-rte-online-html-editor');

    defaultRTE = new RichTextEditor({
      height: '100%',
      floatingToolbarOffset:0,
      toolbarSettings: {
        type : ToolbarType.Expand,
        enableFloating: false,
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
          'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList',
          'Outdent', 'Indent',
          'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
          '|', 'EmojiPicker', 'SourceCode', '|', 'Undo', 'Redo'
        ]
      },
      saveInterval: 1, actionComplete: updateValue, change: onChange,
      showCharCount : true, maxLength : 5000, created: onCreate,
    });
    defaultRTE.appendTo('#defaultRTE');
    function onChange(): void {
      updateValue();
    }
    function onResizing():void
    {
      defaultRTE.refreshUI();
    }
    function onCreate(): void {
      updateValue();
      textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
      srcArea = document.querySelector('.source-code');
      if (srcArea) {
        srcArea.addEventListener('keyup', (e: any) => {
          updateHtmlValue();
        });
      }
    }
    function updateHtmlValue(): void {
      defaultRTE.value = myCodeMirror.getValue();
      defaultRTE.dataBind();
    }
    function updateValue(): void {
      let mirrorView: HTMLElement = document.querySelector('#src-view');
      if (!mirrorView) {
        mirrorView = createElement('div', { className: 'e-content' });
        mirrorView.id = 'src-view';
        let srcCodeElement: HTMLElement = document.querySelector('.source-code');
        if (srcCodeElement) {
            srcCodeElement.appendChild(mirrorView);
        }
        mirrorView.innerHTML = '';
        mirrorView.style.display = 'block';
      }
      let srcViewEle: HTMLElement = document.querySelector('#src-view');
      let codemirrorEle: HTMLElement = document.querySelector('.CodeMirror-wrap');
      if (codemirrorEle) {
        codemirrorEle.remove();
      }
      if(defaultRTE.value){
      renderCodeMirror(srcViewEle as HTMLElement, defaultRTE.value);
      }
    }
    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
      myCodeMirror = CodeMirror(mirrorView, {
        value: content,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,
      });
    }
    function updateOrientation(): void {
      if (Browser.isDevice) {
        splitObj.orientation = 'Vertical';
        (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
      }
    }
  

