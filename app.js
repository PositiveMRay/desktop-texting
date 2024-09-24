const nodemailer = require("nodemailer");

async function loadTransporterData() {
  const transporterData = {};
  const transporterFile = openFile();
  parseTransporterCSV(transporterFile, transporterData);
}

function parseTransporterCSV(datafile, data) {
  data.host = datafile.readLine().split(': ')[1];
  data.port = datafile.readLine().split(': ')[1];
  data.secure = datafile.readLine().split(': ')[1];
  data.user = datafile.readLine().split(': ')[1];
  data.pass = datafile.readLine().split(': ')[1];
  
}

const transporter = nodemailer.createTransport({
  host: host,
  port: parseInt(data.port),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: data.user,
    pass: data.pass,
  },
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker Registered'));
  }

  async function openFile() {
    try {
      // Check if the File System Access API is supported
      if (!window.showOpenFilePicker) {
        alert('Your browser does not support the File System Access API.');
        return;
      }

      // Open the file picker and allow the user to select a CSV file
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'CSV Files',
          accept: {
            'text/csv': ['.csv']
          }
        }]
      });

      // Get the file contents
      const file = await fileHandle.getFile();
      return file;
      const text = await file.text();

      // Display the file name and enable further processing
      //fileNameDisplay.textContent = `Selected file: ${file.name}`;
      parseCSV(text);

    } catch (err) {
      console.error('Error accessing file:', err);
    }
  }

  async function writeFile() {
      try {
          // Show save file dialog
          const fileHandle = await window.showSaveFilePicker({
              suggestedName: 'plaintext.txt',
              types: [{
                  description: 'Text Files',
                  accept: {
                      'text/plain': ['.txt'],
                  },
              }],
          });
  
          // Create a writable stream
          const writableStream = await fileHandle.createWritable();
  
          // Write data to the file
          await writableStream.write('This is sample text.');
  
          // Close the file and write data to disk
          await writableStream.close();
  
          alert('File has been saved successfully!');
      } catch (err) {
          console.error('Error writing file:', err);
      }
  }

  function cellServiceProvider(provider) {
    switch (provider) {
      case "T-Mobile":
        return "tmomail.net";
        break;
      default:
        return "text.att.net";
    }
  }

  async function sendText(fromName, fromEmail, toEmail, messageToSend) {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: `"Hello ✔"`, // Subject line
      text: messageToSend, // plain text body
      html: `<b>${messageToSend}</b>`, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  sendText.catch(console.error);