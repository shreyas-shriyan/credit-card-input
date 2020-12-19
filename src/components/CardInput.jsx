import React, { useState, useEffect } from 'react'
import styles from "./CardInput.module.css"
import CardListItems from "./CardListItems"

export default function CardInput(props) {
    const [value, setValue] = useState(new Array(4).fill(""))
    const [elements, setElements] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        elements[0].focus()
    }, [])

    /* updating input values */
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

    /* on pressing enter or backspace */
    const handleKeyChange = (e, index) => {

        if (e.key === "Enter") {
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

        else if (e.key === "Backspace") {
            if (elements[index].value.length === 0 && index !== 0) {
                elements[index - 1].focus()
            }
        }
    }

    /* on clicking submit button */
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

        /* to check pasted items are numbers */
        if (isNaN(text)) {
            alert("please paste digits only")
        }

        /* handling pasting in first column */
        if (index === 0) {
            if (text.length > 16) {
                alert("Please enter 16 digits only")
            }
            else {
                let offset = 0
                /* dividing digits into parts */
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

    /* handling card delete */
    const handleDelete = (e, num) => {
        let temp = [...list]
        temp = temp.filter((item, index) => num !== index)
        setList(temp)
    }

    return (
        <div >
            {/* input container */}
            <div className={styles.container}>

                <h1>Card Number<sup>*</sup></h1>

                <div>
                    {value.map((item, index) => (
                        <input className={styles.input} onKeyDown={(e) => handleKeyChange(e, index)} onPaste={(e) => handlePaste(e, index)} maxLength="4" onChange={(e) => handleChange(e, index)} key={index} ref={(n) => (elements[index] = n)} />
                    ))}
                </div>

                <button className={styles.button} onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>

            <h2>{list.length > 0 ? "Cards" : ""}</h2>

            {/* card list */}
            <CardListItems list={list} handleDelete={handleDelete} ></CardListItems>
        </div>
    )
}
