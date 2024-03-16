import fetch from 'node-fetch';

export async function handler(event) {
    const { url } = event.queryStringParameters;
    const response = await fetch(url);
    const data = await response.text();
    return {
        statusCode: 200,
        body: data
    };
}
