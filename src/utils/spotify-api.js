import { TrackModel } from "../models/TrackModel";

const clientId = 'f25b046980ee4cb6835c93dde4601cbb';
const scope = 'user-read-private user-read-email';

const authUrl = new URL("https://accounts.spotify.com/authorize")
const redirectUri = 'http://localhost:3000/callback';
const url = 'https://accounts.spotify.com/api/token'
const searchUrl = 'https://api.spotify.com/v1/search?'

export const getUserAuthorization = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
    
    window.localStorage.setItem('code_verifier', codeVerifier);
    
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    return code;
};

export const getToken = async code => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();
    return response.access_token;
}

export const searchMusic = async (songDetail, accessToken) => {
    try {
        const query=encodeURIComponent(songDetail);
        const endpoint = `${searchUrl}q=${query}&type=track`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            return data.tracks.items.map(track => new TrackModel(
                track.name,
                track.artists.map(artist => artist.name).join(', '),
                track.album.name,
                track.uri
            ))
        }else {
            throw new Error('Request failed!');
        }
    }
    catch(error) {
        console.log(error);
    }
}

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}