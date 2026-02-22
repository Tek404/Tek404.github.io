
var selectedNumbers = [];
let modeType = 0

function addNumber(number) {
    if (selectedNumbers.length < modeType) {
        selectedNumbers.push(number);
        updateSelectedNumbers();
    } else {
        alert(`You can only select up to ${modeType} numbers.`);
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
    const results = [];
    const n = array.length;

    function backtrack(index, current) {
        if (index === n) {
            results.push(current.slice());
            return;
        }

        // keep original
        current.push({
            value: array[index],
            original: array[index]
        });
        backtrack(index + 1, current);
        current.pop();

        // flip if 3 or 6
        if (array[index] === 3 || array[index] === 6) {
            current.push({
                value: array[index] === 3 ? 6 : 3,
                original: array[index]   // keep original identity
            });
            backtrack(index + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return results;
}

function findTriplets(initialNumbers, targetNumbers) {
    const result = [];

    for (let i = 0; i < initialNumbers.length - 2; i++) {
        for (let j = i + 1; j < initialNumbers.length - 1; j++) {
        for (let k = j + 1; k < initialNumbers.length; k++) {

        const sum =
            initialNumbers[i].value +
            initialNumbers[j].value +
            initialNumbers[k].value;

            if (targetNumbers.includes(sum)) {
            result.push([initialNumbers[i], initialNumbers[j], initialNumbers[k]]);
            }
        }
        }
    }

    return result;
    }

function compareListsRemoveOccurrences(list1, list2) {
    const remaining = [...list1];

    for (let item of list2) {
        const index = remaining.findIndex(
            x => x.original === item.original && x.value === item.value
        );

        if (index !== -1) {
            remaining.splice(index, 1);
        }
    }

    return remaining;
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
            if ((array[i][0].value === 20 || array[i][0].value === 30 || array[i][0].value === 40) && array[i][1].value === 11) {
                bigger = true
                donggu = true
            }

            if ((array[i][1].value === 20 || array[i][1].value === 30 || array[i][1].value === 40) && array[i][0].value === 11) {
                bigger = true
                donggu = true
            }
            if ((array[i][0].value === 1 || array[i][0].value === 11) && (array[i][1].value === 1 || array[i][1].value === 11)){

                bigger = true
                bouyin = true
            }
            if (
                array[i][0].value === array[i][1].value &&
                array[i][0].original === array[i][1].original
            ) {
                bigger = true
                boubou = true
            }

        }
        if (array[i].length === 1) {
            if (array[i][0].value.toString().length == 2){
                let numberString = array[i][0].value.toString();
                let digit1 = parseInt(numberString.charAt(0));
                let digit2 = parseInt(numberString.charAt(1));
                if (digit2 === 0){
                    biggest = true
                    tendian = true
                    maximum = array[i][0].value
                }
                if ((digit2>maximum)&& biggest === false){
                    maximum = digit2
                }

            }
            else{
                if ((array[i][0].value > maximum)&& biggest === false){
                    maximum = array[i][0].value              
                }
            }
        }
    }
    
    if(donggu===true){
        return {
            ranked: 5, 
            msg: "Heng Ong Huat, Ngau Dong Gu"
        }
    }
    else if (bouyin===true){
        return {
            ranked: 4, 
            msg: "Congratulations! You get Bou Aces 4x"
        }
    }
    else if (boubou===true){
        return {
            ranked: 3, 
            msg: "Congratulations! You get Bou Bou 3x"
        }

    }
    else if (tendian===true){
        return {
            ranked: 2, 
            msg: "Congrats! You Get 10 dian 2x"
        }
    }
    else{
        return {
            ranked: 1, 
            msg: "Congrats? You got " + maximum +" dian"
        }
    }
}

/**
 * Returns leftover cards after finding a valid Ngau (3-card sum divisible by 10)
 * @param {Array<Array<{value:number, original:number}>>} nestedArray 
 * @returns {Array<Array<{value:number, original:number}>>} only leftover 2-card arrays
 */
function getNgauLeftovers(nestedArray) {
    const targetSums = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180]; // sums divisible by 10
    const leftovers = [];

    for (let arr of nestedArray) {
        let found = false;

        // Find all triplets
        for (let i = 0; i < arr.length - 2 && !found; i++) {
            for (let j = i + 1; j < arr.length - 1 && !found; j++) {
                for (let k = j + 1; k < arr.length && !found; k++) {
                    const sum = arr[i].value + arr[j].value + arr[k].value;
                    if (sum % 10 === 0 || targetSums.includes(sum)) {
                        // valid Ngau found
                        const remaining = arr.filter((_, idx) => idx !== i && idx !== j && idx !== k);
                        leftovers.push(remaining); // push only the leftover 2 cards
                    }
                }
            }
        }
    }

    return leftovers;
}

/*
 * Evaluate leftover 2-card arrays and return the highest ranked combo
 * @param {Array<Array<{value:number, original:number}>>} leftoverArrays 
 * @returns {{ranked:number, msg:string, bestPair:Array<{value:number, original:number}>}}
 */
function evaluateLeftoverPairs(leftoverArrays) {
    let bestRank = 0;
    let bestMsg = '';
    let bestPair = null;

    for (let pair of leftoverArrays) {
        if (pair.length !== 2) continue; // must be 2-card pair
        const [a, b] = pair;

        // Rule 1: Donggu
        if ((a.value === 11 && [20,30,40].includes(b.value)) || (b.value === 11 && [20,30,40].includes(a.value))) {
            if (5 > bestRank) {
                bestRank = 5;
                bestMsg = "Heng Ong Huat, Ngau Dong Gu";
                bestPair = pair;
            }
            continue;
        }

        // Rule 2: Bouyin
        if ((a.value === 1 || a.value === 11) && (b.value === 1 || b.value === 11)) {
            if (4 > bestRank) {
                bestRank = 4;
                bestMsg = "Congratulations! You get Bou Aces 4x";
                bestPair = pair;
            }
            continue;
        }

        // Rule 3: Bou Bou
        if (a.value === b.value && a.original === b.original) {
            if (3 > bestRank) {
                bestRank = 3;
                bestMsg = "Congratulations! You get Bou Bou 3x";
                bestPair = pair;
            }
            continue;
        }

        // Rule 4: Shidian (sum % 10 === 0)
        if ((a.value + b.value) % 10 === 0) {
            if (2 > bestRank) {
                bestRank = 2;
                bestMsg = "Congrats! You get Shidian 2x";
                bestPair = pair;
            }
            continue;
        }

        // Rule 5: leftover dian (sum % 10)
        const leftoverDian = (a.value + b.value) % 10;
        if (1 > bestRank || (1 === bestRank && leftoverDian > ((bestPair[0].value + bestPair[1].value) % 10))) {
            bestRank = 1;
            bestMsg = `Congrats! You got ${leftoverDian} dian`;
            bestPair = pair;
        }
    }

    return {
        ranked: bestRank,
        msg: bestMsg,
        bestPair
    };
}

function updateSelectedNumbers() {
    var selectedNumbersDiv = document.getElementById("selectedNumbers");
    const faceCards = {
        20: 'J',
        30: 'Q',
        40: 'K',
        11: '♠'
    };

    let remapOutputDisplay = selectedNumbers.map(e => faceCards[e] || e);
    selectedNumbersDiv.innerHTML = remapOutputDisplay.join(', ');
    let arrayComboToUse = []

    if(selectedNumbers.length === modeType){
        arrayComboToUse = generateCombinationsBasedOnMode(selectedNumbers, 5)
    }else{
        return
    }
    let resultRanked = 0
    let resultMsg = ''
    var finallist2 = []
    
    for(const item of arrayComboToUse){

        const variants = generateVariants(item)
        finallist2.push(...variants)
  
    }
    const removeAndFindNgau = getNgauLeftovers(finallist2)
    if(removeAndFindNgau.length === 0 ){
        showModal("No Ngau", 1);
        return
    }
    const bestResult = evaluateLeftoverPairs(removeAndFindNgau)
    showModal(bestResult.msg, bestResult.ranked);
}

function modeSetting(mode) {
    document.getElementById("modeSelection").classList.add("hidden");
    document.getElementById("mainCalc").classList.remove("hidden");

    var selectedNumbersDiv = document.getElementById("selectedNumbers");
    selectedNumbersDiv.innerHTML = "";

    selectedNumbers = []; // reset the array

    modeType = mode;
}

function showModeModel() {
    document.getElementById("mainCalc").classList.add("hidden");
    document.getElementById("modeSelection").classList.remove("hidden");
}


function generateCombinationsBasedOnMode(arr, r) {
  const result = [];

  function backtrack(start, combo) {
    if (combo.length === r) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      backtrack(i + 1, combo);
      combo.pop();
    }
  }

  backtrack(0, []);
  return result;
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettis = [];
    const colors = ['#FFD700','#FF4500','#FF6347','#FF0000'];

    for (let i = 0; i < 150; i++) {
        confettis.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngle: 0,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05
        });
    }

    let active = true;

    function draw() {
        if (!active) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettis.forEach(c => {
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
            ctx.stroke();

            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
            c.x += Math.sin(c.tiltAngle);

            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(() => {
        active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

function showModal(message, rank) {
    const modal = document.getElementById("resultModal");
    const modalContent = modal.querySelector(".modal-content");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.innerHTML = message;
    modal.classList.remove("hidden");

    // Reset animations
    modalContent.classList.remove("glow");
    modalContent.style.animation = 'none';
    void modalContent.offsetWidth; // force reflow to restart animation

    // Pop-in effect
    modalContent.style.animation = 'popIn 0.3s ease';

    if(rank >= 4) {
        modalContent.classList.add("glow");
        launchConfetti();
    } else if(rank === 1) {
        // Shake for low rank
        modalContent.style.animation = 'shake 0.5s';
    }
}

function closeModal() {
    document.getElementById("resultModal").classList.add("hidden");
}

function openDonationModal () {
    document.getElementById("donationModal").classList.remove("hidden");
    launchConfetti();

}

function closeDonationModal() {
    document.getElementById("donationModal").classList.add("hidden");
}
