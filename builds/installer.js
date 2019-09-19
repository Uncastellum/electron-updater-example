var electronInstaller = require('electron-winstaller');
resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './builds/NCS-Station-win32-x64',
  outputDirectory: './builds/',
  authors: 'Uncastellum',
  noMsi: true,
  description: 'None',
  exe: 'NCS-Station.exe'
});

resultPromise.then(() => console.log("Done !"),
(e) => console.log(`Error: ${e.message}`))
