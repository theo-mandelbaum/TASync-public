this.default = function () {
    /**
     * Adaptive Data Structuring Tree Grid sample
     */
    ej.treegrid.TreeGrid.Inject(ej.treegrid.Toolbar, ej.treegrid.Edit);

    let treegrid = new ej.treegrid.TreeGrid({
        dataSource: window.projectData,
        idMapping: 'CategoryId',
        parentIdMapping: 'ParentId',
        treeColumnIndex: 1,
        toolbar: [{ template: `<button id='smartdata'>Smart Data Restructure</button>` }],
        created: created,
        columns: [
            { field: 'CategoryId', headerText: 'Category Id', isPrimaryKey: true, textAlign: 'Right', width: 60 },
            { field: 'CategoryName', headerText: 'Category Name', width: 100 },
            { field: 'Status', headerText: 'Status', width: 70 },
            { field: 'OrderDate', headerText: 'Last Order Date', format: 'yMd', width: 90 }
        ]
    });
    treegrid.appendTo('#TreeGrid');

    function restructureData() {
        treegrid.showSpinner();
        let input = `I want you to act as a TreeGrid Data Organizer.
                Your task is to organize a dataset based on a hierarchical structure using 'CategoryId' and 'ParentId'.
                Each item in the dataset has a 'CategoryName' representing categories, and some categories have a null 'ParentId', indicating they are top-level categories. 
                Your role will be to meticulously scan the entire dataset to identify related items based on their 'CategoryName' values and nest them under the appropriate top-level categories by updating their 'ParentId' to match the 'CategoryId' of the corresponding top-level category.
                For example, if a category like 'Furniture' exists, you should scan the dataset for items such as 'Chair' and 'Table' and update their 'ParentId' to the 'CategoryId' of 'Furniture'.
                The output should be the newly prepared TreeGridData with correctly assigned 'ParentId' values. Please ensure that all subcategories are correctly nested under their respective top-level categories .
                Return the newly prepared TreeGridData alone and don't share any other information with the response:` + JSON.stringify(treegrid.dataSource);
        let aioutput = window.geminiModel(input);
        aioutput.then((result) => {
            let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
            treegrid.dataSource = JSON.parse(cleanedJsonData);
            treegrid.hideSpinner();
        });
    }

    function created() {
        let button = document.getElementById('smartdata');
        button.onclick = restructureData;
        new ej.buttons.Button({ isPrimary: true }, '#smartdata');
    }

};