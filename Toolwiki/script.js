document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // FOOTER YEAR
  // ===============================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


document.getElementById("tool-search").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".tool").forEach(tool => {
    tool.style.display = tool.textContent.toLowerCase().includes(term) ? "block" : "none";
  });
});





  // ===============================
  // PASSWORD GENERATOR
  // ===============================
  const pwLengthEl = document.getElementById("pw-length");
  const pwLowerEl = document.getElementById("pw-lower");
  const pwUpperEl = document.getElementById("pw-upper");
  const pwNumbersEl = document.getElementById("pw-numbers");
  const pwSymbolsEl = document.getElementById("pw-symbols");
  const pwGenerateBtn = document.getElementById("pw-generate");
  const pwOutputEl = document.getElementById("pw-output");
  const pwCopyBtn = document.getElementById("pw-copy");
  const pwMessageEl = document.getElementById("pw-message");

  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?";

  function generatePassword() {
    if (!pwLengthEl || !pwOutputEl) return;

    const length = parseInt(pwLengthEl.value, 10);
    let chars = "";

    if (pwLowerEl?.checked) chars += LOWER;
    if (pwUpperEl?.checked) chars += UPPER;
    if (pwNumbersEl?.checked) chars += NUMBERS;
    if (pwSymbolsEl?.checked) chars += SYMBOLS;

    if (!chars) {
      if (pwMessageEl) {
        pwMessageEl.textContent = "Select at least one character type.";
        pwMessageEl.classList.add("error");
      }
      pwOutputEl.value = "";
      return;
    }

    if (pwMessageEl) {
      pwMessageEl.textContent = "";
      pwMessageEl.classList.remove("error");
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      password += chars[idx];
    }
    pwOutputEl.value = password;
  }

  pwGenerateBtn?.addEventListener("click", generatePassword);

  pwCopyBtn?.addEventListener("click", () => {
    if (!pwOutputEl?.value) return;
    pwOutputEl.select();
    document.execCommand("copy");
    if (pwMessageEl) {
      pwMessageEl.textContent = "Password copied to clipboard.";
      pwMessageEl.classList.remove("error");
    }
  });

  // ===============================
  // LENGTH CONVERTER
  // ===============================
  const lengthValueEl = document.getElementById("length-value");
  const lengthFromEl = document.getElementById("length-from");
  const lengthToEl = document.getElementById("length-to");
  const lengthConvertBtn = document.getElementById("length-convert");
  const lengthOutputEl = document.getElementById("length-output");

  const lengthToMeters = {
    m: 1,
    km: 1000,
    ft: 0.3048,
    mi: 1609.34
  };

  function convertLength() {
    if (!lengthValueEl || !lengthOutputEl) return;

    const value = parseFloat(lengthValueEl.value);
    const from = lengthFromEl?.value;
    const to = lengthToEl?.value;

    if (isNaN(value)) {
      lengthOutputEl.value = "Enter a valid number.";
      return;
    }

    const meters = value * lengthToMeters[from];
    const result = meters / lengthToMeters[to];

    lengthOutputEl.value = `${value} ${from} = ${result.toFixed(4)} ${to}`;
  }

  lengthConvertBtn?.addEventListener("click", convertLength);

  // ===============================
  // TIP CALCULATOR
  // ===============================
  const tipBillEl = document.getElementById("tip-bill");
  const tipPercentEl = document.getElementById("tip-percent");
  const tipPeopleEl = document.getElementById("tip-people");
  const tipCalcBtn = document.getElementById("tip-calc");
  const tipTotalEl = document.getElementById("tip-total");
  const tipPerPersonEl = document.getElementById("tip-per-person");

  function calculateTip() {
    if (!tipBillEl || !tipPercentEl || !tipPeopleEl) return;

    const bill = parseFloat(tipBillEl.value);
    const percent = parseFloat(tipPercentEl.value);
    const people = parseInt(tipPeopleEl.value, 10);

    if (isNaN(bill) || isNaN(percent) || isNaN(people) || people <= 0) {
      tipTotalEl.textContent = "0.00";
      tipPerPersonEl.textContent = "0.00";
      return;
    }

    const tip = bill * (percent / 100);
    const perPerson = (bill + tip) / people;

    tipTotalEl.textContent = tip.toFixed(2);
    tipPerPersonEl.textContent = perPerson.toFixed(2);
  }

  tipCalcBtn?.addEventListener("click", calculateTip);

  // ===============================
  // QR CODE GENERATOR
  // ===============================
  const qrInput = document.getElementById("qr-input");
  const qrCanvas = document.getElementById("qr-canvas");
  const qrGenerate = document.getElementById("qr-generate");

  qrGenerate?.addEventListener("click", () => {
    const text = qrInput?.value.trim();
    if (!text || !qrCanvas) return;

    QRCode.toCanvas(qrCanvas, text, { width: 180 }, (error) => {
      if (error) console.error(error);
    });
  });

