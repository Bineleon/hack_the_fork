require('dotenv').config();
const axios = require('axios');

async function checkAvailableModels() {
  const apiKey = process.env.BLACKBOX_API_KEY;
  const apiUrl = 'https://api.blackbox.ai/v1/models';

  console.log('🔍 Checking available models for your API key...\n');
  console.log('API Key:', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND');
  console.log('API URL:', apiUrl);
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log('✅ Available models:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Error fetching models:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

checkAvailableModels();
