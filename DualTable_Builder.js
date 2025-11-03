(function() {
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
            label { display: block; margin-top: 10px; font-weight: bold; }
            input[type="text"] { width: 90%; padding: 5px; margin-top: 5px; }
        </style>
        <form id="form">
            <h2>Date Hierarchy Settings</h2>
            
            <label for="dateA">Version A (Monthly) Date Dimension Member:</label>
            <span id="versionA_selector">Select a Dimension in the Designer Panel</span>
            
            <label for="dateB">Version B (Yearly) Date Dimension Member:</label>
            <span id="versionB_selector">Select a Dimension in the Designer Panel</span>
            
            <p style="margin-top: 15px;">Bind your two data sets in the Data tab.</p>
        </form>
    `;

    class DualTableBuilder extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
        }

        // Setters for the custom properties defined in the JSON
        set versionA_DateHierarchy(value) {
            this._versionA_DateHierarchy = value;
            this._shadowRoot.getElementById("versionA_selector").textContent = value ? value.description : "None Selected";
        }
        
        set versionB_DateHierarchy(value) {
            this._versionB_DateHierarchy = value;
            this._shadowRoot.getElementById("versionB_selector").textContent = value ? value.description : "None Selected";
        }
    }
    customElements.define('dual-table-builder', DualTableBuilder);
})();