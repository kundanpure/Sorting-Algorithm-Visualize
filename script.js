let array = [];
let delay = 100;
let arraySize = 50;

document.getElementById('speed').addEventListener('input', function(event) {
    delay = 300 - event.target.value;
});

document.getElementById('size').addEventListener('input', function(event) {
    arraySize = event.target.value;
    resetArray();
});

function resetArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 500) + 1);
    }
    displayArray();
    updateAlgorithmDetails();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    const containerWidth = arrayContainer.clientWidth;
    const barWidth = Math.floor(containerWidth / arraySize) - 2; // Calculate bar width dynamically
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = `${array[i]}px`;
        bar.style.width = `${barWidth}px`;
        bar.classList.add('bar');
        bar.innerText = array[i];
        arrayContainer.appendChild(bar);
    }
}

function updateAlgorithmDetails() {
    const algorithm = document.getElementById('algorithm').value;
    const detailsContainer = document.getElementById('algorithm-details');
    let details = '';

    switch (algorithm) {
        case 'bubble':
            details = `
                <h3>Bubble Sort</h3>
                <p><strong>Time Complexity:</strong> O(n<sup>2</sup>)</p>
                <p><strong>Space Complexity:</strong> O(1)</p>
                <p><strong>Best Case:</strong> O(n)</p>
                <p><strong>Worst Case:</strong> O(n<sup>2</sup>)</p>
                <p>Bubble Sort is a simple comparison-based sorting algorithm.</p>
            `;
            break;
        case 'selection':
            details = `
                <h3>Selection Sort</h3>
                <p><strong>Time Complexity:</strong> O(n<sup>2</sup>)</p>
                <p><strong>Space Complexity:</strong> O(1)</p>
                <p><strong>Best Case:</strong> O(n<sup>2</sup>)</p>
                <p><strong>Worst Case:</strong> O(n<sup>2</sup>)</p>
                <p>Selection Sort repeatedly selects the minimum element and swaps it with the first unsorted element.</p>
            `;
            break;
        case 'insertion':
            details = `
                <h3>Insertion Sort</h3>
                <p><strong>Time Complexity:</strong> O(n<sup>2</sup>)</p>
                <p><strong>Space Complexity:</strong> O(1)</p>
                <p><strong>Best Case:</strong> O(n)</p>
                <p><strong>Worst Case:</strong> O(n<sup>2</sup>)</p>
                <p>Insertion Sort builds the sorted array one item at a time by inserting elements into their correct positions.</p>
            `;
            break;
        case 'merge':
            details = `
                <h3>Merge Sort</h3>
                <p><strong>Time Complexity:</strong> O(n log n)</p>
                <p><strong>Space Complexity:</strong> O(n)</p>
                <p><strong>Best Case:</strong> O(n log n)</p>
                <p><strong>Worst Case:</strong> O(n log n)</p>
                <p>Merge Sort is a divide and conquer algorithm that divides the array into halves, sorts them and then merges them.</p>
            `;
            break;
    }

    detailsContainer.innerHTML = details;
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await highlightBars(j, j + 1);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray();
                await sleep(delay);
            }
            await unhighlightBars(j, j + 1);
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            await highlightBars(minIndex, j);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            await unhighlightBars(minIndex, j);
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            displayArray();
            await sleep(delay);
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            await highlightBars(j, j + 1);
            array[j + 1] = array[j];
            displayArray();
            await sleep(delay);
            await unhighlightBars(j, j + 1);
            j = j - 1;
        }
        array[j + 1] = key;
        displayArray();
        await sleep(delay);
    }
}

// Helper function for merge sort
async function merge(left, right) {
    let sortedArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        await highlightBars(leftIndex, rightIndex);
        if (left[leftIndex] < right[rightIndex]) {
            sortedArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArray.push(right[rightIndex]);
            rightIndex++;
        }
        displayArray();
        await sleep(delay);
        await unhighlightBars(leftIndex, rightIndex);
    }
    return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Merge sort main function
async function mergeSort(arr = array) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return await merge(await mergeSort(left), await mergeSort(right));
}

//quick sort 

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        await highlightBars(j, high);  // Highlight the current element and pivot
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            displayArray();  // Visualize the updated array
            await sleep(delay);  // Add delay for animation
        }
        await unhighlightBars(j, high);  // Unhighlight the current element and pivot
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    displayArray();  // Visualize the updated array
    await sleep(delay);  // Add delay for animation
    return i + 1;
}

//qucik sort main function
async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function highlightBars(index1, index2) {
    const bars = document.getElementsByClassName('bar');
    if (bars[index1]) bars[index1].classList.add('compare');
    if (bars[index2]) bars[index2].classList.add('compare');
    await sleep(delay);
}

async function unhighlightBars(index1, index2) {
    const bars = document.getElementsByClassName('bar');
    if (bars[index1]) bars[index1].classList.remove('compare');
    if (bars[index2]) bars[index2].classList.remove('compare');
    await sleep(delay);
}

async function startSorting() {
    const algorithm = document.getElementById('algorithm').value;
    if (algorithm === 'bubble') {
        await bubbleSort();
    } else if (algorithm === 'selection') {
        await selectionSort();
    } else if (algorithm === 'insertion') {
        await insertionSort();
    } else if (algorithm === 'merge') {
        array = await mergeSort(array);  // Capture the sorted array
        displayArray();  // Display the sorted array
    } else if (algorithm === 'quick') {
        await quickSort(array, 0, array.length - 1);
        displayArray();  // Display the sorted array
    }
}

resetArray();
