import mitt from 'mitt'

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) {
    return '0 Byte'
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function isValidFile(file, callback) {
  const maxSize = 1048576 * 1 // 1MB

  if (!file) {
    callback("You didn't select a file!")

    return false
  }

  if (!file.type.match(/\b(image.*)\b/i)) {
    callback('Invalid file type.')

    return false
  }

  if (file.size > maxSize) {
    callback(
      `The file is ${bytesToSize(file.size)} exceeding the maximum file size of ${bytesToSize(
        maxSize
      )}.`
    )

    return false
  }

  return true
}

function isDev() {
  return import.meta.env.DEV
}

function groupBy(xs, key) {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const emitter = mitt()

export { emitter, bytesToSize, isValidFile, groupBy, isDev }
