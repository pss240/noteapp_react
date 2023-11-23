import React from 'react'
import { Memo } from './memoSlice'
import styles from './Memo.module.css'
type Props = {
    memo: Memo
    handlePin :(id:string) =>void;
}

const LittleMemo = ({memo,handlePin}:Props) => {
    const handleStyle = (backgroundColor:string) =>{
        if (backgroundColor == "White"){
            return styles.div_backgroundcolor_white
        }else if (backgroundColor == "Red"){
            return styles.div_backgroundcolor_red
        }else if (backgroundColor == "Green"){
            return styles.div_backgroundcolor_green
        }else if (backgroundColor == "Blue"){
            return styles.div_backgroundcolor_blue
        }
    }
    return <div key={memo.value.id} className={handleStyle(memo.value.backgroundColor)}>
        <div className={styles.div_LittleMemoTitle}>
            <span>{memo.value.title}</span>
            <div>
                <span>{memo.value.priority}</span>
                <button className={styles.button_LittleMemoPin} onClick={()=>handlePin(memo.value.id)}>pin</button>
            </div>
        </div>
            <div className={styles.span_LittleMemoContent}>{memo.value.contents}</div>
        <div className={styles.div_tags}>
            {memo.value.tags.map(tag => <div className={styles.div_tag}>{tag}</div>)}
        </div>
        <div>{memo.value.id}</div>
  </div>
}

export default LittleMemo