function decodeJWT(token) {
    function base64ToUint8Array(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    function uint8ArrayToString(uint8Array) {
        return String.fromCharCode.apply(null, uint8Array);
    }

    const [header, payload, signature] = token.split('.');

    const decodedHeader = uint8ArrayToString(base64ToUint8Array(header));
    const decodedPayload = uint8ArrayToString(base64ToUint8Array(payload));

    const parsedHeader = JSON.parse(decodedHeader);
    const parsedPayload = JSON.parse(decodedPayload);

    return {
        header: parsedHeader,
        payload: parsedPayload,
    };
}

function handleCredentialResponse(response) {
    const data = decodeJWT(response.credential).payload;
    displayUserInfo(data);
}

function displayUserInfo(data) {
    document.getElementById('user-image').src = data.picture;
    document.getElementById('user-name').innerText = `Name: ${data.name}`;
    document.getElementById('user-email').innerText = `Email: ${data.email}`;

    document.getElementById('buttonDiv').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
}

function logout() {
    document.getElementById('user-image').src = '';
    document.getElementById('user-name').innerText = '';
    document.getElementById('user-email').innerText = '';

    document.getElementById('buttonDiv').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "409306020032-rvmvr5n9cua04mqceb19fq4grn4ga2s4.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        ux_mode: "popup"  // Use popup mode instead of redirect
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
}
