document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance");
    const amountInput = document.getElementById("amount");
    const addButton = document.getElementById("addButton");
    const saveButton = document.getElementById("saveButton");
    const loadButton = document.getElementById("loadButton");

    let balance = 0.0;

    // Funkcja aktualizująca stan wyświetlany na stronie
    function updateBalance() {
        balanceElement.textContent = balance.toFixed(2);
    }

    // Dodawanie kwoty do skarbonki
    addButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);

        if (amount >= 0.01 && amount <= 500) {
            balance += amount;
            updateBalance();
            amountInput.value = "";
        } else {
            alert("Kwota musi być w zakresie od 0.01 zł do 500 zł!");
        }
    });

    // Zapis do LocalStorage
    saveButton.addEventListener("click", () => {
        localStorage.setItem("balance", balance);
        alert("Stan skarbonki zapisany!");
    });

    // Wczytanie z LocalStorage
    loadButton.addEventListener("click", () => {
        const savedBalance = parseFloat(localStorage.getItem("balance"));
        if (!isNaN(savedBalance)) {
            balance = savedBalance;
            updateBalance();
            alert("Stan skarbonki wczytany!");
        } else {
            alert("Nie znaleziono zapisanego stanu skarbonki.");
        }
    });

    // Inicjalizacja
    updateBalance();
});