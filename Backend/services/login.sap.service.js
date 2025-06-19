const axios = require('axios');
const { setupLogger } = require('../utils/logger');
const { response } = require('express');
const { error } = require('winston');

const logger = setupLogger();

class LoginSAPService {
    constructor() {
        // Login-specific configuration
        this.loginConfig = {
            baseUrl: 'http://AZKTLDS5CP.kcloud.com:8000',
            endpoint: '/sap/opu/odata/SAP/ZSSM34_P2_LOGIN_SRV/LoginSet',
            headers: {
                'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    extractCookies(cookies) {
        let sapUserContext = '';
        let sapSessionId = '';

        if (cookies && cookies.length > 0) {
            cookies.forEach(cookie => {
                if (cookie.includes('sap-usercontext')) {
                    sapUserContext = cookie.split(';')[0];
                } else if (cookie.includes('SAP_SESSIONID_')) {
                    // Keep the original session ID format
                    sapSessionId = cookie.split(';')[0];
                }
            });
        }

        return { sapUserContext, sapSessionId };
    }

    async getCsrfToken() {
        const url = `${this.loginConfig.baseUrl}/sap/opu/odata/SAP/ZSSM34_P2_LOGIN_SRV/`;
        try {
            const response = await axios({
                method: 'GET',
                url: url,
                headers: {
                    ...this.loginConfig.headers,
                    'X-CSRF-TOKEN': 'fetch'
                }
            });
            
            const csrfToken = response.headers['x-csrf-token'];
            const cookies = response.headers['set-cookie'];
            if (!csrfToken) {
                throw new Error('CSRF token not found in response headers');
            }

            const { sapUserContext, sapSessionId } = this.extractCookies(cookies);
            const cookieString = [sapUserContext, sapSessionId].filter(Boolean).join('; ');
            
            const cred = {
                csrfToken: csrfToken,
                cookie: cookieString
            };
            return cred;
        } catch (error) {
            console.error('Error in getCsrfToken:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                console.error('Response data:', error.response.data);
            }
            throw new Error(`Failed to fetch CSRF token: ${error.message}`);
        }
    }

    async login(vendorId, password) {
        try {
            const { csrfToken, cookie } = await this.getCsrfToken();
            const url = `${this.loginConfig.baseUrl}${this.loginConfig.endpoint}`;
            const requestData = {
                VENDOR_ID: vendorId,
                PASSWORD: password
            };

            const requestHeaders = {
                ...this.loginConfig.headers,
                'Cookie': cookie,
                'X-CSRF-TOKEN': csrfToken
            };
            const response = await axios({
                method: 'POST',
                url: url,
                headers: requestHeaders,
                data: requestData
            });
            console.log(response.data.d);
            logger.info(`Successfully logged in vendor: ${vendorId}`);
            return response.data.d;
        } catch (error) {
            console.error('\n=== DEBUG: Login Error ===');
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                console.error('Response data:', error.response.data);
            }
            
            logger.error(`Error during vendor login: ${error.message}`, {
                vendorId,
                url: `${this.loginConfig.baseUrl}${this.loginConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to login: ${error.message}`);
        }
    }
}

module.exports = new LoginSAPService(); 