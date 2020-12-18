import React, { useState, useEffect } from 'react'
import styles from "./CardInput.module.css"

export default function CardInput(props) {
    const [value, setValue] = useState(new Array(4).fill(""))
    const [elements, setElements] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        elements[0].focus()
    }, [])

    const handleChange = (e, i) => {
        let tempValue = [...value]
        tempValue[i] = e.target.value
        setValue(tempValue)

        if (e.target.value.length === 4) {
            if ((i + 1) < elements.length) {
                elements[i + 1].focus()
            }
        }

        else if (e.target.value.length === 0) {
            if (i !== 0) {
                elements[i - 1].focus()
            }
        }
    }

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            let temp = value.reduce((a, item) => a + item)
            if (temp.length < 16) {
                alert("please enter 16 digits")
            }
            else {
                if (isNaN(temp)) {
                    alert("please enter digits only")
                }
                else {
                    let listItem = [...list, temp]
                    setList(listItem)
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let temp = value.reduce((a, item) => a + item)
        if (temp.length < 16) {
            alert("please enter 16 digits")
        }
        else {
            if (isNaN(temp)) {
                alert("please enter digits only")
            }
            else {
                let listItem = [...list, temp]
                setList(listItem)
            }
        }
    }

    const handlePaste = (e, index) => {
        e.preventDefault()
        let text = e.clipboardData.getData('text')
        if (index === 0) {
            if (text.length > 16) {
                alert("Please enter 16 digits only")
            }
            else {
                let offset = 0
                for (let i = 0; i < 4; i++) {
                    let temp = text.substr(offset, 4)
                    elements[i].value = temp
                    let tempValue = [...value]
                    tempValue[i] = temp
                    setValue(tempValue)
                    if (temp.length < 4) {
                        elements[i].focus()
                        break;
                    }
                    elements[i].focus()
                    offset = offset + 4
                }
            }
        }
    }

    return (
        <div >
            <div className={styles.container}>
                <h1>Card Number<sup>*</sup></h1>
                {value.map((item, index) => (
                    <input className={styles.input} onKeyPress={(e) => handleEnter(e)} onPaste={(e) => handlePaste(e, index)} maxLength="4" onChange={(e) => handleChange(e, index)} key={index} ref={(n) => (elements[index] = n)} />
                ))}
                <button className={styles.button} onClick={(e) => handleSubmit(e)}  >Submit</button>
            </div>
            <h2>{list.length > 0 ? "Cards" : ""}</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {list.map((item, index) =>
                    <div key={index} className={styles.listContainer}>
                        <div>{item}</div>
                        <button className={styles.deleteButton} >Del{index}</button>
                    </div>
                )}
            </div>
        </div>
    )
}
