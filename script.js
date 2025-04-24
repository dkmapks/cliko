let clickCount = 0;
let clickPerClick = 1;
let clickPerSecond = 0;
let bankBalance = 0;
let upgrades = [
  { id: 1, price: 25, increment: 1, type: "click" },
  { id: 2, price: 125, increment: 1.5, type: "auto" },
  { id: 3, price: 200, increment: 10, type: "click" },
  { id: 4, price: 600, increment: 8, type: "auto" },
  { id: 5, price: 1500, increment: 100, type: "click" },
];

// Update displayed click count
function updateClickCount() {
  document.getElementById("clickCount").innerText = Math.floor(clickCount);
}

// Handle click button
document.getElementById("clickButton").addEventListener("click", () => {
  clickCount += clickPerClick;
  updateClickCount();
});

// Handle upgrades
document.querySelectorAll(".upgrade").forEach((button) => {
  button.addEventListener("click", () => {
    const id = parseInt(button.getAttribute("data-id"));
    const upgrade = upgrades.find((u) => u.id === id);

    if (clickCount >= upgrade.price) {
      clickCount -= upgrade.price;
      if (upgrade.type === "click") {
        clickPerClick += upgrade.increment;
      } else if (upgrade.type === "auto") {
        clickPerSecond += upgrade.increment;
      }
      upgrade.price = Math.floor(upgrade.price * 1.5); // Increase price
      button.innerText = `Cena: ${upgrade.price} (+${upgrade.increment} ${
        upgrade.type === "click" ? "click" : "/s"
      })`;
      updateClickCount();
    }
  });
});

// Auto clicker
setInterval(() => {
  clickCount += clickPerSecond;
  updateClickCount();
}, 1000);

// Handle bank deposit
document.getElementById("depositButton").addEventListener("click", () => {
  const amount = parseInt(document.getElementById("bankDeposit").value);
  if (amount > 0 && clickCount >= amount) {
    clickCount -= amount;
    updateClickCount();
    document.getElementById("depositMessage").innerText = `Wpłacono ${amount}. Otrzymasz +10% za 3 minuty.`;
    setTimeout(() => {
      bankBalance += amount * 1.1;
      document.getElementById("bankBalance").innerText = Math.floor(bankBalance);
    }, 180000);
  }
});

// Mod menu activation
document.getElementById("modButton").addEventListener("click", () => {
  const code = document.getElementById("modCode").value;
  if (code === "7432") {
    document.getElementById("modMenu").style.display = "block";
  }
});

// Mod menu options
document.getElementById("addClicks").addEventListener("click", () => {
  clickCount += 1000;
  updateClickCount();
});

document.getElementById("addBankBalance").addEventListener("click", () => {
  bankBalance += 1000;
  document.getElementById("bankBalance").innerText = Math.floor(bankBalance);
});
