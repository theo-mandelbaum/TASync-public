ej.base.enableRipple(window.ripple)

/**
 * Mention Template sample
 */


    // Initialize Mention component.
    var mentionObj = new ej.dropdowns.Mention({
        dataSource: window.emailData,
        fields: { text: 'Name' },
        itemTemplate: '<div class="listItems"><img class="mentionEmpImage" src="//npmci.syncfusion.com/development/demos/src/mention/Employees/${Eimg}.png" alt="employee"/><span class="person">${Name}</span><span class="email">${EmailId}</span></div>',
        noRecordsTemplate: 'No item related to the search',
        displayTemplate: '${Name}',
        popupWidth: '250px',
        popupHeight: '200px'
    });
    mentionObj.appendTo('#templateMention');
