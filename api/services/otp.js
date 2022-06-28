const otpGenerator = require('otp-generator');
const OTP = {
    LENGTH : 5,
    CONFIG : {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    }
}

const generateOTP = () => {
    const otp = otpGenerator.generate(OTP.LENGTH, OTP.CONFIG);
    return otp;
};

module.exports = generateOTP;