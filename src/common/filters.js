function formatBytes(hexBytes, showReducedFormMaxSize) {
  if(hexBytes == null || hexBytes == "") {
      hexBytes = "0x"
  }

  if(showReducedFormMaxSize > 0 && hexBytes.length > showReducedFormMaxSize + 2) {
    hexBytes = hexBytes.substring(0, Math.round(showReducedFormMaxSize / 2) + 2) + "..." + hexBytes.substring(hexBytes.length - Math.round(showReducedFormMaxSize / 2))
  }

  return hexBytes;
}

function showBytesAsAscii(hexBytes) {
  let asciiString = '';

  if(hexBytes == null || hexBytes == "") {
      hexBytes = "0x"
  }
  for (let i = 0; i < hexBytes.length; i += 2) {
    const hexCode = parseInt(hexBytes.substr(i, 2), 16);
    asciiString += String.fromCharCode(hexCode);
  }

  return asciiString;
}

export { formatBytes, showBytesAsAscii }