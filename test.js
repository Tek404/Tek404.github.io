
var selectedNumbers = [];

function addNumber(number) {
    if (selectedNumbers.length < 5) {
        selectedNumbers.push(number);
        updateSelectedNumbers();
    } else {
        alert("You can only select up to 5 numbers.");
    }
}

function clearNumbers() {
    selectedNumbers = [];
    updateSelectedNumbers();
}
function removeDuplicateArrays(nestedArray) {
    const uniqueArrays = new Set();

    const filteredArray = nestedArray.filter((arr) => {
        const stringifiedArray = JSON.stringify(arr);
        if (!uniqueArrays.has(stringifiedArray)) {
        uniqueArrays.add(stringifiedArray);
        return true;
        }
        return false;
    });

    return filteredArray;
}
function generateVariants(array) {
    const variantsSet = new Set();

    variantsSet.add(array.slice().sort());

    for (let i = 0; i < array.length; i++) {
        const variant1 = array.slice();

        if (variant1[i] === 3) {
        variant1[i] = 6;
        } else if (variant1[i] === 6) {
        variant1[i] = 3;
        }

        variantsSet.add(variant1.slice().sort());
    }

    const variants = [...variantsSet];
    const removedduplicates = removeDuplicateArrays(variants)
    return removedduplicates;
    }

function findTriplets(initialNumbers, targetNumbers) {
    const result = [];

    for (let i = 0; i < initialNumbers.length - 2; i++) {
        for (let j = i + 1; j < initialNumbers.length - 1; j++) {
        for (let k = j + 1; k < initialNumbers.length; k++) {
            const sum = initialNumbers[i] + initialNumbers[j] + initialNumbers[k];

            if (targetNumbers.includes(sum)) {
            result.push([initialNumbers[i], initialNumbers[j], initialNumbers[k]]);
            }
        }
        }
    }

    return result;
    }

function compareListsRemoveOccurrences(list1, list2) {
    var occurrences = list1.slice();
    var result_list = [];

    for (var i = 0; i < list2.length; i++) {
        var item = list2[i];

        var index = occurrences.indexOf(item);
        if (index !== -1) {
            occurrences.splice(index, 1);
        } else {
            result_list.push(item);
        }
    }

    return occurrences;
}

function compareLargest(array) {
    var maximum = 0
    var biggest = false
    var bigger = false
    var donggu =false
    var bouyin = false
    var boubou = false
    var tendian =false

    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 2) {
            if ((array[i][0] === 20 || array[i][0] === 30 || array[i][0] === 40) && array[i][1] === 11) {
                bigger = true
                donggu = true
            }

            if ((array[i][1] === 20 || array[i][1] === 30 || array[i][1] === 40) && array[i][0] === 11) {
                bigger = true
                donggu = true
            }
            if ((array[i][0] === 1 || array[i][0] === 11) && (array[i][1] === 1 || array[i][1] === 11)){
                bigger = true
                bouyin = true
            }
            if (array[i][0] === array[i][1]) {
                    bigger = true
                    bouyin = true
            }
        }
        if (array[i].length === 1) {
            if (array[i][0].toString().length == 2){
                let numberString = array[i][0].toString();
                let digit1 = parseInt(numberString.charAt(0));
                let digit2 = parseInt(numberString.charAt(1));
                if (digit2 === 0){
                    biggest = true
                    tendian = true
                    maximum = array[i][0]
                }
                if ((digit2>maximum)&& biggest === false){
                    maximum = digit2
                }

            }
            else{
                if ((array[i][0] > maximum)&& biggest === false){
                    maximum = array[i][0]                 
                }
            }
        }    
    }
    if(donggu===true){
        alert("Jesus Christ! You get Dong GU 5x");
    }
    else if (bouyin===true){
        alert("Congratulations! You get Bou Aces 4x");

    }
    else if (boubou===true){
        alert("Congratulations! You get Bou Bou 3x");

    }
    else if (tendian===true){
        alert("Congrats! You Get 10 dian 2x")
    }
    else{
        alert("Erm u get " + maximum +" dian")
    }
}


function updateSelectedNumbers() {
    var selectedNumbersDiv = document.getElementById("selectedNumbers");
    selectedNumbersDiv.innerHTML = selectedNumbers.join(', ');
    var finallist = []
    var finallist2 = []

    if (selectedNumbers.length === 5) {
        var targetSums = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
        const variantsngau = generateVariants(selectedNumbers)

        for (let variant of variantsngau) {
            finallist = []
            var combos = findTriplets(variant, targetSums)
            finallist2.push(variant)
            for (let combo of combos) {
                var sumtwotwo = []
                var sumtwo = compareListsRemoveOccurrences(variant, combo)
                var sum = sumtwo.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
                sumtwotwo.push(sum)
                finallist2.push(combo)
                finallist2.push(sumtwo)
                finallist2.push(sumtwotwo)
            }
        }

        document.getElementById("variantsOutput").innerHTML = "";

        for (let i = 0; i < finallist2.length; i++) {
            var div = document.createElement("div");

            if (finallist2[i].length === 5) {
                div.innerHTML = "Variants: " + JSON.stringify(finallist2[i]);
                document.getElementById("variantsOutput").appendChild(div);
            } else if (finallist2[i].length === 3) {
                div.innerHTML = "Ngau: " + JSON.stringify(finallist2[i]);
                document.getElementById("variantsOutput").appendChild(div);
            } else if (finallist2[i].length === 2) {
                div.innerHTML = "Sum: " + JSON.stringify(finallist2[i]);
                document.getElementById("variantsOutput").appendChild(div);
            } else if (finallist2[i].length === 1) {
                div.innerHTML = "Dian: " + JSON.stringify(finallist2[i]);
                document.getElementById("variantsOutput").appendChild(div);
            }
        }
        compareLargest(finallist2)
}
}