const specialChar = '~!@#$%^&*()_|+\\-=?;:\'",.<>\\{\\}\\[\\]\\/\\|';

const REGEXP = {
  ID: /(?=.*[a-z])(^[a-z\d]*$)/g,
  PASSWORD_SPECIAL_MIX: new RegExp(
    `(((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[${specialChar}])(?=.*[0-9]))|((?=.*[a-zA-Z])(?=.*[${specialChar}])))(^[a-zA-Z0-9${specialChar}]*$)`
  ),
  EMAIL:
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  NORMAL_NUMBER: /^\d{2,3}-\d{3,4}-\d{4}$/,
  PHONENUMBER: /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/,

  THREEPART_NUMBER: /(\d{3})(\d{3,4})(\d{4})/,
  SEOUL_THREEPART_NUMBER: /(\d{2})(\d{4})(\d+)/,
};

export default REGEXP;