// ===============================
// QR DOWNLOAD BUTTON
// ===============================
const qrDownloadBtn = document.getElementById("qr-download");

qrDownloadBtn?.addEventListener("click", () => {
  if (!qrCanvas) return;

  // Convert canvas to PNG data URL
  const dataURL = qrCanvas.toDataURL("image/png");

  // Create a temporary link
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "qr-code.png";

  // Trigger download
  link.click();
});







  // ===============================
  // RANDOM GENERATOR
  // ===============================
  const randomType = document.getElementById("random-type");
  const randomGenerate = document.getElementById("random-generate");
  const randomOutput = document.getElementById("random-output");

  const names = ["Alex", "Jordan", "Taylor", "Sam", "Chris", "Morgan", "Jamie"];

  randomGenerate?.addEventListener("click", () => {
    if (!randomType || !randomOutput) return;

    if (randomType.value === "number") {
      randomOutput.textContent = Math.floor(Math.random() * 10000);
    } else {
      randomOutput.textContent = names[Math.floor(Math.random() * names.length)];
    }
  });

  // ===============================
  // JSON FORMATTER
  // ===============================
  const jsonInput = document.getElementById("json-input");
  const jsonOutput = document.getElementById("json-output");
  const jsonFormatBtn = document.getElementById("json-format");

  jsonFormatBtn?.addEventListener("click", () => {
    if (!jsonInput || !jsonOutput) return;

    try {
      const obj = JSON.parse(jsonInput.value);
      jsonOutput.value = JSON.stringify(obj, null, 2);
    } catch {
      jsonOutput.value = "Invalid JSON";
    }
  });

  // ===============================
  // CURRENCY CONVERTER
  // ===============================
  const ccAmount = document.getElementById("cc-amount");
  const ccFrom = document.getElementById("cc-from");
  const ccTo = document.getElementById("cc-to");
  const ccConvert = document.getElementById("cc-convert");
  const ccResult = document.getElementById("cc-result");

  ccConvert?.addEventListener("click", async () => {
    if (!ccAmount || !ccFrom || !ccTo || !ccResult) return;

    const amount = parseFloat(ccAmount.value);
    const from = ccFrom.value;
    const to = ccTo.value;

    if (!amount || amount < 0) return;

    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();

      if (!data.rates || !data.rates[to]) {
        ccResult.textContent = "Invalid currency or API error";
        return;
      }

      const rate = data.rates[to];
      const converted = amount * rate;

      ccResult.textContent = converted.toFixed(2) + " " + to;
    } catch {
      ccResult.textContent = "Error fetching live rates";
    }
  });

  // ===============================
  // IMAGE COMPRESSOR
  // ===============================
  const icFile = document.getElementById("ic-file");
  const icQuality = document.getElementById("ic-quality");
  const icCompress = document.getElementById("ic-compress");
  const icOriginal = document.getElementById("ic-original");
  const icCompressed = document.getElementById("ic-compressed");
  const icDownload = document.getElementById("ic-download");

  let selectedImage = null;

  icFile?.addEventListener("change", () => {
    selectedImage = icFile.files[0];
    if (selectedImage && icOriginal) {
      icOriginal.textContent = (selectedImage.size / 1024).toFixed(2) + " KB";
    }
  });

  icCompress?.addEventListener("click", () => {
    if (!selectedImage || !icQuality || !icCompressed || !icDownload) return;

    const quality = parseFloat(icQuality.value);

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const compressedData = canvas.toDataURL("image/jpeg", quality);

        const byteString = atob(compressedData.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }

        const compressedBlob = new Blob([uintArray], { type: "image/jpeg" });

        icCompressed.textContent = (compressedBlob.size / 1024).toFixed(2) + " KB";

        icDownload.href = URL.createObjectURL(compressedBlob);
        icDownload.style.display = "inline-block";
      };
    };
  });

  // ===============================
  // TIME ZONE CONVERTER
  // ===============================
  const tzInput = document.getElementById("tz-input");
  const tzFrom = document.getElementById("tz-from");
  const tzTo = document.getElementById("tz-to");
  const tzConvert = document.getElementById("tz-convert");
  const tzResult = document.getElementById("tz-result");

  const timeZones = Intl.supportedValuesOf("timeZone");

  if (tzFrom && tzTo) {
    timeZones.forEach(zone => {
      const option1 = document.createElement("option");
      option1.value = zone;
      option1.textContent = zone;

      const option2 = document.createElement("option");
      option2.value = zone;
      option2.textContent = zone;

      tzFrom.appendChild(option1);
      tzTo.appendChild(option2);
    });

    tzFrom.value = "America/Chicago";
    tzTo.value = "UTC";
  }

  tzConvert?.addEventListener("click", () => {
    if (!tzInput || !tzResult || !tzFrom || !tzTo) return;

    const inputValue = tzInput.value;
    if (!inputValue) {
      tzResult.textContent = "Select a date and time first.";
      return;
    }

    const fromZone = tzFrom.value;
    const toZone = tzTo.value;

    const date = new Date(inputValue);

    const converted = new Intl.DateTimeFormat("en-US", {
      timeZone: toZone,
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);

    tzResult.textContent = `${converted} (${toZone})`;
  });




 // ===============================
  // IMAGE CONVERTER
  // ===============================


const icvFile = document.getElementById("icv-file");
const icvFormat = document.getElementById("icv-format");
const icvConvert = document.getElementById("icv-convert");
const icvOriginalType = document.getElementById("icv-original-type");
const icvConvertedType = document.getElementById("icv-converted-type");
const icvDownload = document.getElementById("icv-download");

let icvSelectedImage = null;
icvFile?.addEventListener("change", () => {
  icvSelectedImage = icvFile.files[0];
  if (icvSelectedImage) {
    icvOriginalType.textContent = icvSelectedImage.type || "Unknown";
  }
});

icvConvert?.addEventListener("click", () => {
  if (!icvSelectedImage) return;

  const targetType = icvFormat?.value;
  if (!targetType) return;

  const reader = new FileReader();
  reader.readAsDataURL(icvSelectedImage);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const convertedData = canvas.toDataURL(targetType);

      const byteString = atob(convertedData.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const convertedBlob = new Blob([uintArray], { type: targetType });

      icvConvertedType.textContent = targetType;

      let ext = "jpg";
      if (targetType === "image/png") ext = "png";
      if (targetType === "image/webp") ext = "webp";

      icvDownload.href = URL.createObjectURL(convertedBlob);
      icvDownload.download = "toolwiki-converted." + ext;
      icvDownload.style.display = "inline-block";
    };
  };
});






