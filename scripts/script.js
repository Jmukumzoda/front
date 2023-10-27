let form = document.querySelector(".todoask")
let inp = form.querySelector("#todos")
let inp_name = form.querySelector("#todo")
let container = document.querySelector('.tab')
// let column_age25 = document.querySelector('#column1');
// let column2 = document.querySelector('#column2');
// let column3 = document.querySelector('#column3');
let bas = " http://localhost:8080"

fetch(bas + '/todos')
    .then((res) => res.json())
    .then((res) => reload(res))

let patterns = {
    name: /^[a-z ,.'-]+$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/i
}
inp_name.onkeyup = () => {
    if (patterns[inp_name.name].test(inp_name.value)) {
        inp_name.style.borderColor = 'blue'
        inp_name.classList.remove('error')
        inp_name.parentElement.classList.remove('error-field')
    } else {
        inp_name.parentElement.classList.add('error-field')
        inp_name.style.borderColor = 'red'
        inp_name.classList.add('error')
    }
}
inp.onkeyup = () => {
    if (patterns[inp.name].test(inp.value)) {
        inp.style.borderColor = 'blue'
        inp.classList.remove('error')
        inp.parentElement.classList.remove('error-field')
    } else {
        inp.parentElement.classList.add('error-field')
        inp.style.borderColor = 'red'
        inp.classList.add('error')
    }
}
form.onsubmit = (e) => {
    e.preventDefault();
    let error = false
    if (inp.parentElement.classList.contains('error-field') || inp_name.parentElement.classList.contains('error-field')) {
        error = true
    }
    if (error) {
        alert('error')
        return
    } else {
        submit()
    }
    let input = document.getElementById("todo").value;
    let inputs = document.getElementById("todos").value;
    if (input === "" || inputs === "") {
        alert("Что ты вёл там ничего нету");
        return fm;
    }
    let todo = {
        id: Math.random(),
        name: inp_name.value,
        age: inp.value
    }
    let inp_value = inp.value
    if (inp_value < 25) {
        fetch(bas + "/todos", {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                fetch(bas + "/todos")
                    .then((res) => res.json())
                    .then((res) => reload(res))
                inp.value = ""
                inp_name.value = ""

            }
        })
        return
    } else if (inp_value >= 25 && inp_value <= 50) {
        fetch(bas + "/todos", {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                fetch(bas + "/todos")
                    .then((res) => res.json())
                    .then((res) => reload(res))
                inp.value = ""
                inp_name.value = ""

            }
        })
    } else if (inp_value > 50) {
        fetch(bas + "/todos", {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                fetch(bas + "/todos")
                    .then((res) => res.json())
                    .then((res) => reload(res))
                inp.value = ""
                inp_name.value = ""

            }
        })
    }


}
function reload(arr) {
    container.innerHTML = ""
    for (let item of arr) {
        let article = document.createElement('article'),
            h1 = document.createElement('h1'),
            text_art = document.createElement('div'),
            h4 = document.createElement('h4'),
            p = document.createElement('p'),
            div = document.createElement('div'),
            clsButton = document.createElement("button"),
            img = document.createElement("img"),
            writeButton = document.createElement("button"),
            write_img = document.createElement("img");



        clsButton.classList.add("del")
        writeButton.classList.add("write")
        div.classList.add("div")
        article.classList.add("grid")
        text_art.classList.add('text')

        img.src = "img/cls.svg"
        img.alt = "cls"
        write_img.src = "./img/6140897_design_draw_graphic_mouse_pencil_icon.png"
        write_img.alt = "write"
        h1.innerHTML = item.name
        h4.innerHTML = "Age"
        p.innerHTML = item.age

        container.append(article)
        article.append(h1, text_art, div)
        text_art.append(h4, p)
        div.append(writeButton, clsButton)
        writeButton.append(write_img)
        clsButton.append(img)

        clsButton.onclick = () => {
            fetch(bas + "/todos/" + item.id, {
                method: "delete"
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    article.remove()
                }
            })
        }
        writeButton.onclick = () => {
            let pr = prompt("Введите name:")
            if (pr.valueOf() === "") {
                alert('Введите имя  или будет ошибка')
                return
            }
            let age_pr = prompt("Введите age:")
            let val = {
                name: pr.valueOf(),
                age: age_pr.valueOf()
            }
          



            fetch(bas + "/todos/" + item.id, {
                method: "PATCH",
                body: JSON.stringify(val),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    fetch(bas + "/todos")
                        .then((res) => res.json())
                        .then((res) => reload(res))

                }
                console.log(res);
            })
        }
    }
}
function submit() {
    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })
}