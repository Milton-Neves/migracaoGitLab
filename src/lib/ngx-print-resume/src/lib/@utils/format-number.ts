export function formatPhoneNumber(phoneNumber: string): string {
  var formatedNumber = ('' + phoneNumber).replace(/\D/g, '')
  var cellphoneFormat = formatedNumber.match(/^(\d{2})(\d{5})(\d{4})$/)
  var telephoneFormat = formatedNumber.match(/^(\d{2})(\d{4})(\d{4})$/)
  if (cellphoneFormat) {
    return (
      '(' +
      cellphoneFormat[1] +
      ') ' +
      cellphoneFormat[2] +
      '-' +
      cellphoneFormat[3]
    )
  }
  if (telephoneFormat) {
    return (
      '(' +
      telephoneFormat[1] +
      ') ' +
      telephoneFormat[2] +
      '-' +
      telephoneFormat[3]
    )
  }
  return ''
}
