console.log("patatas")



const mixAnswers = () => {
    const p1 = document.querySelector("#p1");
    const p2 = document.querySelector("#p2");
    const p3 = document.querySelector("#p3");
    const p4 = document.querySelector("#p4");

    Math.floor(Math.random() * 4) + 1

    // p4.innerHTML = "jajasalu2"

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


    }
    else {
        document.querySelector("#resultadoID").innerHTML = "NO ES LA CORRECTA!!!!"
        document.querySelector('#nextLostID').style.display = 'block'

    }
    // document.querySelector("#preguntasID")
}

if (document.querySelector('#p1')) {
    document.querySelector('#p1').addEventListener('click', (e) => {
        e.preventDefault()
        activeButton("p1")
    })
}

if (document.querySelector('#p2')) {
    document.querySelector('#p2').addEventListener('click', (e) => {
        e.preventDefault()
        activeButton("p2")
    })
}
if (document.querySelector('#p3')) {
    document.querySelector('#p3').addEventListener('click', (e) => {
        e.preventDefault()
        activeButton("p3")
    })
}

if (document.querySelector('#p4')) {
    document.querySelector('#p4').addEventListener('click', (e) => {
        e.preventDefault()
        activeButton("p4")
    })
}




    