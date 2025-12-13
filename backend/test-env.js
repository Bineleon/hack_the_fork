require('dotenv').config();

console.log('=== Environment Variable Test ===');
console.log('BLACKBOX_API_KEY exists:', !!process.env.BLACKBOX_API_KEY);
console.log('BLACKBOX_API_KEY length:', process.env.BLACKBOX_API_KEY ? process.env.BLACKBOX_API_KEY.length : 0);
console.log('BLACKBOX_API_KEY value:', process.env.BLACKBOX_API_KEY ? process.env.BLACKBOX_API_KEY.substring(0, 10) + '...' : 'NOT FOUND');
console.log('BLACKBOX_API_URL:', process.env.BLACKBOX_API_URL);
