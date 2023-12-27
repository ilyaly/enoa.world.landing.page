const container = document.getElementById("container");

const setSelection = (block) => {
    const controlls = block.getElementsByClassName("block-controls")[0];
    const spans = controlls.children;
    spans[0].className = "block-control-selected";
}

const cleanSelection = (block) => {
    const controlls = block.getElementsByClassName("block-controls")[0];
    const spans = controlls.children;
    for (const span of spans) {
        span.className = "block-control-not-selected";
    }
};


const createContentBlock = (data) => {
    if (data.id) {
        const menuEntries = document.getElementById("dropdown-entries");
        const menuEntry = document.createElement("a");
        menuEntry.innerHTML = data.header;
        menuEntry.setAttribute("href", `#${data.id}`);
        menuEntries.appendChild(menuEntry);
    }


    const blockElement = document.createElement("div");
    blockElement.className = "block";
    blockElement.id = data.id;
    container.appendChild(blockElement);

    const topHrElement = document.createElement("hr");
    blockElement.appendChild(topHrElement);

    if (data.header) {
        const blockHeaderElement = document.createElement("div");
        blockHeaderElement.className = "block-header";
        blockHeaderElement.innerHTML = data.header;
        blockElement.appendChild(blockHeaderElement);
    }


    const blockItemsElement = document.createElement("div");
    blockItemsElement.className = "block-items";
    blockElement.appendChild(blockItemsElement);

    const blockControlsElement = document.createElement("div");
    blockControlsElement.className = "block-controls";
    blockElement.appendChild(blockControlsElement);

    for (const item of data.items) {
        const itemElement = document.createElement("div");
        itemElement.className = "item";

        const itemContentElement = document.createElement("div");
        itemContentElement.className = "item-content";

        if (item.name) {
            const itemHeaderElement = document.createElement("div");
            itemHeaderElement.className = "item-header";
            itemHeaderElement.innerHTML = item.name;
            itemContentElement.appendChild(itemHeaderElement);
        }

        if (item.description) {
            const itemDescriptionElement = document.createElement("div");
            itemDescriptionElement.className = "item-text";
            itemDescriptionElement.innerHTML = item.description;
            itemContentElement.appendChild(itemDescriptionElement);
        }

        const itemMediaElement = document.createElement("div");
        itemMediaElement.className = "item-media"

        if (item.media.type === "image") {
            const itemImage = document.createElement("img");
            itemImage.setAttribute("src", item.media.url);
            itemMediaElement.appendChild(itemImage);
        }

        if (item.media.type === "iframe") {
            const itemIframe = document.createElement("iframe");
            itemIframe.setAttribute("src", item.media.url);
            itemMediaElement.appendChild(itemIframe);
        }

        itemElement.appendChild(itemContentElement);
        itemElement.appendChild(itemMediaElement);

        blockItemsElement.appendChild(itemElement);

        const blockControlElement = document.createElement("span");
        blockControlElement.innerHTML = "◈" /*item.name;*/
        blockControlElement.className = "block-control-not-selected"
        blockControlElement.addEventListener("click", function(e) {
            cleanSelection(blockElement);
            blockControlElement.className = "block-control-selected";
            itemElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        });

        blockControlsElement.appendChild(blockControlElement);

    }


    setSelection(blockElement);

}


let request = new Request(`/public/data/content.json`);
fetch(request)
    .then((response) => response.json())
    .then((content) => {
        for (const block of content) {
            createContentBlock(block)
        }
    })
    .catch(console.error);





// A N I M A T I O N S