const b64Input = document.getElementById("b64-input");
const b64Output = document.getElementById("b64-output");
const b64Encode = document.getElementById("b64-encode");
const b64Decode = document.getElementById("b64-decode");

// Encode text → Base64
b64Encode.addEventListener("click", () => {
  const text = b64Input.value;
  if (!text) {
    b64Output.value = "";
    return;
  }

  try {
    const encoded = btoa(unescape(encodeURIComponent(text)));
    b64Output.value = encoded;
  } catch (e) {
    b64Output.value = "Error: Unable to encode text.";
  }
});

// Decode Base64 → text
b64Decode.addEventListener("click", () => {
  const text = b64Input.value;
  if (!text) {
    b64Output.value = "";
    return;
  }

  try {
    const decoded = decodeURIComponent(escape(atob(text)));
    b64Output.value = decoded;
  } catch (e) {
    b64Output.value = "Error: Invalid Base64 input.";
  }
});






const ciPrincipal = document.getElementById("ci-principal");
const ciRate = document.getElementById("ci-rate");
const ciYears = document.getElementById("ci-years");
const ciFrequency = document.getElementById("ci-frequency");
const ciCalculate = document.getElementById("ci-calculate");
const ciFinal = document.getElementById("ci-final");
const ciInterest = document.getElementById("ci-interest");

