this.default = function () {
    /**
     * ComboBox Semantic Searching Sample
     */
    let products = [
        { ID: 1, Name: "iPhone 13", Category: "Electronics", Brand: "Apple", Description: "A15 Bionic chip" },
        { ID: 2, Name: "Galaxy S21", Category: "Electronics", Brand: "Samsung", Description: "Flagship phone" },
        { ID: 3, Name: "PlayStation 5", Category: "Gaming", Brand: "Sony", Description: "Next-gen gaming" },
        { ID: 4, Name: "MacBook Pro", Category: "Computers", Brand: "Apple", Description: "laptop with M1 chip" },
        { ID: 5, Name: "Surface Pro 7", Category: "Computers", Brand: "Microsoft", Description: "2-in-1 laptop" },
        { ID: 6, Name: "Nintendo Switch", Category: "Gaming", Brand: "Nintendo", Description: "Hybrid console" },
        { ID: 7, Name: "Echo Dot", Category: "Smart Home", Brand: "Amazon", Description: "smart speaker" },
        { ID: 8, Name: "Roomba i7", Category: "Home Appliances", Brand: "iRobot", Description: "robot vacuum" },
        { ID: 9, Name: "OLED TV", Category: "Electronics", Brand: "LG", Description: "4K OLED TV" },
        { ID: 10, Name: "AirPods Pro", Category: "Accessories", Brand: "Apple", Description: "wireless earbuds" },
        { ID: 11, Name: "Galaxy Watch 4", Category: "Wearables", Brand: "Samsung", Description: "Smartwatch" },
        { ID: 12, Name: "Kindle Paperwhite", Category: "Electronics", Brand: "Amazon", Description: "E-reader" },
        { ID: 13, Name: "Dyson V11", Category: "Home Appliances", Brand: "Dyson", Description: "vacuum cleaner" },
        { ID: 14, Name: "GoPro HERO9", Category: "Cameras", Brand: "GoPro", Description: "Action camera" },
        { ID: 15, Name: "Fitbit Charge 5", Category: "Wearables", Brand: "Fitbit", Description: "Fitness tracker" },
        { ID: 16, Name: "Nest Thermostat", Category: "Smart Home", Brand: "Google", Description: "Smart thermostat" },
        { ID: 17, Name: "Sony WH-1000XM4", Category: "Accessories", Brand: "Sony", Description: "wireless headphones" },
        { ID: 18, Name: "Instant Pot Duo", Category: "Home Appliances", Brand: "Instant Pot", Description: "pressure cooker" },
        { ID: 19, Name: "Roku Streaming Stick+", Category: "Electronics", Brand: "Roku", Description: "4K HDR streaming device" },
        { ID: 20, Name: "Bose SoundLink", Category: "Accessories", Brand: "Bose", Description: "Bluetooth speaker" }
    ]
    let productEmbeddings = {};
    getEmbeddingsData();

    async function getEmbeddingsData() {
        for (let product of products) {
            let data = (await window.embeddingModel(
                product.Name + " " + product.Category + " " + product.Brand + " " + product.Description
            ));
            productEmbeddings[product.ID] = data;
        }
    }

    // initialize ComboBox component
    let comboBoxObj = new ej.dropdowns.ComboBox({
        dataSource: products,
        fields: { text: "Name", value: "ID" },
        placeholder: "Enter any product",
        popupHeight: "300px",
        width: "250px",
        allowFiltering: true,
        noRecordsTemplate: '<div><div id="nodata"> No matched item</div>',
        filtering: async (e) => {
            if (e.text.length > 0) {
                let queryVector = await window.embeddingModel(e.text);
                const similarityThreshold = 0.83;
                const outputData = products.filter((product) => {
                    const similarity = window.cosineSimilarity(
                        productEmbeddings[product.ID],
                        queryVector
                    );
                    if (similarity > similarityThreshold) {
                        return product;
                    }
                });
                if (outputData.length > 0) {
                    let query = new ej.data.Query();
                    e.updateData(outputData, query);
                }
            }
        },
    });
    comboBoxObj.appendTo("#combo-box-local");
};
