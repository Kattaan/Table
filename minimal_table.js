(function() {
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
            :host { display: block; padding: 10px; border: 2px dashed red; font-family: Arial; }
            .ok { color: green; }
            .error { color: red; }
        </style>
        <div id="message">Initializing...</div>
        <table id="dataTable"></table>
    `;

    class MinimalTableMain extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
            this.$msg = this.shadowRoot.querySelector('#message');
            this.$table = this.shadowRoot.querySelector('#dataTable');
            this.$msg.textContent = "Component Loaded. Waiting for update...";
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            const dataBinding = this.dataBindings.DataFeed; 

            if (dataBinding && typeof dataBinding.get === 'function') {
                this.$msg.textContent = "DataFeed Found! Fetching data...";
                this.$msg.className = "ok";
                
                dataBinding.get.call(dataBinding, (dataResult) => {
                    if (dataResult && dataResult.data && dataResult.data.length > 0) {
                        this.$msg.textContent = "Data Received. Rendering table.";
                        this.$table.innerHTML = `<thead><tr><th>Data</th></tr></thead><tbody><tr><td>${dataResult.data[0].rawValue}</td></tr></tbody>`;
                    } else {
                        this.$msg.textContent = "Query ran, but no data was returned. (Check Account binding)";
                        this.$msg.className = "error";
                    }
                }, (error) => {
                    this.$msg.textContent = "Data Binding Failed: " + error.message;
                    this.$msg.className = "error";
                });

            } else {
                // THIS IS THE ERROR YOU ARE SEEING
                this.$msg.textContent = "Error: 'DataFeed' object is missing. Check .json manifest.";
                this.$msg.className = "error";
            }
        }
    }
    customElements.define("minimal-table-main-v1", MinimalTableMain);
})();