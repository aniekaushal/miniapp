function decodeJWT(token) {
    // Helper function to convert a base64-encoded string to a Uint8Array
    function base64ToUint8Array(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }
  
    // Helper function to convert a Uint8Array to a string
    function uint8ArrayToString(uint8Array) {
      return String.fromCharCode.apply(null, uint8Array);
    }
  
    // Split the token into three parts (header, payload, and signature)
    const [header, payload, signature] = token.split('.');
  
    // Decode the base64-encoded header and payload
    const decodedHeader = uint8ArrayToString(base64ToUint8Array(header));
    const decodedPayload = uint8ArrayToString(base64ToUint8Array(payload));
  
    // Parse the decoded header and payload as JSON objects
    const parsedHeader = JSON.parse(decodedHeader);
    const parsedPayload = JSON.parse(decodedPayload);
  
    // Return an object containing the header and payload
    return {
      header: parsedHeader,
      payload: parsedPayload,
    };
  }

function handleCredentialResponse(response) {
    const data = decodeJWT(response.credential).payload
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
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}
