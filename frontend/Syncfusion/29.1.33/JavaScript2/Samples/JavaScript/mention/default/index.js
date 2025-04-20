ej.base.enableRipple(window.ripple)

/**
 * Mention default sample
 */



    var messageData = new ej.dropdowns.Mention({
        dataSource: window.emailData,
        fields: { text: 'Name' }
    });
    messageData.appendTo('#commentsMention');

