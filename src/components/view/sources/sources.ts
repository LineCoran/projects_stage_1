import './sources.css';

interface Item {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: []) {
        console.log(data);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Item) => {
            if (sourceItemTemp === null) {
                throw new Error('The element is null');
            }

            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');

            if (sourceItem === null || sourceItemName === null) {
                throw new Error('Element is null');
            }

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources === null) {
            throw new Error('Sources Element is null');
        }
        sources.append(fragment);
    }
}

export default Sources;
