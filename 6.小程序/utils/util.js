const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatYMD = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '.' + [month, day].map(formatNumber).join('.') 
}

const formatDate = date => {
  const month = date.getMonth() + 1 
  const day = date.getDate()
  return [month,day].map(formatNumber).join('.')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const spliceNumber = n => {
  if(n.length > 5)
  {
    return n.splice(2);
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  spliceNumber: spliceNumber
}
