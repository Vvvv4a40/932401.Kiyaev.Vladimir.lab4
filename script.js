const workHours = [4, 7, 9, 12, 6, 10];

function findMaximum(values) {
    let maximum = values[0];

    for (let i = 1; i < values.length; i++) {
        if (values[i] > maximum) {
            maximum = values[i];
        }
    }

    return maximum;
}

function filterLongLivers(values) {
    return values.filter((value) => value > 8);
}

function calculateSum(values) {
    let sum = 0;

    for (const value of values) {
        sum += value;
    }

    return sum;
}

function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}

function renderValues(values, maximum) {
    const container = document.querySelector("#values");
    container.replaceChildren();

    values.forEach((value, index) => {
        const item = document.createElement("div");
        const title = document.createElement("span");
        const number = document.createElement("strong");
        const level = document.createElement("i");

        item.className = "value-item";
        title.textContent = `Устройство ${index + 1}`;
        number.textContent = `${value} ч`;
        level.style.setProperty("--level", `${Math.round(value / maximum * 100)}%`);

        item.append(title, number, level);
        container.append(item);
    });
}

function runAnalysis() {
    const enteredName = prompt("Как вас зовут?");
    const userName = enteredName && enteredName.trim() ? enteredName.trim() : "Гость";

    alert(`Привет, ${userName}! Сейчас проверим автономность устройств.`);

    const maximum = findMaximum(workHours);
    const longLivers = filterLongLivers(workHours);
    const sum = calculateSum(workHours);
    const average = sum / workHours.length;
    const lowValues = [];

    for (let i = 0; i < workHours.length; i++) {
        if (workHours[i] <= 4) {
            lowValues.push(workHours[i]);
        }
    }

    const lowShare = Math.round(lowValues.length / workHours.length * 100);
    const verdict = average < 6
        ? "Средняя автономность ниже 6 часов. Стоит чаще брать зарядку с собой."
        : "Средняя автономность не ниже 6 часов. Для обычного дня результат нормальный.";

    console.log("Пользователь:", userName);
    console.log("Время работы:", workHours);
    console.log("Максимум:", maximum);
    console.log("Долгожители:", longLivers);
    console.log("Сумма:", sum);
    console.log("До 4 часов:", lowValues);
    console.log("Доля устройств до 4 часов:", `${lowShare}%`);
    console.log("Среднее время:", average);

    if (average < 6) {
        console.log("Стоит обратить внимание на энергоэффективность");
    }

    renderValues(workHours, maximum);
    document.querySelector("#greeting").textContent = `${userName}, вот что получилось`;
    document.querySelector("#averageValue").textContent = formatNumber(average);
    document.querySelector("#maximumValue").textContent = maximum;
    document.querySelector("#longLiversValue").textContent = longLivers.length;
    document.querySelector("#lowShareValue").textContent = lowShare;
    document.querySelector("#sumValue").textContent = `${sum} часов`;
    document.querySelector("#longLiversList").textContent = `${longLivers.join(", ")} часов`;
    document.querySelector("#lowValuesList").textContent = lowValues.length ? `${lowValues.join(", ")} часов` : "нет";
    document.querySelector("#verdict").textContent = verdict;

    alert(`Среднее время работы – ${formatNumber(average)} часов, ${longLivers.length} устройств – долгожители`);
}

document.querySelector("#runButton").addEventListener("click", runAnalysis);
runAnalysis();
