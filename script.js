function toggleLabelFields() {
  const withLabel = document.getElementById('withLabel').value;
  document.getElementById('labelFields').style.display = withLabel === 'yes' ? 'block' : 'none';
}

function calculateEarnings() {
  const ytViews = +document.getElementById('ytViews').value;
  const ytRate = +document.getElementById('ytRate').value;
  const ttViews = +document.getElementById('ttViews').value;
  const ttRate = +document.getElementById('ttRate').value;
  const igPosts = +document.getElementById('igPosts').value;
  const igRate = +document.getElementById('igRate').value;
  const extraIncome = +document.getElementById('extraIncome').value;
  const tax = +document.getElementById('tax').value;
  const withLabel = document.getElementById('withLabel').value;

  const ytIncome = (ytViews / 1000) * ytRate;
  const ttIncome = (ttViews / 1000) * ttRate;
  const igIncome = igPosts * igRate;
  let labelIncome = 0;

  if (withLabel === 'yes') {
    const albumsSold = +document.getElementById('albumsSold').value;
    const albumPrice = +document.getElementById('albumPrice').value;
    const albumCut = +document.getElementById('albumCut').value;
    const concerts = +document.getElementById('concerts').value;
    const concertCut = +document.getElementById('concertCut').value;

    const albumGross = albumsSold * albumPrice;
    const albumNet = albumGross * ((100 - albumCut) / 100);

    const concertNet = concerts * ((100 - concertCut) / 100);

    labelIncome = albumNet + concertNet;
  }

  const monthlyGross = ytIncome + ttIncome + igIncome + extraIncome + labelIncome;
  const taxAmount = (monthlyGross * tax) / 100;
  const monthlyNet = monthlyGross - taxAmount;
  const yearlyNet = monthlyNet * 12;
  const dailyNet = monthlyNet / 30;
  const hourlyNet = dailyNet / 8;

  document.getElementById('results').innerHTML = `
    <h3>Podsumowanie:</h3>
    <p><strong>Miesięcznie (netto):</strong> ${monthlyNet.toFixed(2)} PLN</p>
    <p><strong>Rocznie (netto):</strong> ${yearlyNet.toFixed(2)} PLN</p>
    <p><strong>Dziennie:</strong> ${dailyNet.toFixed(2)} PLN</p>
    <p><strong>Godzinowo:</strong> ${hourlyNet.toFixed(2)} PLN</p>
  `;
}