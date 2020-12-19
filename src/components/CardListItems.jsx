import React from 'react'
import styles from './CardInput.module.css'

export default function CardListItem(props) {
    let { list, handleDelete } = props
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {list.map((item, index) =>
                <div key={index} className={styles.listContainer}>
                    <div>{item}</div>
                    <button className={styles.deleteButton} onClick={(e) => handleDelete(e, index)} >Del{index}</button>
                </div>
            )}
        </div>
    )
}