ciCalculate.addEventListener("click", () => {
  const P = parseFloat(ciPrincipal.value);
  const r = parseFloat(ciRate.value) / 100;
  const t = parseFloat(ciYears.value);
  const n = parseFloat(ciFrequency.value);

  if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P <= 0 || n <= 0) {
    ciFinal.textContent = "Invalid input.";
    ciInterest.textContent = "—";
    return;
  }

  const A = P * Math.pow(1 + r / n, n * t);
  const interest = A - P;

  ciFinal.textContent = "$" + A.toFixed(2);
  ciInterest.textContent = "$" + interest.toFixed(2);
});






  // ===============================
  // CLEAR ALL TOOLS + FADE ANIMATION
  // ===============================
  const clearAllBtn = document.getElementById("clear-all");
  const toolContainer = document.getElementById("tool-container");

  clearAllBtn?.addEventListener("click", () => {

    toolContainer.classList.add("clear-fade");

    setTimeout(() => {

      pwOutputEl.value = "";
      pwMessageEl.textContent = "";
      pwLengthEl.value = 12;
      pwLowerEl.checked = true;
      pwUpperEl.checked = true;
      pwNumbersEl.checked = true;
      pwSymbolsEl.checked = false;

      lengthValueEl.value = "";
      lengthOutputEl.value = "";

      qrInput.value = "";
      const qrCtx = qrCanvas.getContext("2d");
      qrCtx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);

      randomOutput.textContent = "";

      jsonInput.value = "";
      jsonOutput.value = "";

      ccAmount.value = "";
      ccResult.textContent = "0.00";

      icFile.value = "";
      icOriginal.textContent = "0 KB";
      icCompressed.textContent = "0 KB";
      icDownload.style.display = "none";
      selectedImage = null;

      tzInput.value = "";
      tzResult.textContent = "—";

      toolContainer.classList.remove("clear-fade");
      toolContainer.classList.add("clear-fade-show");




tipBillEl.value = "";
tipPercentEl.value = "15";
tipPeopleEl.value = "1";
tipTotalEl.textContent = "0.00";
tipPerPersonEl.textContent = "0.00";








ciPrincipal.value = "";
ciRate.value = "";
ciYears.value = "";
ciFrequency.value = "";
ciFinal.textContent = "—";
ciInterest.textContent = "—";





const btcUsd = document.getElementById("btc-usd");
const btcCalc = document.getElementById("btc-calc");
const btcPrice = document.getElementById("btc-price");
const btcResult = document.getElementById("btc-result");

async function fetchBTCPrice() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", {
      method: "GET",
      headers: {
        "accept": "application/json"
      }
    });

    const data = await res.json();
    return data.bitcoin.usd;
  } catch (err) {
    console.error("BTC API error:", err);
    return null;
  }
}

btcCalc.addEventListener("click", async () => {
  const amount = parseFloat(btcUsd.value);

  if (isNaN(amount) || amount <= 0) {
    btcResult.textContent = "Invalid amount";
    return;
  }

  const price = await fetchBTCPrice();

  if (!price) {
    btcPrice.textContent = "Error fetching price";
    btcResult.textContent = "—";
    return;
  }

  btcPrice.textContent = "$" + price.toLocaleString();

  const btc = amount / price;
  btcResult.textContent = btc.toFixed(8);
});








const calFood = document.getElementById("cal-food");
const calAmount = document.getElementById("cal-amount");
const calAdd = document.getElementById("cal-add");
const calList = document.getElementById("cal-list");
const calTotal = document.getElementById("cal-total");
const calClear = document.getElementById("cal-clear");

let totalCalories = 0;

calAdd.addEventListener("click", () => {
  const food = calFood.value.trim();
  const calories = parseFloat(calAmount.value);

  if (!food || isNaN(calories) || calories <= 0) {
    alert("Please enter valid food and calorie amount.");
    return;
  }

  // Add to list
  const li = document.createElement("li");
  li.textContent = `${food}: ${calories} kcal`;
  calList.appendChild(li);

  // Update total
  totalCalories += calories;
  calTotal.textContent = totalCalories;

  // Clear inputs
  calFood.value = "";
  calAmount.value = "";
});

calClear.addEventListener("click", () => {
  totalCalories = 0;
  calTotal.textContent = 0;
  calList.innerHTML = "";
});







