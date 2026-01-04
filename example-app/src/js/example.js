import { Payment } from '@dicty/payment';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    Payment.echo({ value: inputValue })
}
