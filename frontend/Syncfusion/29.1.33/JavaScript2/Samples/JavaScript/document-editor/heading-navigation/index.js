﻿ej.base.enableRipple(window.ripple)


    //Documenteditor control rendering starts
    var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
    var container = new ej.documenteditor.DocumentEditorContainer({ serviceUrl:hostUrl, enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true } });
    ej.documenteditor.DocumentEditorContainer.Inject(ej.documenteditor.Toolbar);
    container.appendTo('#container');
    var defaultDocument = 
    {"sfdt":"UEsDBAoAAAAIAHyJbVZIMwnJCxAAAOtcAAAEAAAAc2ZkdO1cfY7bNha/CqH9YxvA47E0Y8/HAluk00wbNJkEnWyDoikKSqIsdmhRFalx3CLAYm+xJ9gj7H32AnuFfY+kbMkjezSNHbvZNE0oSxT5+N7vfZL2b57MNZ/wX9l1EmvvXBcl63mKRd75D7950OaFd/6bl0+985Ef9Lw89c5PzuBCTOAC2sK12rWha+Mk984H0EpmL9LYOz8a9bzEtSE3t0OYybti05d0zDwYf5wpuPG4oCGP4HMWSQE3/J7HfpmaVoQ6Mm/aJz/8+A4GMdTmCZIaxoXCVsO0v8EzoW1bjG0bus+pbW6xgVbpDOZ9xbVAMgRP3P0osf24maL6pEWOVF6/7F89eUUuZMHIdRlFPIu0mHnvgKaNkHMliwkVK+nZ9jReon4FnqPQUEp/Oj4+CS6OLy+hJzxBAfqjJms6vmHZ94qGghGZAP8yzTKtNse4Vy8uiL9YEMzoIOKdH49O+kPApUWl/tk7HyJB3nmAs6+Qd6IthhNmVQTJbGKB4JRv3kjyxvMPjt54cJ3C31+JV++L4wTLN9YP/PX3L598++zp1TcwmoDRf3olo2FwdHR6ejwcvvHWD2+HuEhprllBfPI004WMy0hzmREtSR3B3t0X32jvYcSSl4+/evLtk0vSoNLwoguh/p1O/t0bf1yMrBPl6GGiDMjrlGpCwfAsTBDN4oZEP9+aSEf7K9Jgb0R60k2k21fAk0/Sul9ap92k9UEs5ukni3m/wM4eZjGPyFdMa56NybWmhWYxmXKdku0L86yzMIP/W+0bDboJ82mmNBUCpbhwexDKvOZZLKdqWzIcDT7J8H4Z+u8nQ0qe04h8JgvyjGfl20dbE6a/v8LcG+s6Cjq6Q/JMyhsCoahOGbksdbk9SzoK9lNw92Tpa+gIbywjcJSfvpJf0OjGu/PcX3q+KbK/ZjRGJfQ7UN4gtJLIydnx0Fu5nHoC6G0kJ21wYz0RfisRH1zgLWUiroymTFlIYnbLhMwnLNMkKeiETWVxA09BmSI5YdBRjhl0Lmykgq9lbNrM93qkhbchUzyG98HKzt9KGEXdVD24qyShscw19CCKjzOe8IhmWsxMT5rnhaRRirJYIrNPXsFwCS+Ubps3cjJVGGApEs7IWCLCdFrIcmxXkHKlZTHDss9zHhVSyUT/WZmJ4LXoBmdVqZyazhOp+S1FYCjLFwFhG3RomVvDwAsu9skzCpT0CNcwyK3hJVwAz/KCAtIiKsiEaugCDBH8hpk5kdaZLImZXhJgvl1KI1Zsw3KVfAPTo4KHds3AKFlmsSMf1mtuzSncL0UedVLkkbfRisQqhR51UujRzhT6C5bg4nQxM5KWBMQMSNK4WhRywagCWwadAH+KsLeAeZZFDKDGEOxWgeB1fDdmCc/AICDzmozz1mefyOotoCh4DxSddELRide1CLIKICedAHKyM4C8qmt6Tap+3weTC4ZqAg5PULBPaAHVQS6oBrRM4LOQZXxQ7cnE5BZwhX7RmY9VFuiymgxGAGsDeENRupdw6otn35IKnnySC4bm3JimxtDXiGFaxBCChwUFgPr9UZ+8yEyZvtXqgpGmPJu7FzsarFC4AZy/oyEXXBvAcxv/Q8gPDsfYxOpdXRmQjLEYFo8KhB1aJgYnJcCKmwWgyca3wpILhHAPFBDiCeQAql8ipc4LDk62YkAOPOeOIKCXLxISfDqnXCsmEmP5YYErFl+jA50jipbewFLA79hZBDPLqPVThlBtXUrMk4QVGAE4SRtPFckDYzQwLVrBAAUCh7mi1BgPGEqWNgaH0CGHedzywJUDCRMYdZYbr1f5oRIkYER+uUWP9D625LSTLTn1HlCiW2VOTjuZk9O9CSCpETL4EnQ104Jro56uV68OLxT1WFqxhwxFcsfguJFAF1tYKXOWHShZFui8UH3qSBNgo/QivAkhepui7WggECIxDK/m9PfIndVgPNoWxS6WQSuDOQ9OK2VjNHMGZskgGGNAIKwF9Y5EGbOFvXHWpWXKuSWaL5PeGEOaQcAccxwceBmWRcwy5UgwKh+zhbqHs3nQbaLHMjecY29ZVBryWiZm2S0vZIZGGeRHFZDnVP8FSIC8hugY0iRWJDSy9sRw8LMXr59ePSLKGe0+9JnTucTntmjd5BiGvxOagb3DCZj1HE2TPDWxRhXMQ3zOWBXTV1gIpbxxkbRhuWbjgup2LscM1gQcjHDOn5lN/NQMYqSJ4RSt0pC5QJeyoxIzFmblDnCAmSYTJA1AwoRa4aoqdjz/7sLMgjx9/PLpnsXhZ52s3pm3rs7d8vABpe9VRvKsk5E825mRvDI5I6ADXC/oZCQYmAsTVTeDZhB9I4R2di01WjsDrMPtCCJ4YBOmjxCuQyzGEPbCVbpa+Osyxiq0gZEslN19a4ww2UZj24B2ZaYn++V+h4MuQBwNvPer0a8AW9vsfuvsOwJbbY2LlSHs8gI0bUYgAQTP9xpl+x1XJTiNa13GXJJg4J+A000ppIPKWFUTvQoAXDyr8AMKyjVY84RkUrdWeMbSuFvEFhrB5hyOOLAFCEGMR4kq3UwpvWWLcN+IBu2qkDQGsy7AGLN4z5Dod0Ki721op2EVJP1OkPR3mnOGjJY2p1kqOFqziNGQibZCVoPaXYb0XOYFb9ki2aN5QNTC5QJiR6cIkCkV8UEOPma28NlYcoQ4A/66wCu05RNj+Z7LTPZ3xrMnWOaMIdEqeFhWybBhASiKMtmjnGI4E/NbHqOKTelSyojhNjDXBmsMC7IuKgH9hkxPcghIYhykLYG02mtSOcxQIw7eQZ1vjh3PMId8SQsKIVKeztkCTWyUSHCRSbjqaO7QuhXsl5IrSDmUsS6RzBI+Rutilg02iY4xL82gKZBTYHSKBov7+7i8W3nTvgIs0IH0jH3E9VYevhlQIFC0lELtDsrfg3FH/UZHYqgs7I6KIipnEVb4cS13pFGlGTKBHpzWFzZlIcq5Tx6jqCF/oRi8tLqjKfvP3/8JXDGF+1oFfVHqsSZmI+zR1Fjee46u8uosMw95tcnYOKna2qGq50M+98wV0Y4OKpte2LfNvxs7cfxAMf81hIyflHkM8enOsGaJmAsXsjmlxO6oERk5UOSwVMWhkBEVhzLXh46qQ8FD/BsVs1zLvt8fwJ94BnfqL2Cn/aYfLu8j/kcY0B3Xb5DvpXikHs2hPUgvpuaTSm2DZwqqFXbrapjQrWvYfdQ47t617Nw17dzztmNPFHNs5YffinBHM/IpHkQAQS9u4fcTcjNMMXUXt9TOFeF3H4zACiuw1DymYXFjLlJ3PiIu7HckPolzm+Ich+bz2AgHpTIugPgfjBhRRqG4T6sGbmwU+72CWNP5rijWdA4fMvIHEscaCm47961pGETY9sgTtc3ENPido2H/2H4JyVyE9oHRQmhp6Y7aeLgj751npRDwtq6uQDUjdxTnj/8tnRVu5UUWseoEiGJLobspA4SMZYs8sGcCNwwhWwPeRpB4/eU3JkWc0OjFdWvtfjYfxW7DQTooJ3f3sh50Rg3Mos7V+eHhdDrtT6rDI/1ITg4zpg8jCFrfeOuOh1VFiVnOCkAWnrWq9jlWhr/rD5K5zeudxQ4vMpeuoqggwLZCjCUWjqyQm6Uhc97AHOfBIqSyyWsl91Itl4ZQziDmFgE3h8WAuUemKYd02uxPCT5O9ZThvz3IHDTEMrg3srzfTTQ8IyzmGmax+z2AnPm5oFWnINw256TMzAYTVj4EhVSwOn9U7UHjpgR0xJ1VzNBjpikXhGHS77ZBTdJmKxGW+ooXtmK77qCCYeB+7R4Mg06lssD7Hec4V5XFgk5lsWCnZbGCCUYVa9bFsMBjLCDFrfeZ2YnnUSlw0x3BPN8Xi5mgM1ftSGk2ZhZMvLA7V33yOuWCrcLpYusKAAmm1GhBc/vFHAtxNKLBJVcA2UmIZ6oG/qg3B6qxpDgIB3vcfiShflZvZyx/nQJXp2BBC6nZQhN7eA+WyW3NERzSLWfT+RZjwew+Kr0FJTXfDHVgvJBZBqz+7NFfCKwu0yv295aYpiT8P2GVoquoAFmrVGJJr7D1udjscFalO1veUGSCRgsrpIujGcZ3tZU9TF1VkagssJ+YLYjfJfeprfROcVE5cG5+jiYxat1Qg893RuclHoLrkTIzm8YGDbJUjbLxlLn9ClmtBE8+ZBo8HnatqTXLzI5KbA06uDUJCpa0uy6DqWdPjUJXnJmrV4YnZ5tOs0+uGcwKAZKrlS1UGjsb/TTlbNDK0HpQZV5oDYz4uN0cBf1Bb3Eya75lMT+QBc93h6kvIErAowGEKtxJiq3OLvy0YqA4Nc+o2uBW8TpDn+8PyIxRPH2rpDUR7qBY2waD0chqF/bncpKj0qL4zPkKgju9mT29xZU5O6BZlGZSyPGs7yojqV3mj1V5EFK+hArFzHrdlf3uOnivJMEiIMWDYBx4VNrcxDrT0GYiqf0NAvst94H7D/qG4WI8HjbGNt9+N6PjVW18Gi26JbTxKEkyDI0bdxo3sArxPnCoEqzCtUkz4QptnkahOXW5YH9wcuaPRqPh4OQkGJwdn+B97ertVRiwWPgNElJdT7P59TRaFF0TYV+L9dT+NoT7hQeWJZbZQK0Ha1euTSZ2vtw2caonwlKf2GwVTyA5oc0gfa8uDbIb8HfjvB8HlzUoe7uYAtG8HN1tYFKUC/4cB7XykcIm6St/vqEGaEgYQJ28CrvB5fD4bNT8hYYlHC7eaKKxdr/ltv1ZjpqlqXOBXKS08O5hVdXJhpT7s6QvWUIxTpzvPJFLcEpz+lc8bqzj3fJig83hogmLYBUsjh7Kw6OtwyLoAotgNSx2u6R7YHEFwbDajJRRvKNFaa5pfd/VXJzd4AprG1wN3rex+c6e6kZMZGbt+l1beZeeJQLm4p8XbZqSL82188PD0dGFDxLuJpG/ZRDTSHEL8cxzjLlktowqM+rpAP90HrX6CaENyXlwr5wN9oPTVdi3ULfPt6K9ZsHrNLfR4Y7WfljK7xPeiwviDM1mRChFm8wcMfWgoJVx7hvBG4LSsJsCthARbNAOYAj8+6mpWHa0QYrWh79BUw/XhL8o66NV7jZY65v8y6OT0VHNMwVbd7ZHXZzt0Wpnu8sF3aPFFfXHewqS4zXHVe4NYLzaiZWtg+S4C0iO20Cy+wV1BMlwT0EybLEkHVi5ZUAMuwBi2Go1PijxHYU/2lPhjx4k/IWx3a7wR12EP3qg8LdA/Crh/4hcNUUgOj8iKnGHvueOjGIPWFKzx62o/74lLuR6NgmlmJNc+2hprd2of363qTTKwOvAP62DJImQ6+7UK542wo0/JPa///g3UFK4Ipg9gNRYzYUsC84KcsWmCyks3XMyWLp75+ZGVoi/HvugFcr163sNqERkqvnqmnfs2pr3lm5tZF3+4PTBovvX+qXtEoj+8fHHjkT/dPBxQjHwRx8TFINh8LFDMTg9/TiheBQcvz8UzRZfNLGuvLBN9Na2fDJWZsj/AVBLAQIUAAoAAAAIAHyJbVZIMwnJCxAAAOtcAAAEAAAAAAAAAAAAAAAAAAAAAABzZmR0UEsFBgAAAAABAAEAMgAAAC0QAAAAAA=="};
    var waitingPopUp = document.getElementById('waiting-popup');
    container.documentEditor.open(JSON.stringify(defaultDocument));    
    container.documentEditorSettings.showNavigationPane = true;
    container.documentEditor.documentName = 'Heading Navigation';    
    // TitleBar sample starts
    titleBarDiv = document.getElementById('documenteditor_titlebar');
    initializeTitleBar(true); 
    updateDocumentTitle();
    wireEventsInTitleBar();
    container.documentChange = function () {
        updateDocumentTitle();
    };
     var documentTitle;
     var documentTitleContentEditor;
     var titleBarDiv;
     var print;
     var openBtn;
     var download;
     var isPropertiesPaneEnabled;
     function initializeTitleBar(isShareNeeded) {
         documentTitle = ej.base.createElement('label', { id: 'documenteditor_title_name', styles: 'text-transform:capitalize;font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
         documentTitleContentEditor = ej.base.createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line' });
         documentTitleContentEditor.appendChild(documentTitle);
         titleBarDiv.appendChild(documentTitleContentEditor);
         documentTitleContentEditor.setAttribute('title', 'Document Name. Click or tap to rename this document.');
         var btnStyles = 'float:right;background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;' +
             'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400';
         print = addButton('e-de-icon-Print e-de-padding-right', 'Print', btnStyles, 'de-print', 'Print this document (Ctrl+P).', false);
         openBtn = addButton('e-de-icon-Open e-de-padding-right', 'open', btnStyles, 'de-open', 'Open', false);
         var items = [
            { text: 'Syncfusion® Document Text (*.sfdt)', id: 'sfdt' },
            { text: 'Word Document (*.docx)', id: 'word' },
            { text: 'Word Template (*.dotx)', id: 'dotx'},
            { text: 'Plain Text (*.txt)', id: 'txt'},
        ];
         download = addButton('e-de-icon-Download e-de-padding-right', 'Download', btnStyles, 'documenteditor-share', 'Download this document.', true, items);
         if (!isShareNeeded) {
             download.element.style.display = 'none';
         }
         else {
             openBtn.element.style.display = 'none';
         }
     }
     function wireEventsInTitleBar() {
         print.element.addEventListener('click', onPrint);
         openBtn.element.addEventListener('click', function (e) {
             if (e.target.id === 'de-open') {
                 var fileUpload = document.getElementById('uploadfileButton');
                 fileUpload.value = '';
                 fileUpload.click();
             }
         });
         documentTitleContentEditor.addEventListener('keydown', function (e) {
             if (e.keyCode === 13) {
                 e.preventDefault();
                 documentTitleContentEditor.contentEditable = 'false';
                 if (documentTitleContentEditor.textContent === '') {
                     documentTitleContentEditor.textContent = 'Document1';
                 }
             }
         });
         documentTitleContentEditor.addEventListener('blur', function () {
             if (documentTitleContentEditor.textContent === '') {
                 documentTitleContentEditor.textContent = 'Document1';
             }
             documentTitleContentEditor.contentEditable = 'false';
             container.documentEditor.documentName = documentTitle.textContent;
         });
         documentTitleContentEditor.addEventListener('click', function () {
             updateDocumentEditorTitle();
         });
     }
     function updateDocumentEditorTitle() {
         documentTitleContentEditor.contentEditable = 'true';
         documentTitleContentEditor.focus();
         window.getSelection().selectAllChildren(documentTitleContentEditor);
     }
     function updateDocumentTitle() {
         if (container.documentEditor.documentName === '') {
             container.documentEditor.documentName = 'Untitled';
         }
         documentTitle.textContent = container.documentEditor.documentName;
     }
     function onPrint() {
         container.documentEditor.print();
     }
     function onExportClick(args) {
         var value = args.item.id;
         switch (value) {
             case 'word':
                 save('Docx');
                 break;
             case 'sfdt':
                 save('Sfdt');
                 break;
            case 'txt':
                save('Txt');
                break;
            case 'dotx':
                save('Dotx');
                break;
         }
     }
     function save(format) {
         container.documentEditor.save(container.documentEditor.documentName === '' ? 'sample' : container.documentEditor.documentName, format);
     }
     function setTooltipForPopup() {
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[2].setAttribute('title', 'Download a copy of this document to your computer as a DOTX file.');
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[3].setAttribute('title', 'Download a copy of this document to your computer as a TXT file.');
    }
     function addButton(iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
         var button = ej.base.createElement('button', { id: id, styles: styles });
         titleBarDiv.appendChild(button);
         button.setAttribute('title', tooltipText);
         if (isDropDown) {
             var dropButton = new ej.splitbuttons.DropDownButton({ select: onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: function () { setTooltipForPopup(); } }, button);
             return dropButton;
         }
         else {
             var ejButton = new ej.buttons.Button({ iconCss: iconClass, content: btnText }, button);
             return ejButton;
         }
     } 