document.addEventListener("DOMContentLoaded", () => {
  const rtText = document.getElementById("rt-text");
  const rtRegex = document.getElementById("rt-regex");
  const rtFlags = document.getElementById("rt-flags");
  const rtTest = document.getElementById("rt-test");
  const rtMatches = document.getElementById("rt-matches");
  const rtStatus = document.getElementById("rt-status");

  rtTest.addEventListener("click", () => {
    rtMatches.innerHTML = "";
    rtStatus.textContent = "";

    const text = rtText.value;
    const pattern = rtRegex.value;

    if (!text || !pattern) {
      rtStatus.textContent = "Please enter both text and a regex pattern.";
      return;
    }

    let flags = rtFlags.value.trim();
    try {
      const regex = new RegExp(pattern, flags);

      const allMatches = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(text)) !== null) {
          allMatches.push(match[0]);
          // avoid infinite loop on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = text.match(regex);
        if (match) allMatches.push(...match);
      }

      if (allMatches.length === 0) {
        rtStatus.textContent = "No matches found.";
        return;
      }

      allMatches.forEach(m => {
        const li = document.createElement("li");
        li.textContent = m;
        rtMatches.appendChild(li);
      });

      rtStatus.textContent = `Found ${allMatches.length} match(es).`;
    } catch (err) {
      rtStatus.textContent = "Invalid regex: " + err.message;
    }
  });
});





      setTimeout(() => {
        toolContainer.classList.remove("clear-fade-show");
      }, 500);

    }, 500);
  });

});







document.addEventListener("DOMContentLoaded", () => {

  const mtSymbols = document.getElementById("mt-symbols");
  const mtStart = document.getElementById("mt-start");
  const mtStatus = document.getElementById("mt-status");
  const mtResults = document.getElementById("mt-results");

  let refreshInterval = null;

  async function fetchStock(symbol) {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const data = await res.json();

    const result = data.quoteResponse.result[0];
    if (!result) return null;

    return {
      name: result.longName || result.shortName || symbol,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      percent: result.regularMarketChangePercent
    };
  } catch (err) {
    console.error("Yahoo Finance error:", err);
    return null;
  }
}


  async function fetchCrypto(symbol) {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
      const data = await res.json();
      return data[symbol].usd;
    } catch (err) {
      return null;
    }
  }

  async function updateTickers(symbolList) {
    mtResults.innerHTML = "";

    for (let raw of symbolList) {
      const symbol = raw.trim().toUpperCase();
      if (!symbol) continue;

      const card = document.createElement("div");
      card.className = "ticker-card";
      card.innerHTML = `<h3>${symbol}</h3><p>Loading…</p>`;
      mtResults.appendChild(card);

      // Crypto symbols (BTC, ETH, SOL, etc.)
      const cryptoMap = {
        BTC: "bitcoin",
        ETH: "ethereum",
        SOL: "solana",
        DOGE: "dogecoin",
        XRP: "ripple"
      };

      if (cryptoMap[symbol]) {
        const price = await fetchCrypto(cryptoMap[symbol]);
        if (price) {
          card.innerHTML = `
            <h3>${symbol} (Crypto)</h3>
            <p>Price: $${price.toLocaleString()}</p>
          `;
        } else {
          card.innerHTML = `<h3>${symbol}</h3><p>Error loading crypto price.</p>`;
        }
        continue;
      }

      // Stock symbols
      const stock = await fetchStock(symbol);
      if (stock) {
        card.innerHTML = `
          <h3>${stock.name || symbol}</h3>
          <p>Price: $${stock.price.toFixed(2)}</p>
          <p>Change: ${stock.change.toFixed(2)} (${stock.changesPercentage.toFixed(2)}%)</p>
        `;
      } else {
        card.innerHTML = `<h3>${symbol}</h3><p>Error loading stock price.</p>`;
      }
    }
  }

  mtStart.addEventListener("click", () => {
    const symbols = mtSymbols.value.split(",");
    if (symbols.length === 0) {
      mtStatus.textContent = "Enter at least one symbol.";
      return;
    }

    mtStatus.textContent = "Tracking… (updates every 10 seconds)";
    updateTickers(symbols);

    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => updateTickers(symbols), 10000);
  });

});





