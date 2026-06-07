let submit_button = document.querySelector<HTMLButtonElement>("#name-button")!
let user_input = document.querySelector<HTMLInputElement>("#name-input")!

submit_button.onclick = () => submit_user()

async function submit_user() {
    let user_name = user_input.value
    if(user_name.length < 2) {
        alert("Your name deserves to be longer than 1 character :(")
        return
    }
    document.cookie = `username=${user_name}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    // console.log("cookie set")
    // console.log(document.cookie) 
    document.location.href = "/main.html"
}