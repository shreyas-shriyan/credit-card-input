import React, { useState } from 'react'
import styles from "./CardInput.module.css"

export default function CardInput(props) {
    const [value, setValue] = useState(new Array(4).fill(""))


    return (
        <div className={styles.container}>
            <h1>Card Number<sup>*</sup></h1>
            {value.map((item, index) => (
                <input className={styles.input} />
            ))}
        </div>
    )
}