document.addEventListener("DOMContentLoaded", () => {

  const pdfFiles = document.getElementById("pdf-files");
  const pdfMerge = document.getElementById("pdf-merge");
  const pdfSplit = document.getElementById("pdf-split");
  const pdfText = document.getElementById("pdf-text");
  const pdfStatus = document.getElementById("pdf-status");
  const pdfDownload = document.getElementById("pdf-download");
  const pdfOutput = document.getElementById("pdf-output");

  // Helper: read file as ArrayBuffer
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(file);
    });
  }

  // Merge PDFs
  pdfMerge.addEventListener("click", async () => {
    const files = pdfFiles.files;
    if (files.length < 2) {
      pdfStatus.textContent = "Select at least 2 PDFs.";
      return;
    }

    pdfStatus.textContent = "Merging…";

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (let file of files) {
      const bytes = await readFile(file);
      const pdf = await PDFLib.PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: "application/pdf" });

    pdfDownload.href = URL.createObjectURL(blob);
    pdfDownload.style.display = "inline-block";
    pdfStatus.textContent = "Merge complete.";
  });

  // Split PDF into pages
  pdfSplit.addEventListener("click", async () => {
    const files = pdfFiles.files;
    if (files.length !== 1) {
      pdfStatus.textContent = "Select exactly 1 PDF to split.";
      return;
    }

    pdfStatus.textContent = "Splitting…";

    const bytes = await readFile(files[0]);
    const pdf = await PDFLib.PDFDocument.load(bytes);

    const pageCount = pdf.getPageCount();
    const zip = new JSZip();

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFLib.PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);

      const pageBytes = await newPdf.save();
      zip.file(`page-${i + 1}.pdf`, pageBytes);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });

    pdfDownload.href = URL.createObjectURL(zipBlob);
    pdfDownload.download = "split-pages.zip";
    pdfDownload.style.display = "inline-block";

    pdfStatus.textContent = "Split complete.";
  });

  // Extract text
  pdfText.addEventListener("click", async () => {
    const files = pdfFiles.files;
    if (files.length !== 1) {
      pdfStatus.textContent = "Select exactly 1 PDF.";
      return;
    }

    pdfStatus.textContent = "Extracting text…";

    const bytes = await readFile(files[0]);
    const pdf = await PDFLib.PDFDocument.load(bytes);

    let fullText = "";

    for (let i = 0; i < pdf.getPageCount(); i++) {
      const page = pdf.getPage(i);
      const text = page.getTextContent ? await page.getTextContent() : null;

      if (text && text.items) {
        fullText += text.items.map(t => t.str).join(" ") + "\n\n";
      }
    }

    pdfOutput.style.display = "block";
    pdfOutput.value = fullText || "No extractable text found.";

    pdfStatus.textContent = "Text extraction complete.";
  });

});




