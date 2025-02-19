const apiKey = 'YOUR_CLOUDCONVERT_API_KEY'; // Replace with your CloudConvert API key
let convertedFileUrl = ''; // Stores the URL of the converted file

// Function to convert PDF to Image
async function convertPdfToImage() {
  const fileInput = document.getElementById('pdfFile');
  if (!fileInput.files[0]) {
    alert('Please select a PDF file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('apikey', apiKey);
  formData.append('inputformat', 'pdf');
  formData.append('outputformat', 'png'); // You can change to 'jpg' if needed

  try {
    const response = await fetch('https://api.cloudconvert.com/v2/convert', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.url) {
      convertedFileUrl = data.url;
      document.getElementById('result').innerHTML = `
        <p>Conversion successful!</p>
        <button class="download-btn" onclick="downloadFile('converted_image.png')">Download Image</button>
      `;
    } else {
      alert('Conversion failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Function to convert Image to PDF
async function convertImageToPdf() {
  const fileInput = document.getElementById('imageFile');
  if (!fileInput.files[0]) {
    alert('Please select an image file.');
    return;
  }

  const formData = new FormData();
  for (const file of fileInput.files) {
    formData.append('files[]', file);
  }
  formData.append('apikey', apiKey);
  formData.append('inputformat', 'image');
  formData.append('outputformat', 'pdf');

  try {
    const response = await fetch('https://api.cloudconvert.com/v2/convert', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.url) {
      convertedFileUrl = data.url;
      document.getElementById('result').innerHTML = `
        <p>Conversion successful!</p>
        <button class="download-btn" onclick="downloadFile('converted_file.pdf')">Download PDF</button>
      `;
    } else {
      alert('Conversion failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Function to download the converted file
function downloadFile(filename) {
  if (convertedFileUrl) {
    const link = document.createElement('a');
    link.href = convertedFileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No file available to download.');
  }
}
