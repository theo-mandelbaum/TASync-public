ej.base.enableRipple(window.ripple)
/**
 * DropDownList Object Value Binding Sample
 */
var records = [];
for (var i = 1; i <= 150; i++) {
    var dropdownsObjectItem = {};
    dropdownsObjectItem.id = 'id' + i;
    dropdownsObjectItem.text = "Item ".concat(i);
    var randomAutoGroup = Math.floor(Math.random() * 4) + 1;
    switch (randomAutoGroup) {
        case 1:
            dropdownsObjectItem.group = 'Group D';
            break;
        case 2:
            dropdownsObjectItem.group = 'Group C';
            break;
        case 3:
            dropdownsObjectItem.group = 'Group B';
            break;
        case 4:
            dropdownsObjectItem.group = 'Group A';
            break;
        default:
            break;
    }
    records.push(dropdownsObjectItem);
}



    // Initialize DropDownList component
    var listObj = new ej.dropdowns.DropDownList({
        //set the local data to dataSource property
        dataSource: records,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a Item',
        allowObjectBinding: true,
        fields: { text: 'text', value: 'id' },
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
        change: function (args) {
            var inputValue = document.getElementById('value');
            inputValue.value = "Selected value : " + JSON.stringify(listObj.value);
            console.log(args.value);
        },
    });
    listObj.appendTo('#object');