document.addEventListener("DOMContentLoaded", () => {

  const bgFile = document.getElementById("bg-file");
  const bgRemove = document.getElementById("bg-remove");
  const bgStatus = document.getElementById("bg-status");
  const bgCanvas = document.getElementById("bg-canvas");
  const bgDownload = document.getElementById("bg-download");

  let model = null;

  async function loadModel() {
    bgStatus.textContent = "Loading AI model…";
    model = await bodyPix.load();
    bgStatus.textContent = "Model ready.";
  }

  loadModel();

  bgRemove.addEventListener("click", async () => {
    if (!bgFile.files[0]) {
      bgStatus.textContent = "Upload an image first.";
      return;
    }

    bgStatus.textContent = "Processing…";

    const img = new Image();
    img.src = URL.createObjectURL(bgFile.files[0]);

    img.onload = async () => {
      const canvas = bgCanvas;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      const segmentation = await model.segmentPerson(img);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      ctx.drawImage(img, 0, 0);

      for (let i = 0; i < data.length; i += 4) {
        const j = i / 4;
        if (segmentation.data[j] === 0) {
          data[i + 3] = 0; // make background transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);

      bgCanvas.style.display = "block";

      bgDownload.href = canvas.toDataURL("image/png");
      bgDownload.style.display = "inline-block";

      bgStatus.textContent = "Background removed.";
    };
  });

});





// Advanced Meme Generator


(() => {
  const fileInput = document.getElementById("meme-image");
  const topInput = document.getElementById("meme-top");
  const bottomInput = document.getElementById("meme-bottom");
  const fontSelect = document.getElementById("meme-font");
  const sizeRange = document.getElementById("meme-size");
  const colorInput = document.getElementById("meme-color");
  const outlineInput = document.getElementById("meme-outline");
  const stickerSelect = document.getElementById("meme-sticker");
  const ideaInput = document.getElementById("meme-idea");
  const generateBtn = document.getElementById("meme-generate");
  const canvas = document.getElementById("meme-canvas");
  const ctx = canvas.getContext("2d");
  const downloadBtn = document.getElementById("meme-download");

  let img = null;

  // Text objects for dragging
  const textObjects = [
    { type: "top", text: "", x: 0, y: 0 },
    { type: "bottom", text: "", x: 0, y: 0 }
  ];
  let stickerObj = { emoji: "", x: 0, y: 0, size: 0 };
  let dragging = null;

  function loadImage() {
    return new Promise((resolve, reject) => {
      if (!fileInput.files.length) {
        reject("No image");
        return;
      }
      img = new Image();
      img.src = URL.createObjectURL(fileInput.files[0]);
      img.onload = () => resolve();
      img.onerror = reject;
    });
  }

  function renderMeme() {
    if (!img) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const fontSize = parseInt(sizeRange.value, 10);
    const fontFamily = fontSelect.value;
    const color = colorInput.value;
    const outline = outlineInput.value;

    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.strokeStyle = outline;
    ctx.lineWidth = fontSize / 15;

    // Update text objects
    textObjects[0].text = (topInput.value || "").toUpperCase();
    textObjects[1].text = (bottomInput.value || "").toUpperCase();

    // Default positions if not set
    if (!textObjects[0].x && !textObjects[0].y) {
      textObjects[0].x = canvas.width / 2;
      textObjects[0].y = fontSize + 10;
    }
    if (!textObjects[1].x && !textObjects[1].y) {
      textObjects[1].x = canvas.width / 2;
      textObjects[1].y = canvas.height - fontSize + 10;
    }

    // Draw texts
    textObjects.forEach(obj => {
      if (!obj.text) return;
      ctx.strokeText(obj.text, obj.x, obj.y);
      ctx.fillText(obj.text, obj.x, obj.y);
    });

    // Sticker
    const emoji = stickerSelect.value;
    if (emoji) {
      if (!stickerObj.emoji) {
        stickerObj.emoji = emoji;
        stickerObj.size = fontSize * 1.5;
        stickerObj.x = canvas.width - stickerObj.size;
        stickerObj.y = canvas.height - stickerObj.size;
      } else {
        stickerObj.emoji = emoji;
      }

      ctx.font = `${stickerObj.size}px ${fontFamily}`;
      ctx.fillText(stickerObj.emoji, stickerObj.x, stickerObj.y);
    }

    // Enable download
    downloadBtn.classList.remove("hidden");
    downloadBtn.onclick = () => {
      downloadBtn.href = canvas.toDataURL("image/png");
      downloadBtn.download = "meme.png";
    };
  }

  generateBtn.addEventListener("click", async () => {
    try {
      await loadImage();

      // If user added a caption idea but no text, seed bottom text
      if (ideaInput.value && !bottomInput.value && !topInput.value) {
        bottomInput.value = ideaInput.value;
      }

      // Reset positions on new image
      textObjects[0].x = 0;
      textObjects[0].y = 0;
      textObjects[1].x = 0;
      textObjects[1].y = 0;
      stickerObj = { emoji: stickerSelect.value || "", x: 0, y: 0, size: 0 };

      renderMeme();
    } catch (e) {
      alert("Please upload an image first.");
    }
  });

  // Re-render on controls change
  [topInput, bottomInput, fontSelect, sizeRange, colorInput, outlineInput, stickerSelect]
    .forEach(el => el.addEventListener("input", () => img && renderMeme()));

  // Dragging logic
  canvas.addEventListener("mousedown", e => {
    if (!img) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check text hit
    for (const obj of textObjects) {
      if (!obj.text) continue;
      const approxWidth = obj.text.length * (parseInt(sizeRange.value, 10) / 2);
      const approxHeight = parseInt(sizeRange.value, 10);
      if (x > obj.x - approxWidth / 2 && x < obj.x + approxWidth / 2 &&
          y > obj.y - approxHeight && y < obj.y + approxHeight / 2) {
        dragging = { type: "text", obj };
        return;
      }
    }

    // Check sticker hit
    if (stickerObj.emoji) {
      const s = stickerObj.size;
      if (x > stickerObj.x - s && x < stickerObj.x + s &&
          y > stickerObj.y - s && y < stickerObj.y + s) {
        dragging = { type: "sticker", obj: stickerObj };
        return;
      }
    }
  });

  canvas.addEventListener("mousemove", e => {
    if (!dragging || !img) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dragging.obj.x = x;
    dragging.obj.y = y;
    renderMeme();
  });

  canvas.addEventListener("mouseup", () => {
    dragging = null;
  });

  canvas.addEventListener("mouseleave", () => {
    dragging = null;
  });
})();















