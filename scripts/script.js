let form = document.querySelector(".todoask")
let inp = form.querySelector("#todos")
let inp1 = form.querySelector("#todo")
let container = document.querySelector('.tab')
let bas = " http://localhost:8080"

fetch(bas + '/todos')
    .then((res) => res.json())
    .then((res) => reload(res))
let todos1 = []
let patterns = {
    name: /^[a-z ,.'-]+$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/i
}
inp1.onkeyup = () => {
    if (patterns[inp1.name].test(inp1.value)) {
        inp1.style.borderColor = 'blue'
        inp1.classList.remove('error')
        inp1.parentElement.classList.remove('error-field')
    } else {
        inp1.parentElement.classList.add('error-field')
        inp1.style.borderColor = 'red'
        inp1.classList.add('error')
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
    if (inp.parentElement.classList.contains('error-field') || inp1.parentElement.classList.contains('error-field')) {
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
        title: inp1.value,
        title2: inp.value,
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    }


    fetch(bas + "/todos", {
        method: "post",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => console.log(res))
    todos1.push(todo)
    console.log(todo);
    reload(todos1)
}
reload(todos1)
let year = 2023
function reload(arr) {
    container.innerHTML = ""
    for (let item of arr) {
        let tablet = document.createElement('table'),
            div = document.createElement('div'),
            tr = document.createElement('tr'),
            th = document.createElement('th'),
            p = document.createElement('p'),
            p1 = document.createElement('p'),
            clsButton = document.createElement("button"),
            img = document.createElement("img"),
            writeButton = document.createElement("button"),
            write_img = document.createElement("img");


        tablet.classList.add('tablet')
        tr.classList.add('tr')
        th.classList.add('th')
        clsButton.classList.add("del")
        writeButton.classList.add("write")
        div.classList.add("div")


        th.innerHTML = `${arr.indexOf(item) + 1}`
        img.src = "img/cls.svg"
        img.alt = "cls"
        write_img.src = "img/write.svg"
        write_img.alt = "write"
        p.innerHTML = item.title
        p1.innerHTML = year - item.title2

        container.append(tablet)
        tablet.append(tr)
        tr.append(th, p, p1, div)
        div.append(writeButton, clsButton)
        writeButton.append(write_img)
        clsButton.append(img)

        clsButton.onclick = () => {
            let idx = todos1.indexOf(todo)
            todos1.splice(idx, 1)
            tablet.classList.add('remove-anim')
            fetch(bas + "/todos/" + item.id, {
                method: "delete"
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    tablet.remove()
                }
            })
        }
        writeButton.onclick = () => {
            let pr = prompt('Изменить имя')
            let pr_age = +prompt('age')
            p.innerHTML = pr
            p1.innerHTML = year - pr_age
            fetch(bas + "/todos/" + item.id, {
                method: "PATCH",
                body: JSON.stringify({pr,pr_age}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                   fetch(bas)
                   .then((res)=> res.json())
                   .then((res)=> reload(res))

                }
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