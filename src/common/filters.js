function showBytesAsUTF8(hexBytes) {
  let utf8String = '';

  if(hexBytes == null || hexBytes == "") {
      hexBytes = "0x"
  }
  for (let i = 0; i < hexBytes.length; i += 2) {
    const hexCode = parseInt(hexBytes.substr(i, 2), 16);
    utf8String += String.fromCharCode(hexCode);
  }

  return utf8String;
}

export { showBytesAsUTF8 }