export const supportedLanguages = {
    'hi-IN': 'Hindi',
    'bn-IN': 'Bengali',
    'kn-IN': 'Kannada',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu',
    'ml-IN': 'Malayalam',
    'gu-IN': 'Gujarati',
    'mr-IN': 'Marathi',
    'pa-IN': 'Punjabi'
};

export function getLanguageCode(fullCode) {
    return fullCode.split('-')[0];
}