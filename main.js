function handleCredentialResponse(response) {
    const data = response.credential;
    console.log(data)
    console.log("ID: " + data.sub);
    console.log('Full Name: ' + data.name);
    console.log('Given Name: ' + data.given_name);
    console.log('Family Name: ' + data.family_name);
    console.log("Image URL: " + data.picture);
    console.log("Email: " + data.email);
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
