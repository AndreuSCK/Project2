console.log("patatas")

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const tableAfter = document.querySelector("#tablaPreguntasIDafter")

const mixAnswers = () => {
    if (p1 && p2 && p3 && p4) {
        let arr = [p1, p2, p3, p4]
        arr.sort(() => Math.random() - 0.5)
        // console.log(p1.childNodes)
        for (i = 0; i <= 3; i++) {
            arr[i].style.display = 'block'
            tableAfter.appendChild(arr[i])
        }
    }

}
if (tableAfter) {
    mixAnswers()
}

const idAnswersTable = document.querySelector("#preguntasID");

// if (idAnswersTable) {
//     console.log("idAnswers detected")
//     mixAnswers()
// }

const activeButton = (buttonSelected) => {
    if (buttonSelected === "p1") {
        document.querySelector("#resultadoID").innerHTML = "ACERTASTE!!!!"
        document.querySelector('#nextWinID').style.display = 'block'
        document.querySelector("#p1").style.backgroundColor = "green"


    }
    else {

        document.querySelector("#resultadoID").innerHTML = "NO ES LA CORRECTA!!!!"
        document.querySelector('#nextLostID').style.display = 'block'
        document.querySelector(`#${buttonSelected}`).style.backgroundColor = "red"
    }
}







const removeListeners = () => {
    p1.removeEventListener('click', handler)
    p2.removeEventListener('click', handler)
    if (p3) {
        p3.removeEventListener('click', handler)
        p4.removeEventListener('click', handler)
    }
}

const handler = (event) => {
    event.preventDefault()
    activeButton(event.currentTarget.id)
    removeListeners()
}
if (tableAfter) {
    p1.addEventListener('click', handler)
    p2.addEventListener('click', handler)
    if (p3) {
        p3.addEventListener('click', handler)
        p4.addEventListener('click', handler)
    }
}

if (document.querySelector('#p4')) {
    document.querySelector('#p4').addEventListener('click', (e) => {
        e.preventDefault()
        activeButton("p4")
    })
}





