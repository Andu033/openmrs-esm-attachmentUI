
const getMime = (signature) => {
  switch (signature) {
    case '89504E47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case '25504446':
      return 'application/pdf'

    case 'ffd8ffdb':
    case 'ffd8ffe0':
    case 'ffd8ffe1':
      return 'image/jpeg'
    case '504B0304':
      return 'application/zip'
    default:
      return 'Unknown filetype'
  }
}

// const onLoadCallBack = e => {
//   var arr = new Uint8Array(e.target.result).subarray(0, 4)
//   var header = ''

//   for (var i = 0; i < arr.length; i++) {
//     header += arr[i].toString(16)
//   }

// }

export const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = buffer;
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);

  }
  return window.btoa(binary);
}

export const checkMIME = (file) => {

  var arr = file.subarray(0, 4)
  var header = ''

  for (var i = 0; i < arr.length; i++) {
    header += arr[i].toString(16)
  }

  return getMime(header);

}
